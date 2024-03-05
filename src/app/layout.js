import { Inter } from "next/font/google";
import "./globals.css";

import "./styles.css";
import { RefsProvider } from "@/contexts/RefsContext";

const inter = Inter({ weight: "400", subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata = {
  title: "Andrey Rybakov",
  description: "My portfolio page",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <RefsProvider>{children}</RefsProvider>
      </body>
    </html>
  );
}
