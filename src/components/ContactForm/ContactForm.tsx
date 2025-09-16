"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, m, LazyMotion } from "motion/react";
import { X } from "react-feather";

import styles from "./ContactForm.module.css";

import { useRefsContext } from "@/contexts/RefsContext";
import useViewportSize from "@/hooks/useViewportSize";
import { scrollToRef } from "@/helpers";

const loadFeatures = () => import("../../features").then((res) => res.default);

const formInitial = { padding: "1rem", opacity: 0 };

function ContactForm() {
  const [hovered, setHovered] = useState(false);
  const [formShown, setformShown] = useState(false);
  const [nameText, setNameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [messageText, setMessageText] = useState("");
  const [errorText, setErrorText] = useState(null);
  const [messageSent, setMessageSent] = useState(false);

  const { contactRef } = useRefsContext();

  const smallScreen = useViewportSize().width < 1100;

  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

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

    if (window.innerWidth < 1430) {
      setTimeout(() => {
        scrollToRef(formRef);
      }, 300);
    }
  };

  const handleCloseForm = () => {
    setformShown(false);
    clearForm();
    setMessageSent(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://formspree.io/f/xnqejnez", {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(response.status.toString());
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
      <LazyMotion features={loadFeatures}>
        <m.button
          className={styles.openFormButton}
          type='button'
          aria-labelledby='Open email contact form'
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => {
            handleOpenForm();
          }}
          initial={{ borderBottom: "2px solid rgba(var(--color-underline), 0.3)", opacity: 0, y: 5 }}
          whileHover={{ borderBottom: "6px solid rgba(var(--color-underline), 0.8)" }}
          animate={{ opacity: hovered ? 1 : 0.8, y: 0 }}
          transition={{ duration: 0.1 }}
        >
          Open Contact Form
        </m.button>
      </LazyMotion>
    );
  };

  return (
    <section ref={contactRef}>
      <LazyMotion features={loadFeatures}>
        <AnimatePresence>
          {formShown && (
            <m.div className={styles.formWrapper}>
              <m.div
                className={styles.formBackdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseForm}
              />
              <m.form
                ref={formRef}
                name='contact form'
                className={styles.form}
                initial={formInitial}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className={styles.topInputWrapper}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor='name'>Your name:</label>
                    <input
                      ref={nameInputRef}
                      type='text'
                      name='name'
                      required
                      placeholder='Name'
                      autoComplete='name'
                      value={nameText}
                      maxLength={50}
                      onChange={(e) => setNameText(e.target.value)}
                    />

                    <m.button
                      type='button'
                      className={styles.closeButton}
                      onClick={handleCloseForm}
                      initial={{ border: "1px solid rgb(0, 0, 0, 0)" }}
                      whileHover={!smallScreen && { border: "1px solid rgb(0, 0, 0, 0.3)", rotate: "90deg" }}
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
                      autoComplete='email'
                      value={emailText}
                      maxLength={50}
                      onChange={(e) => setEmailText(e.target.value)}
                    />
                  </div>
                </div>

                <label htmlFor='message'>Your message:</label>
                <textarea
                  name='message'
                  cols={60}
                  rows={8}
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
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
      {openFormButton()}
    </section>
  );
}

export default ContactForm;
