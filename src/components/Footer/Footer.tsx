"use client";
import styles from "./Footer.module.css";

import ExternalLinkIcon from "@/components/ExternalLinkIcon";

import { useRefsContext } from "@/contexts/RefsContext";
import { CONTACTS } from "@/constants";

function Footer() {
  const { footerRef } = useRefsContext();

  const currentYear = new Date().getFullYear().toString();

  return (
    <footer className={styles.wrapper}>
      <div className={styles.iconsWrapper}>
        {CONTACTS.map((c, i) => {
          return (
            <div className={styles.icon} key={c.title}>
              <ExternalLinkIcon aria-label={`Open my ${c.title}`} link={c.link}>
                {c.icon}
              </ExternalLinkIcon>
              {i !== CONTACTS.length - 1 && <span className={styles.divider}>|</span>}
            </div>
          );
        })}
      </div>
      <p ref={footerRef}>
        © <time dateTime={currentYear}>{currentYear}</time> Andrey Rybakov
      </p>
    </footer>
  );
}

export default Footer;
