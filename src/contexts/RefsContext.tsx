"use client";
import { createContext, useRef, useContext, RefObject } from "react";

interface RefsContextType {
  headerRef: RefObject<HTMLElement>;
  heroRef: RefObject<HTMLHeadingElement>;
  projectSelectorRef: RefObject<HTMLElement>;
  projectNameRef: RefObject<HTMLDivElement>;
  aboutRef: RefObject<HTMLElement>;
  contactRef: RefObject<HTMLElement>;
  footerRef: RefObject<HTMLParagraphElement>;
}

const RefsContext = createContext<RefsContextType | undefined>(undefined);

export function RefsProvider({ children }) {
  const headerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLHeadingElement>(null);
  const projectSelectorRef = useRef<HTMLElement>(null);
  const projectNameRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLParagraphElement>(null);

  return (
    <RefsContext.Provider
      value={{ headerRef, heroRef, projectSelectorRef, projectNameRef, aboutRef, contactRef, footerRef }}
    >
      {children}
    </RefsContext.Provider>
  );
}

export function useRefsContext() {
  return useContext(RefsContext);
}
