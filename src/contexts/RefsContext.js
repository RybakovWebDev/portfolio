// contexts/RefsContext.js
"use client";
import { createContext, useRef, useContext } from "react";

const RefsContext = createContext();

export function RefsProvider({ children }) {
  const headerRef = useRef();
  const heroRef = useRef();
  const projectSelectorRef = useRef();
  const aboutRef = useRef();
  const contactRef = useRef();
  const footerRef = useRef();

  return (
    <RefsContext.Provider value={{ headerRef, heroRef, projectSelectorRef, aboutRef, contactRef, footerRef }}>
      {children}
    </RefsContext.Provider>
  );
}

export function useRefsContext() {
  return useContext(RefsContext);
}
