import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import CustomCursor from "./components/CustomCursor";
import NavBar from "./components/NavBar";
import ScrollProgress from "./components/ScrollProgress";

export const metadata: Metadata = {
  title: "Siddhen Pise — Computer Engineering",
  description:
    "Portfolio of Siddhen Pise — Computer Engineering undergraduate at Fr. CRIT specialising in DSA, AI/ML, and Full-Stack Development.",
  keywords: ["portfolio", "computer engineering", "AI/ML", "full-stack", "DSA", "Siddhen Pise"],
  authors: [{ name: "Siddhen Pise" }],
  openGraph: {
    title: "Siddhen Pise — Computer Engineering",
    description: "Building real-world systems. Shipping products that matter.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Sans + Open Sans via Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CustomCursor />
        <ScrollProgress />
        <SmoothScrollProvider>
          <NavBar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
