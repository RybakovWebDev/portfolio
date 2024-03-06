"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import { ArrowUp, ArrowUpCircle, X } from "react-feather";

import styles from "./ContactForm.module.css";

import { scrollToRef } from "@/helpers";
import { useRefsContext } from "@/contexts/RefsContext";

const formSpring = { type: "spring", damping: 60, stiffness: 700, restDelta: 0.01 };

const formAnimate = {
  padding: "1rem",
  height: "24rem",
  opacity: 1,
  transition: { height: { duration: 0.3 }, opacity: { duration: 0.2 } },
};

const formExit = {
  padding: "1rem",
  height: 0,
  opacity: 0,
  transition: { height: { duration: 0.3 }, opacity: { duration: 0.2 } },
};

function ContactForm() {
  const [hovered, setHovered] = useState(false);
  const [formShown, setformShown] = useState(false);
  const [nameText, setNameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [messageText, setMessageText] = useState("");
  const [errorText, setErrorText] = useState(null);
  const [messageSent, setMessageSent] = useState(false);

  const { contactRef } = useRefsContext();

  const formRef = useRef();
  const nameInputRef = useRef();

  const clearForm = () => {
    setNameText("");
    setEmailText("");
    setMessageText("");
    setErrorText(null);
  };

  useEffect(() => {
    if (formShown) {
      nameInputRef.current.focus();
    }
  }, [formShown]);

  const handleOpenForm = () => {
    !formShown && setformShown(!formShown);
    console.log("opening form");
    if (window.innerWidth < 1430) {
      setTimeout(() => {
        scrollToRef(formRef);
      }, 300);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://formspree.io/f/xnqejnez", {
        method: "POST",
        body: new FormData(e.target),
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(response.status);
      }

      clearForm();
      setMessageSent(true);
    } catch (error) {
      setErrorText(`${error}. Could not send message 😥`);
      console.error("An error occurred while submitting the form!", error);
    }
  };

  const openFormButton = () => {
    return (
      <LazyMotion features={domAnimation}>
        <m.button
          className={styles.openFormButton}
          type='button'
          aria-labelledby='Open email contact form'
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => {
            handleOpenForm();
          }}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: formShown ? 0 : 0.8, y: 0 }}
        >
          <AnimatePresence>
            {!formShown && (
              <m.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0.8, y: 0, transition: { delay: 0.1 } }}
                exit={{ opacity: 0 }}
              >
                <m.div
                  initial={{ y: 0 }}
                  animate={
                    hovered
                      ? {
                          y: [0, -10, 0],
                          opacity: [0.5, 1, 0.5],
                          transition: { duration: 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 },
                        }
                      : { opacity: 0.5 }
                  }
                  exit={{ y: -20 }}
                >
                  <ArrowUpCircle size={30} strokeWidth={1} />
                </m.div>
              </m.div>
            )}
          </AnimatePresence>
          Open Contact Form
          <AnimatePresence>
            {hovered && (
              <m.div
                className={styles.underline}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ width: 0 }}
              />
            )}
          </AnimatePresence>
        </m.button>
      </LazyMotion>
    );
  };

  const form = () => {
    return (
      formShown && (
        <LazyMotion features={domAnimation}>
          <m.form
            ref={formRef}
            name='contact form'
            className={styles.form}
            initial={{ padding: "1rem", height: "1rem", opacity: 0 }}
            animate={formAnimate}
            exit={formExit}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className={styles.topInputWrapper}>
              <div className={styles.inputWrapper}>
                <label htmlFor='name'>Your Name:</label>
                <input
                  ref={nameInputRef}
                  type='text'
                  name='name'
                  required
                  placeholder='Name'
                  value={nameText}
                  maxLength={50}
                  onChange={(e) => setNameText(e.target.value)}
                />

                <m.button
                  type='button'
                  className={styles.closeButton}
                  onClick={() => {
                    setformShown(false);
                    clearForm();
                    setMessageSent(false);
                  }}
                  initial={{ border: "1px solid rgb(0, 0, 0, 0)" }}
                  whileHover={{ border: "1px solid rgb(0, 0, 0, 0.3)", rotate: "90deg" }}
                >
                  <X size={30} strokeWidth={1} />
                </m.button>
              </div>

              <div className={styles.inputWrapper}>
                <label htmlFor='email'>Your contact email:</label>
                <input
                  type='email'
                  name='email'
                  required
                  placeholder='Email'
                  value={emailText}
                  maxLength={50}
                  onChange={(e) => setEmailText(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor='message'>Your message:</label>
            <textarea
              name='message'
              cols='60'
              rows='10'
              required
              spellCheck
              placeholder='Message text'
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />

            <div className={styles.sendWrapper}>
              <div>
                <AnimatePresence>
                  {errorText ? (
                    <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {errorText}
                    </m.p>
                  ) : null}
                </AnimatePresence>
              </div>

              <>
                {messageSent ? (
                  <AnimatePresence mode='wait'>
                    <m.p
                      key='sentMessage'
                      className={styles.sentMessage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Message sent!
                    </m.p>
                  </AnimatePresence>
                ) : (
                  <AnimatePresence mode='wait'>
                    <m.button
                      key='submitButton'
                      type='submit'
                      initial={{ border: "1px solid rgb(0, 0, 0, 0.3)", background: "rgb(0, 0, 0, 0)", opacity: 0 }}
                      whileHover={{ background: "rgb(0, 0, 0, 0.1)" }}
                      whileTap={{ background: "rgb(0, 0, 0, 0.3)" }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", damping: 80, stiffness: 700 }}
                    >
                      <p>Send</p>
                    </m.button>
                  </AnimatePresence>
                )}
              </>
            </div>
          </m.form>
        </LazyMotion>
      )
    );
  };

  return (
    <section ref={contactRef} className={styles.wrapper} transition={formSpring}>
      <AnimatePresence mode='wait'>{form()}</AnimatePresence>
      {openFormButton()}
    </section>
  );
}

export default ContactForm;
