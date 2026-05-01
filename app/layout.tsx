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
        {/* Orbitron (display/futuristic) + DM Sans (body) + Syne (accent) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
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
