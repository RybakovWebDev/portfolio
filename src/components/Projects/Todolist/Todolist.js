"use client";
import { useRef } from "react";
import { m, LazyMotion, domAnimation, useInView } from "framer-motion";

import styles from "../projects.module.css";
import todostyles from "./Todolist.module.css";

import SectionNameLine from "@/components/SectionNameLine";
import GradientBorders from "@/components/GradientBorders";
import EmbedVideo from "@/components/EmbedVideo";
import BackToTop from "@/components/BackToTop";

import useViewportSize from "@/hooks/useViewportSize";
import { calculateVideoHeight } from "@/helpers";

function Todolist() {
  const goalRef = useRef();
  const challengeRef = useRef();
  const heroRef = useRef();
  const lessonRef = useRef();

  const viewportSize = useViewportSize();

  const goalInView = useInView(goalRef, { once: true });
  const challengeInView = useInView(challengeRef, { once: true });
  const lessonInView = useInView(lessonRef, { once: true });

  return (
    <LazyMotion features={domAnimation}>
      <m.div initial={{ opacity: 0 }} animate={{ opacity: viewportSize.width ? 1 : 0 }} className={styles.page}>
        <h1 className={styles.title}>To-do List</h1>
        <p className={styles.description}>A simple, minimalist, responsive React to-do list.</p>
        <GradientBorders
          leftBorder={viewportSize.width > 1430 ? "220px" : "100px"}
          rightBorder={viewportSize.width > 1430 ? "220px" : "100px"}
        >
          <EmbedVideo
            src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Todolist_Homepage_MP4_H264.mp4`}
            height={calculateVideoHeight(viewportSize.width, 650, 250)}
            showSpinner={true}
          />
        </GradientBorders>
        <div ref={heroRef} className={styles.section}>
          <div className={styles.sectionTextCenterWrapper}>
            <p className={styles.sectionTextIntro}>
              My very first project done without the help of any tutorials. A very simple to-do list app that allows the
              user to add tasks, mark them as completed, and remove them. Supports multiple lists of tasks, as well as
              importing a list of tasks in multiple formats.
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
              <GradientBorders topBorder={"30px"} rightBorder={"30px"} bottomBorder={"30px"} leftBorder={"30px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Todolist_Adding_tasks_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 500, 250)}
                  showSpinner={true}
                />
              </GradientBorders>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <div className={styles.sectionTextRightWrapper}>
                <p className={todostyles.sectionTextGoal}>
                  The main purpose of this project was getting some experience working with React without anyone holding
                  my hand, to see whether I could build a functional website on my own. To-do list seemed like the
                  perfect candidate, allowing for varying levels of complexity while not being too overwhelming as a
                  final goal.
                </p>
                <p>
                  I felt like it was vital for me to practice pure Javascript and React, so the only extra packages I
                  used here were uuid for generating unique IDs, and react-spring for all the animations.
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
                  Coming up with all the basic logic was quite difficult, but also very fun because it was my chance to
                  finally create something from scratch by myself. Initially I created a simple lists of tasks that you
                  could mark as complete and delete (or clear the entire list with one button). Then I also decided to
                  implement some sorting, so that tasks marked as completed would be moved to the bottom of the list,
                  and back up if they were unmarked. Animating this probably took me the longest!
                </p>
              </div>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <GradientBorders topBorder={"30px"} rightBorder={"30px"} bottomBorder={"30px"} leftBorder={"30px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Todolist_Marking_removing_tasks_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 500, 250)}
                  showSpinner={true}
                />
              </GradientBorders>
            </div>
          </div>

          <div className={styles.sideBySide}>
            <div className={styles.sideBySideLeftWrapper}>
              <GradientBorders topBorder={"30px"} rightBorder={"30px"} bottomBorder={"30px"} leftBorder={"30px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Todolist_Managing_lists_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 600, 250)}
                  showSpinner={true}
                />
              </GradientBorders>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <div className={styles.sectionTextRightWrapper}>
                <p>
                  Next order of business was to add support for multiple lists and relevant management options. I was
                  already using local storage for the tasks, so I also used that for storing the lists. I then added all
                  the required functionality - adding lists, renaming or deleting, and selecting the active list, all
                  managed with React useState hook.
                </p>
              </div>
            </div>
          </div>

          <div className={viewportSize.width > 1430 ? styles.sideBySide : styles.sideBySideReversed}>
            <div className={styles.sideBySideLeftWrapper}>
              <div className={styles.sectionTextLeftWrapper}>
                <p>
                  Last but not least, I figured that people may already have a list typed out somewhere, and may want to
                  import that as tasks, so I added support for that. Clicking the relevant button shows a modal window
                  with instructions, clicking/tapping inside of which imports whatever was in the user clipboard and
                  formats it into a list of tasks. It supports lists separated by a hyphen (-), comma (,) or an
                  underscore (_) and uses those symbols as separators, creating an array of strings and adding each
                  string as a task while removing trailing spaces at the start, putting the string into lower case and
                  then capitalizing the first character for improved usability and readability.
                </p>
              </div>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <GradientBorders topBorder={"30px"} rightBorder={"30px"} bottomBorder={"30px"} leftBorder={"30px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Todolist_Importing_list_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 600, 250)}
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
            <div className={todostyles.lessonTextWrapper}>
              <p ref={lessonRef}>
                Despite overgrowing this project a long time ago, I&apos;m very glad for doing it and allowing me to see
                what it&apos;s like to work on my own with zero guidance. I made a large amount of mistakes, but they
                taught me a lot about how Javascript and React work, as well as how important it is to flesh out
                business logic before starting the actual development process.
              </p>
              <p>
                I am also quite proud of the visuals I was able to achieve. Everything moves smoothly and is animated
                with adorable springs which are very pleasing to the eye. This was my first introduction to spring
                animations, and I&apos;ve loved them ever since 😄
              </p>
            </div>
          </div>
        </div>

        <BackToTop />
      </m.div>
    </LazyMotion>
  );
}

export default Todolist;
