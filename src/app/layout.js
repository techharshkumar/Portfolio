import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Harsh Kumar | Full-Stack Developer",
  description:
    "Portfolio of Harsh Kumar — a passionate Full-Stack Developer crafting modern, high-performance web experiences with clean code and creative design.",
  keywords: ["developer", "full-stack", "portfolio", "react", "nextjs", "web developer"],
  authors: [{ name: "Harsh Kumar" }],
  openGraph: {
    title: "Harsh Kumar | Full-Stack Developer",
    description: "Crafting modern web experiences with clean code and creative design.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
