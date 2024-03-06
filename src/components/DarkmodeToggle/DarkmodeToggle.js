import React, { useState } from "react";
import Cookies from "js-cookie";

import { Moon, Sun } from "react-feather";

import styles from "./DarkmodeToggle.module.css";

import { LIGHT_COLORS, DARK_COLORS } from "@/constants";

const savedTheme = Cookies.get("color-theme");
const initialTheme = savedTheme?.value || "light";

function DarkmodeToggle() {
  const [theme, setTheme] = useState(initialTheme);

  function handleClick() {
    const nextTheme = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);

    Cookies.set("color-theme", nextTheme, {
      expires: 1000,
    });

    const root = document.documentElement;
    const colors = nextTheme === "light" ? LIGHT_COLORS : DARK_COLORS;

    root.setAttribute("data-color-theme", nextTheme);

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <button aria-label='Darkmode toggle' className={styles.wrapper} onClick={handleClick}>
      {theme === "light" ? <Sun size='1.5rem' /> : <Moon size='1.5rem' />}
    </button>
  );
}

export default DarkmodeToggle;
