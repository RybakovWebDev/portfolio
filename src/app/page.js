import styles from "./page.module.css";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TechIcons from "@/components/TechIcons";
import ProjectSelector from "@/components/ProjectSelector";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import AboutMe from "@/components/AboutMe";
import ContactForm from "@/components/ContactForm";
import HomepageBackground from "@/components/HomepageBackground";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <AboutMe />
      <ProjectSelector />
      <ContactForm />
      <Footer />
      <HomepageBackground />
      <BackToTop />
    </main>
  );
}
