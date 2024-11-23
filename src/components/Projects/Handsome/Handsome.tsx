"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { m, LazyMotion, useInView } from "framer-motion";

import styles from "../projects.module.css";
import handsomeStyles from "./Handsome.module.css";

import SectionNameLine from "@/components/SectionNameLine";
import GradientBorders from "@/components/GradientBorders";
import EmbedVideo from "@/components/EmbedVideo";
import ProjectLinks from "@/components/ProjectLinks";

const BackToTop = dynamic(() => import("@/components/BackToTop"));

import useViewportSize from "@/hooks/useViewportSize";
import { calculateVideoHeight } from "@/helpers";
import { PROJECTS } from "@/constants";

const loadFeatures = () => import("../../../features").then((res) => res.default);

const project = PROJECTS.filter((p) => p.slug === "Handsome")[0];

function Handsome() {
  const goalRef = useRef<HTMLDivElement>(null);
  const challengeRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const lessonRef = useRef<HTMLParagraphElement>(null);

  const viewportSize = useViewportSize();

  const goalInView = useInView(goalRef, { once: true });
  const challengeInView = useInView(challengeRef, { once: true });
  const lessonInView = useInView(lessonRef, { once: true });

  return (
    <LazyMotion features={loadFeatures}>
      <m.div initial={{ opacity: 0 }} animate={{ opacity: viewportSize.width ? 1 : 0 }} className={styles.page}>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.description}>{project.description}</p>
        <GradientBorders
          topBorder={"30px"}
          rightBorder={viewportSize.width > 1430 ? "220px" : "100px"}
          bottomBorder={"20px"}
          leftBorder={viewportSize.width > 1430 ? "220px" : "100px"}
        >
          <EmbedVideo
            src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Homepage_desktop_MP4_H264.mp4`}
            height={calculateVideoHeight(viewportSize.width, 650, 310)}
            showSpinner={true}
          />
        </GradientBorders>

        <ProjectLinks live={project.live} github={project.github} />

        <div ref={heroRef} className={styles.section}>
          <div className={styles.sectionTextCenterWrapper}>
            <p className={styles.sectionTextIntro}>
              Website for a local bar for which I developed a static page with an interactive menu, a map, and relevant
              contact info. Developed using Next.js with TypeScript and Framer Motion. Optimized to be accessible and
              fast, with a perfect 100 Lighthouse score.
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
              <GradientBorders topBorder={"30px"} rightBorder={"10px"} bottomBorder={"10px"} leftBorder={"10px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Menu_mobile_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 550, 420)}
                  showSpinner={true}
                />
              </GradientBorders>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <div className={styles.sectionTextRightWrapper}>
                <p>
                  For this project, I was only given a logo and a first draft of the menu, so I implemented the design
                  language of both into the look and feel of the page. The end goal was to create a fast, responsive,
                  and easily readable website that effectively conveys information regardless of the device used to view
                  it.
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
                  Original MVP design used the images of the menu and switched between them, but I replaced it all with
                  a text version to improve loading time as well as make it easier to update the menu when needed. I
                  added indicators to show which category is currently selected, as well as a hover indicator for mouse
                  users. For the menu itself I went with a staggered animation for each sub category, making it slightly
                  more satisfying visually while staying true to the overall minimalistic style of the page.
                </p>
              </div>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <GradientBorders topBorder={"50px"} rightBorder={"30px"} bottomBorder={"30px"} leftBorder={"30px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Menu_desktop_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 500, 250)}
                  showSpinner={true}
                />
              </GradientBorders>
            </div>
          </div>

          <div className={styles.sideBySide}>
            <div className={styles.sideBySideLeftWrapper}>
              <GradientBorders topBorder={"30px"} rightBorder={"10px"} bottomBorder={"10px"} leftBorder={"10px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Homepage_mobile_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 600, 520)}
                  showSpinner={true}
                />
              </GradientBorders>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <div className={styles.sectionTextRightWrapper}>
                <p>
                  After the first version of the website was already live, the owner wanted to bring extra user
                  attention to the fact that the menu categories were interactive and clickable. Solution I came up with
                  was to quickly toggle the &quot;selected&quot; indicator for all categories in rapid succession upon
                  page load, suggesting that the items can be interacted with even without hovering over them with a
                  mouse, which was especially helpful on mobile devices. The tricky part was getting the timing just
                  right, ensuring it wasn&apos;t too slow to make the user wait, but also not too fast for them to miss
                  it.
                </p>
              </div>
            </div>
          </div>

          <div className={viewportSize.width > 1430 ? styles.sideBySide : styles.sideBySideReversed}>
            <div className={styles.sideBySideLeftWrapper}>
              <div className={styles.sectionTextLeftWrapper}>
                <p>
                  Page load speed was critical for this project, so I took extra care to optimize everything as much as
                  possible. I utilized lazy loading throughout the components, which was especially helpful for Framer
                  Motion, and compressed the logo image to .webp format for reduced file size with little impact on
                  quality. For the map component, I went with an iframe element instead of a third-party library to
                  reduce the overall package size and improve the page load speed. I also followed all SEO and
                  Accessibility recommendations from Lighthouse to achieve the perfect score across the board.
                </p>
              </div>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <GradientBorders topBorder={"30px"} rightBorder={"30px"} bottomBorder={"30px"} leftBorder={"30px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Lighthouse_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 470, 250)}
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
            <div className={handsomeStyles.lessonTextWrapper}>
              <p ref={lessonRef}>
                While working on this website I gained valuable experience with how a Next.js App Router project is
                structured and deployed. I learnt how Framer Motion can be optimized to reduce the overall app bundle
                size. Implementing Google Maps component inside of an iframe gave me a better understanding of how its
                API works. Finally, I had a chance to use my TypeScript knowledge in a real-world project, as it helped
                me streamline the development process and avoid potential issues down the line.
              </p>
            </div>
          </div>
        </div>

        <BackToTop />
      </m.div>
    </LazyMotion>
  );
}

export default Handsome;
