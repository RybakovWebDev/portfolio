import dynamic from "next/dynamic";

import styles from "./page.module.css";

import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Experience from "@/components/Experience";
import CallToAction from "@/components/CallToAction";

const ProjectSelector = dynamic(() => import("@/components/ProjectSelector"));
const Footer = dynamic(() => import("@/components/Footer"));
const HomepageBackground = dynamic(() => import("@/components/HomepageBackground"));
const BackToTop = dynamic(() => import("@/components/BackToTop"));

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <AboutMe />
      <Experience />
      <ProjectSelector />
      <CallToAction />
      <Footer />
      <HomepageBackground />
      <BackToTop />
    </main>
  );
}
