"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { m, LazyMotion, useInView } from "framer-motion";

import styles from "../projects.module.css";

import SectionNameLine from "@/components/SectionNameLine";
import EmbedVideo from "@/components/EmbedVideo";
import GradientBorders from "@/components/GradientBorders";
import ProjectLinks from "@/components/ProjectLinks";

const BackToTop = dynamic(() => import("@/components/BackToTop"));
const NameGeneratorDemo = dynamic(() => import("@/components/NameGeneratorDemo"));
const AwsIconAnimation = dynamic(() => import("@/components/AwsIconAnimation"));

import useViewportSize from "@/hooks/useViewportSize";
import { PROJECTS, finalVerticalOffset, initialVerticalOffset } from "@/constants";
import { calculateVideoHeight } from "@/helpers";

const loadFeatures = () => import("../../../features").then((res) => res.default);

const project = PROJECTS.filter((p) => p.slug === "MDS")[0];

function MDS() {
  const viewportSize = useViewportSize();

  const goalRef = useRef<HTMLDivElement>(null);
  const challengeRef = useRef<HTMLDivElement>(null);
  const nameDemoRef = useRef<HTMLDivElement>(null);
  const lessonRef = useRef<HTMLParagraphElement>(null);

  const goalInView = useInView(goalRef, { once: true });
  const challengeInView = useInView(challengeRef, { once: true });
  const nameDemoInView = useInView(nameDemoRef, { once: true });
  const lessonInView = useInView(lessonRef, { once: true });

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
        <GradientBorders>
          <EmbedVideo
            src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Homepage_MP4_H264.mp4`}
            srcVP9={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Homepage_WEBM_VP9.webm`}
            height={calculateVideoHeight(viewportSize.width, 650, 135)}
            showSpinner={true}
          />
        </GradientBorders>

        <ProjectLinks live={project.live} github={project.github} />

        <div className={styles.sectionTextCenterWrapper}>
          <p className={styles.sectionTextIntro}>
            My second personal project, Movie Data Search, is one of the largest ones I&#39;ve done to date. It allows
            users to find information about a movie (cast, budget, posters, trailers, where to watch it and so on) or
            chat with a AI bot that talks about anything related to movies. Registered users can create and share
            watchlists that are visible to anyone.
          </p>
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
              <GradientBorders>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Search_demo_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 435, 200)}
                  showSpinner={true}
                />
              </GradientBorders>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <div className={styles.sectionTextRightWrapper}>
                <p>
                  Originally I wanted to practice working with APIs, so I envisioned a simple website for finding basic
                  information about movies, but the project quickly grew in scale. Eventually I also decided to
                  implement user accounts where they could edit their names and upload custom profile pictures as well
                  as create, edit and share movie watchlists, with drag and drop support for lists, with everything
                  smoothly animated. As I was working on this, ChatGPT began to really blow up, so I also wanted to
                  practice working with AI chatbots by including it. Last but not least, it was important for me to make
                  the website responsive and functional on devices with different screen sizes.
                </p>
              </div>
            </div>
          </div>

          <div className={viewportSize.width > 1430 ? styles.sideBySide : styles.sideBySideReversed}>
            <div className={styles.sideBySideLeftWrapper}>
              <div className={styles.sectionTextLeftWrapper}>
                <p>
                  React was a natural fit for ease of working with UI and a large ecosystem. I used the hooks heavily
                  for state management, while the context API was invaluable for sharing data easily across the
                  application. To optimize search, I chose the custom use-debounce hook as it was a tiny,
                  well-maintained package with zero dependencies. For the rest of the stack, a lot of it was dictated by
                  what I wanted to practice with.
                </p>
              </div>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <div className={styles.iconWrapper}>
                <Image
                  className={styles.fadeIn}
                  src={"/images/icons/React_logo512.png"}
                  alt='React logo'
                  fill
                  sizes='200px'
                />
              </div>
            </div>
          </div>

          <div className={styles.sideBySide}>
            <div className={styles.sideBySideLeftWrapper}>
              <div className={styles.iconWrapper}>
                <Image
                  className={styles.fadeIn}
                  src={"/images/icons/material-ui-icon-2048x1626-on580ia9.webp"}
                  alt='Material UI logo'
                  fill
                  sizes='200px'
                />
              </div>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <div className={styles.sectionTextRightWrapper}>
                <p>
                  For example, I wanted to gain some experience working with a component library, so I went with
                  Material UI as it offered an impressive selection of components, great documentation, and was easily
                  customizable. Even when the components didn&#39;t behave quite as I wanted them to, they provided a
                  great starting point, and I managed to customize everything to my liking and get a consistent look
                  across the website.
                </p>
              </div>
            </div>
          </div>

          <div className={viewportSize.width > 1430 ? styles.sideBySide : styles.sideBySideReversed}>
            <div className={styles.sideBySideLeftWrapper}>
              <div className={styles.sectionTextLeftWrapper}>
                <p>
                  I chose AWS as it was important for me to get a deeper understanding of how to deploy a full-stack
                  application. EC2 was used for hosting the database, while S3 was used for storing profile images. I
                  used Elastic Beanstalk for hosting the backend, Amplify for the frontend, and routed it through
                  CloudFront for HTTPS. I also connected CodePipeline to the GitHub repository to automate the
                  deployment process.
                </p>
              </div>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <AwsIconAnimation />
            </div>
          </div>

          <div className={styles.sideBySide}>
            <div className={styles.sideBySideLeftWrapper}>
              <div className={styles.iconWrapper}>
                <Image
                  className={styles.fadeIn}
                  src={`/images/icons/MongoDB_Spring-Green.svg`}
                  alt='MongoDB logo'
                  fill
                  sizes='200px'
                />
              </div>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <div className={styles.sectionTextRightWrapper}>
                <p>
                  For the database, I went with a MongoDB deployment to AWS EC2 to get some experience with manually
                  deploying a database and interacting with it instead of using a service like Mongo Atlas or Firebase.
                  Mongoose was used for cutting down on boilerplate and general streamlining of the development process.
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
                <p className={styles.sectionTextChallenge}>
                  No single API had all the data I required, so I ended up using TMDB along with OMDB and had to figure
                  out a way to combine relevant information from both.
                </p>
                <p>
                  For the homepage, I had to figure out a way to find currently popular movies, get their posters, and
                  then display them in an endless looping carousel in the background. For the movie page, I sorted the
                  gathered API data into several categories: general summary, cast, full crew, media (videos and
                  posters), similar titles, and streaming services that offer the movie based on selected country.
                </p>
              </div>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <div>
                <GradientBorders rightBorder={"30px"} leftBorder={"30px"}>
                  <EmbedVideo
                    src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Movie_info_scroll_MP4_H264.mp4`}
                    height={calculateVideoHeight(viewportSize.width, 550, 250)}
                    showSpinner={true}
                  />
                </GradientBorders>
              </div>
            </div>
          </div>

          <div className={styles.sideBySide}>
            <div className={styles.sideBySideLeftWrapper}>
              <GradientBorders topBorder={"30px"} bottomBorder={"30px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Watchlists_demo_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 360, 170)}
                  showSpinner={true}
                />
              </GradientBorders>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <div className={styles.sectionTextRightWrapper}>
                <p>
                  With watchlists I had to find a fitting drag and drop library that would integrate well with my stack.
                  After some research I chose dnd kit due to its continued support and solid documentation. It
                  integrated nicely with MUI, and I made sure to set it up correctly for use on devices with a touch
                  screen.
                </p>
              </div>
            </div>
          </div>

          <div className={viewportSize.width > 1430 ? styles.sideBySide : styles.sideBySideReversed}>
            <div className={styles.sideBySideLeftWrapper}>
              <div className={styles.sectionTextLeftWrapper}>
                <p>
                  Implementing custom profile pictures also meant using file validation logic, which I added on both
                  frontend and backend for better safety and lower chance of errors. A quite unexpected challenge I ran
                  into here was the iOS support. Apple uses HEIC as the default image format, and due to its rather low
                  adoption rate I had to detect such images on the client side, convert them to jpeg, and only then send
                  them to backend for further processing.
                </p>
              </div>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <GradientBorders topBorder={"30px"} rightBorder={"30px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Avatar_demo_MP4_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 360, 170)}
                  showSpinner={true}
                />
              </GradientBorders>
            </div>
          </div>

          <div className={styles.sideBySide}>
            <div className={styles.sideBySideLeftWrapper}>
              <GradientBorders topBorder={"30px"} bottomBorder={"30px"} leftBorder={"30px"} rightBorder={"60px"}>
                <EmbedVideo
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}Chat_demo_H264.mp4`}
                  height={calculateVideoHeight(viewportSize.width, 585, 270)}
                  showSpinner={true}
                />
              </GradientBorders>
            </div>
            <div className={styles.sideBySideRightWrapper}>
              <div className={styles.sectionTextRightWrapper}>
                <p>
                  I decided to make the AI chatbot available to everyone right on the home page, so I came up with a
                  switch between search and AI modes along with an animation to transition between them. At first I
                  expected this to be a difficult task, but as it turned out OpenAI has excellent documentation, and
                  their API is pretty straightforward, so it only took me a day to figure it out and include it in the
                  codebase.
                </p>
              </div>
            </div>
          </div>

          <div className={viewportSize.width > 1430 ? styles.sideBySide : styles.sideBySideReversed}>
            <div className={styles.sideBySideLeftWrapper}>
              <div className={styles.sectionTextLeftWrapper}>
                <p>
                  To streamline the registration process (and have some fun!) I used a unique name generator on the
                  backend that automatically comes up with a cute unique animal name that the user can later change in
                  the profile settings 😅
                </p>
              </div>
            </div>
            <div ref={nameDemoRef} className={styles.sideBySideRightWrapper}>
              {(nameDemoInView || viewportSize.width < 600) && (
                <div className={styles.fadeIn}>
                  <NameGeneratorDemo />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionNameWrapperRight}>
            <h2>The Lesson</h2>
            <div className={styles.lineWrapper}>{lessonInView && <SectionNameLine fromRight={true} />}</div>
          </div>
          <div className={styles.sectionTextCenterWrapper}>
            <div className={styles.lessonList}>
              <p ref={lessonRef}>
                Building this project was a great learning experience that challenged me to expand my web development
                skills. It improved my general understanding of how a full-stack website operates, how to organize such
                a project structure, and how to best approach solving a lot of common and not so common challenges. Some
                of my personal highlights among the stuff I had to figure out:
              </p>

              <LazyMotion features={loadFeatures}>
                <m.ul variants={container} initial='hidden' animate='show'>
                  <m.li variants={item}>
                    <strong>MUI</strong> <br /> used this UI framework to design and implement a responsive and
                    user-friendly interface
                  </m.li>
                  <m.li variants={item}>
                    <strong>AWS</strong> <br /> learnt to store and serve image files using S3, as well as to deploy a
                    full-stack application using Elastic Beanstalk and Amplify
                  </m.li>
                  <m.li variants={item}>
                    <strong>JWT</strong> <br /> used JSON Web Token to implement secure authentication and authorization
                    for the users
                  </m.li>
                  <m.li variants={item}>
                    <strong>APIs</strong> <br /> interacted with different 3rd party APIs and combined their data to
                    achieve what I wanted, built my own RESTful API to connect frontend with the backend
                  </m.li>
                  <m.li variants={item}>
                    <strong>Debouncing</strong> <br /> optimized the performance of my search functionality and reduced
                    unnecessary requests to the server
                  </m.li>
                  <m.li variants={item}>
                    <strong>Chatbots</strong> <br /> created a specialized AI chatbot that talks about movies
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

export default MDS;
