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
      <Header />
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

//  <main className={styles.main}>
//    <Header />
//    <Hero />
//    <AboutMe />
//    <ProjectSelector />
//    <ContactForm />
//    <Footer />
//    <HomepageBackground />
//    <BackToTop />
//  </main>;

// <main className={styles.main}>
//   <HomepageBackground />
//   <BackToTop />
//   <Footer id='footer' aria-flowto='contactForm' />
//   <ContactForm id='contactForm' aria-flowto='projectSelector' />
//   <ProjectSelector id='projectSelector' aria-flowto='aboutMe' />
//   <AboutMe id='aboutMe' aria-flowto='hero' />
//   {/* <TechIcons id='techIcons' aria-flowto='hero' /> */}
//   <Hero id='hero' aria-flowto='header' />
//   <Header id='header' />
// </main>;
