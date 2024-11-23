"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { m, LazyMotion, useInView } from "framer-motion";

import styles from "../projects.module.css";
import pairLearnerStyles from "./PairLearner.module.css";

import SectionNameLine from "@/components/SectionNameLine";
import GradientBorders from "@/components/GradientBorders";
import EmbedVideo from "@/components/EmbedVideo";
import ProjectLinks from "@/components/ProjectLinks";

const BackToTop = dynamic(() => import("@/components/BackToTop"));

import useViewportSize from "@/hooks/useViewportSize";
import { calculateVideoHeight } from "@/helpers";
import { finalVerticalOffset, initialVerticalOffset, PROJECTS } from "@/constants";

const loadFeatures = () => import("../../../features").then((res) => res.default);

const project = PROJECTS[0];

function PairLearner() {
  const goalRef = useRef<HTMLDivElement>(null);
  const challengeRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const lessonRef = useRef<HTMLParagraphElement>(null);

  const viewportSize = useViewportSize();

  const goalInView = useInView(goalRef, { once: true });
  const challengeInView = useInView(challengeRef, { once: true });
  const lessonInView = useInView(lessonRef, { once: true, amount: 1 });

  const container = {
    hidden: initialVerticalOffset,
    show: {
      opacity: lessonInView ? 1 : 0,
      y: lessonInView ? 0 : 20,

      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: initialVerticalOffset,
    show: lessonInView ? finalVerticalOffset : initialVerticalOffset,
  };

  return (
    <LazyMotion features={loadFeatures}>
      <m.div initial={{ opacity: 0 }} animate={{ opacity: viewportSize.width ? 1 : 0 }} className={styles.page}>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.description}>{project.description}</p>
        <GradientBorders topBorder={"20px"} rightBorder={"100px"} bottomBorder={"20px"} leftBorder={"100px"}>
          <EmbedVideo
            src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}PairLearner_Homepage_desktop_MP4_H264.mp4`}
            height={calculateVideoHeight(viewportSize.width, 700, 210)}
            showSpinner={true}
          />
        </GradientBorders>

        <ProjectLinks live={project.live} github={project.github} />

        <div ref={heroRef} className={styles.section}>
          <div className={styles.sectionTextCenterWrapper}>
            <p className={styles.sectionTextIntro}>
              Full-stack language learning website allowing registered users to create and manage their own custom word
              pairs in any language and then practice their vocabulary by playing a word matching game. Features a
              flexible tagging system for organizing pairs and creating personalized practice sessions. Supports PWA
              functionality for ease of use on mobile devices.
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionNameWrapperRight}>
            <h2>The Goal & The Stack</h2>
            <div ref={goalRef} className={styles.lineWrapper}>
              {goalInView && <SectionNameLine fromRight={true} />}
            </div>
          </div>

          <div className={styles.sideBySide}>
            <div className={styles.sideBySideLeftWrapper}>
              <GradientBorders topBorder={"30px"} rightBorder={"50px"} bottomBorder={"30px"} leftBorder={"50px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}PairLearner_Game_demo_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 550, 470)}
                  showSpinner={true}
                />
              </GradientBorders>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <div className={styles.sectionTextRightWrapper}>
                <p>
                  The project reimagines a popular Duolingo matching game concept by putting users in control of their
                  learning material through the ability to use custom word pairs. Built with Next.js 14 (App Router) and
                  TypeScript, featuring Supabase for authentication and database, custom email handling via Amazon SES,
                  and smooth animations powered by Framer Motion. Deployed on Vercel with custom domain integration.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionNameWrapperLeft}>
            <div ref={challengeRef} className={styles.lineWrapper}>
              {challengeInView && <SectionNameLine />}
            </div>
            <h2>The Challenge</h2>
          </div>

          <div className={viewportSize.width > 1430 ? styles.sideBySide : styles.sideBySideReversed}>
            <div className={styles.sideBySideLeftWrapper}>
              <div className={styles.sectionTextLeftWrapper}>
                <p>
                  At the heart of the application lies the Word Editor, where users can seamlessly manage their custom
                  word pairs. The interface combines robust data validation with user-friendly features, including
                  keyboard shortcuts for efficiency and confirmation dialogs for data safety. All inputs are thoroughly
                  sanitized and validated both client-side and through Supabase&apos;s security policies.
                </p>
              </div>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <GradientBorders topBorder={"20px"} rightBorder={"30px"} bottomBorder={"20px"} leftBorder={"30px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}PairLearner_Add_remove_pair_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 600, 320)}
                  showSpinner={true}
                />
              </GradientBorders>
            </div>
          </div>

          <div className={styles.sideBySide}>
            <div className={styles.sideBySideLeftWrapper}>
              <GradientBorders topBorder={"20px"} rightBorder={"30px"} bottomBorder={"20px"} leftBorder={"30px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}PairLearner_Search_demo_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 700, 520)}
                  showSpinner={true}
                />
              </GradientBorders>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <div className={styles.sectionTextRightWrapper}>
                <p>
                  Initially only the last 50 added pairs are shown, and the user can either scroll to the bottom of the
                  list and load more with a button, or use the search functionality. The search is debounced, and
                  fetches any matches based on either of the words in the pairs. When the search is cleared, the system
                  restores the previously loaded pairs from state rather than re-fetching them from the database. Each
                  pair shows a number in its corner that normally indicates its total count from newest to oldest, and
                  during search this number updates to reflect how many matches were found.
                </p>
              </div>
            </div>
          </div>

          <div className={viewportSize.width > 1430 ? styles.sideBySide : styles.sideBySideReversed}>
            <div className={styles.sideBySideLeftWrapper}>
              <div className={styles.sectionTextLeftWrapper}>
                <p>
                  The game page itself features a bunch of customization options. From filtering words by tags to
                  adjusting the number of rows and round length, every aspect of the game can be tailored. Advanced
                  features like the optional sparkle animation on a correct match and column mixing provide additional
                  ways to enhance the learning experience.
                </p>
              </div>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <GradientBorders topBorder={"20px"} rightBorder={"30px"} bottomBorder={"20px"} leftBorder={"30px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}PairLearner_Options_demo_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 650, 375)}
                  showSpinner={true}
                />
              </GradientBorders>
            </div>
          </div>

          <div className={styles.sideBySide}>
            <div className={styles.sideBySideLeftWrapper}>
              <GradientBorders topBorder={"20px"} rightBorder={"30px"} bottomBorder={"20px"} leftBorder={"30px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}PairLearner_Endless_mode_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 500, 410)}
                  showSpinner={true}
                />
              </GradientBorders>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <div className={styles.sectionTextRightWrapper}>
                <p>
                  There is also support for endless mode. By default, the game waits until the entire list is matched
                  before replacing it completely, but with endless mode enabled it replaces every two matched pairs with
                  new ones. This was particularly tricky to get right as replacing after every single match would mean
                  that the pairs remain in the same position for the entire game. So instead I decided to replace the
                  pairs after every two matches, while also shuffling the position of the words, leading to a more
                  randomized, challenging experience.
                </p>
              </div>
            </div>
          </div>

          <div className={viewportSize.width > 1430 ? styles.sideBySide : styles.sideBySideReversed}>
            <div className={styles.sideBySideLeftWrapper}>
              <div className={styles.sectionTextLeftWrapper}>
                <p>
                  To make the website more accessible, I included a demo of the game on the homepage. Featuring a set of
                  hardcoded emoji pairs, it is easy to solve for anyone regardless of the languages they speak. There is
                  also a toggle to enable endless mode here, allowing potential users to immediately understand the core
                  gameplay and experience both regular and endless modes before signing up.
                </p>
              </div>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <GradientBorders topBorder={"20px"} rightBorder={"30px"} bottomBorder={"20px"} leftBorder={"30px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}PairLearner_Emoji_demo_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 475, 245)}
                  showSpinner={true}
                />
              </GradientBorders>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionNameWrapperRight}>
            <h2>The Lesson</h2>
            <div className={styles.lineWrapper}>{lessonInView && <SectionNameLine fromRight={true} />}</div>
          </div>
          <div className={styles.sectionTextCenterWrapper}>
            <div className={pairLearnerStyles.lessonList}>
              <p ref={lessonRef}>
                This project taught me a lot about building a fully-fledged app and planning the functionality and
                design around the end user experience. From implementing user authentication flows to setting up a
                custom SMTP provider for email service, it was an invaluable experience. Below are some of its parts I
                consider most important:
              </p>

              <LazyMotion features={loadFeatures}>
                <m.ul variants={container} initial='hidden' animate='show'>
                  <m.li variants={item}>
                    <strong>Authentication System</strong> <br />
                    implemented comprehensive user authentication with email verification, password reset, and Magic
                    Link support using Supabase Auth
                  </m.li>
                  <m.li variants={item}>
                    <strong>Database Architecture</strong> <br />
                    designed and implemented efficient PostgreSQL database structure in Supabase to handle user data,
                    word pairs, and tags
                  </m.li>
                  <m.li variants={item}>
                    <strong>Email Integration</strong> <br />
                    configured a custom SMTP provider with Amazon SES for reliable delivery of authentication and
                    account-related emails
                  </m.li>
                  <m.li variants={item}>
                    <strong>Performance Optimization</strong> <br />
                    utilized pagination and lazy loading to handle large datasets efficiently, fetching only 50 pairs at
                    a time
                  </m.li>
                  <m.li variants={item}>
                    <strong>Data Management</strong> <br />
                    developed CSV/Excel import functionality to allow users to easily migrate existing word collections
                  </m.li>
                  <m.li variants={item}>
                    <strong>User Experience</strong> <br />
                    created an engaging learning environment with customizable game modes, tag filtering, and responsive
                    animations
                  </m.li>
                </m.ul>
              </LazyMotion>
            </div>
          </div>
        </div>

        <BackToTop />
      </m.div>
    </LazyMotion>
  );
}

export default PairLearner;
