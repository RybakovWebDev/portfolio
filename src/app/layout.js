import { cookies } from "next/headers";
import { Inter } from "next/font/google";

import "./globals.css";
import "./styles.css";

import { RefsProvider } from "@/contexts/RefsContext";
import { LIGHT_COLORS, DARK_COLORS } from "@/constants";

const inter = Inter({ weight: "400", subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata = {
  title: "Andrey Rybakov",
  description: "My portfolio page",
};

export default function RootLayout({ children }) {
  const savedTheme = cookies().get("color-theme");
  const theme = savedTheme?.value || "light";

  const themeColors = theme === "light" ? LIGHT_COLORS : DARK_COLORS;
  return (
    <html lang='en' data-color-theme={theme} style={themeColors}>
      <body className={inter.className}>
        <RefsProvider>{children}</RefsProvider>
      </body>
    </html>
  );
}
