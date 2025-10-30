import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "./components/page-transition";
import SmoothScrollProvider from "./components/smooth-scroll-provider";

export const metadata: Metadata = {
  title: "Professional Coaching - Transform Your Life",
  description: "Unlock your potential and achieve your goals with personalized guidance from a certified professional coach dedicated to your success.",
  keywords: ["coaching", "life coach", "professional development", "personal growth", "career coaching"],
  authors: [{ name: "Coach" }],
  openGraph: {
    title: "Professional Coaching - Transform Your Life",
    description: "Unlock your potential and achieve your goals with personalized guidance",
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
      <body className="antialiased">
        <SmoothScrollProvider>
          <PageTransition>{children}</PageTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
