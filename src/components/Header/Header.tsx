"use client";
import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { m, LazyMotion, AnimatePresence } from "framer-motion";

import styles from "./Header.module.css";

import DarkmodeToggle from "@/components/DarkmodeToggle";

import { useRefsContext } from "@/contexts/RefsContext";
import { NAVLINKS } from "@/constants";
import { scrollToRef } from "@/helpers";

const loadFeatures = () => import("../../featuresMax").then((res) => res.default);

const animationFinished = { opacity: 1, scale: 1 };

interface HeaderProps {
  initialTheme: string;
}

function Header({ initialTheme }: HeaderProps) {
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const { headerRef, projectSelectorRef, aboutRef, footerRef } = useRefsContext();

  const router = useRouter();
  const pathname = usePathname();
  const id = useId();

  useEffect(() => {
    if (hoveredNavItem !== null) {
      setHasAnimated(true);
    } else {
      setHasAnimated(false);
    }
  }, [hoveredNavItem]);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash === "#projects") {
      scrollToRef(projectSelectorRef);
    } else if (hash === "#about") {
      scrollToRef(aboutRef);
    } else if (hash === "#contact") {
      scrollToRef(footerRef);
    }
  });

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();

    if (pathname !== "/") router.push(`/#${slug}`);

    if (pathname === "/") {
      if (slug === "projects") {
        scrollToRef(projectSelectorRef);
      } else if (slug === "about") {
        scrollToRef(aboutRef);
      } else if (slug === "contact") {
        scrollToRef(footerRef);
      }
    }
  };

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.leftWrapper}>
        <Link href={"/"}>
          <h2 className={styles.initials}>AR</h2>
        </Link>
        <DarkmodeToggle initialTheme={initialTheme} />
      </div>
      <nav onMouseLeave={() => setHoveredNavItem(null)}>
        <ul className={styles.ul}>
          {NAVLINKS.map((l) => {
            return (
              <li key={l.title} className={styles.li}>
                <Link
                  href={l.href}
                  onMouseEnter={() => setHoveredNavItem(l.title)}
                  onClick={(e) => handleLinkClick(e, l.slug)}
                >
                  {l.title}
                </Link>
                <LazyMotion features={loadFeatures}>
                  <AnimatePresence>
                    {hoveredNavItem === l.title ? (
                      <m.div
                        className={styles.hovered}
                        layoutId={id}
                        initial={hasAnimated ? animationFinished : { opacity: 0, scale: 0 }}
                        animate={animationFinished}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", damping: 70, stiffness: 700 }}
                      />
                    ) : null}
                  </AnimatePresence>
                </LazyMotion>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
