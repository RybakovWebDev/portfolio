"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { m, LazyMotion, useInView } from "framer-motion";

import styles from "../projects.module.css";
import insightourStyles from "./Insightour.module.css";

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

function Insightour() {
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
            src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Insightour_Homepage_MP4_H264.mp4`}
            height={calculateVideoHeight(viewportSize.width, 700, 175)}
            showSpinner={true}
          />
        </GradientBorders>

        <ProjectLinks live={project.live} github={project.github} />

        <div ref={heroRef} className={styles.section}>
          <div className={styles.sectionTextCenterWrapper}>
            <p className={styles.sectionTextIntro}>
              A modern travel agency website featuring custom animations and multilingual support. Optimized for
              performance, SEO and accessibility with perfect Lighthouse scores across all metrics. Delivers a fluid
              experience across all devices.
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
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Insightour_Tours_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 750, 380)}
                  showSpinner={true}
                />
              </GradientBorders>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <div className={styles.sectionTextRightWrapper}>
                <p>
                  The goal was to create a modern, accessible website that would reach a wider audience without losing
                  the company&apos;s visual identity. I rebuilt their website from scratch using Next.js, implementing
                  multilingual support with React Context, adding interactive animations using Framer Motion, and
                  utilizing Vercel for deployment.
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
                  It was important to keep the design minimalistic yet playful and informative, so I tried to convey
                  information visually. This dotted line animation represents a route on a map, underlining the
                  excitement of exploration during tours. I created it with multiple custom svgs and then used Framer
                  Motion to animate their appearance.
                </p>
              </div>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <GradientBorders topBorder={"20px"} rightBorder={"30px"} bottomBorder={"20px"} leftBorder={"30px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Insightour_AboutAnimation_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 650, 320)}
                  showSpinner={true}
                />
              </GradientBorders>
            </div>
          </div>

          <div className={styles.sideBySide}>
            <div className={styles.sideBySideLeftWrapper}>
              <GradientBorders topBorder={"20px"} rightBorder={"30px"} bottomBorder={"20px"} leftBorder={"30px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Insightour_Map_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 335, 155)}
                  showSpinner={true}
                />
              </GradientBorders>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <div className={styles.sectionTextRightWrapper}>
                <p>
                  Creating an interactive visualization of the country was crucial. By combining D3.js with GeoJSON data
                  to draw the map and Framer Motion for animation, the end result was a beautiful minimalist map of the
                  country with regional borders visible. The key cities from the tours offered by the agency are
                  highlighted, with an animated line drawn connecting 4 of the cities randomly. Each time the animation
                  completes, it redraws connecting a different set of four cities, showcasing the variety of routes
                  available.
                </p>
              </div>
            </div>
          </div>

          <div className={viewportSize.width > 1430 ? styles.sideBySide : styles.sideBySideReversed}>
            <div className={styles.sideBySideLeftWrapper}>
              <div className={styles.sectionTextLeftWrapper}>
                <p>
                  Call to action button that opens a contact form is present in multiple places across the website. All
                  of its inputs are sanitized and validated on the Next.js backend, and then sent to a table using
                  Google Sheets API as per the client&apos;s request. I implemented rate limiting to prevent abuse and
                  control API costs.
                </p>
              </div>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <GradientBorders topBorder={"20px"} rightBorder={"30px"} bottomBorder={"20px"} leftBorder={"30px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Insightour_Book_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 490, 210)}
                  showSpinner={true}
                />
              </GradientBorders>
            </div>
          </div>

          <div className={styles.sideBySide}>
            <div className={styles.sideBySideLeftWrapper}>
              <GradientBorders topBorder={"20px"} rightBorder={"30px"} bottomBorder={"20px"} leftBorder={"30px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Insightour_Rates_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 510, 235)}
                  showSpinner={true}
                />
              </GradientBorders>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <div className={styles.sectionTextRightWrapper}>
                <p>
                  The website features many interactive elements like this rates section, which I designed to be simple
                  yet informative, with smooth, subtle animations to enhance the user experience in a text-heavy
                  environment.
                </p>
              </div>
            </div>
          </div>

          <div className={viewportSize.width > 1430 ? styles.sideBySide : styles.sideBySideReversed}>
            <div className={styles.sideBySideLeftWrapper}>
              <div className={styles.sectionTextLeftWrapper}>
                <p>
                  Supporting both English and Arabic was a key requirement, so I implemented a seamless language
                  switching system using React context. The content structure was designed with scalability in mind -
                  adding new languages or content is as simple as updating a single file. Pages dynamically access
                  content based on the selected language, making future maintenance a breeze. The system also includes
                  automatic language detection based on the user&apos;s IP address and browser preferences, defaulting
                  to Arabic for visitors from Middle Eastern countries.
                </p>
              </div>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <GradientBorders topBorder={"20px"} rightBorder={"30px"} bottomBorder={"20px"} leftBorder={"30px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Insightour_Language_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 650, 325)}
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
            <div className={insightourStyles.lessonList}>
              <p ref={lessonRef}>
                Work on this project presented me with numerous challenges that needed solutions the client would be
                satisfied with. Below are the tasks I found most engaging:
              </p>

              <LazyMotion features={loadFeatures}>
                <m.ul variants={container} initial='hidden' animate='show'>
                  <m.li variants={item}>
                    <strong>Language Selection</strong> <br />
                    designed and implemented a maintainable language selection solution using React context
                  </m.li>
                  <m.li variants={item}>
                    <strong>Complex Animations</strong> <br />
                    came up with visually engaging animations to enhance the user experience in a text-heavy website
                  </m.li>
                  <m.li variants={item}>
                    <strong>Google Sheets API</strong> <br />
                    developed a secure, rate-limited contact form with Google Sheets integration
                  </m.li>
                  <m.li variants={item}>
                    <strong>Country Map</strong> <br />
                    used D3.js and GeoJSON data to create an animated map showcasing potential tour routes provided by
                    the agency
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

export default Insightour;
