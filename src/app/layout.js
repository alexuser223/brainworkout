import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/nav/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Brain Workout - Master Your Math Skills",
  description:
    "Boost your calculation speed with interactive math quizzes and learning tools. Ideal for SSC, RRB, Banking, UPSC, and other competitive exams.",
  keywords:
    "math quiz, multiplication tables, SSC preparation, RRB exams, competitive exams, speed math, brain workout, arithmetic practice",
  openGraph: {
    title: "Brain Workout - Master Your Math Skills",
    description:
      "Boost your calculation speed with interactive math quizzes and learning tools. Ideal for SSC, RRB, Banking, UPSC, and other competitive exams.",
    url: "", // Add your website URL later
    type: "website",
    images: [
      {
        url: "", // Add your website's Open Graph image URL later
        width: 1200,
        height: 630,
        alt: "Brain Workout - Math Learning",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon and Mobile Optimization */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
<link rel="manifest" href="/site.webmanifest"/>

        {/* Meta Tags for SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content="Brain Workout Team" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta for Social Media */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Brain Workout",
              url: "", // Add your website URL later
              description: metadata.description,
              publisher: {
                "@type": "Organization",
                name: "Brain Workout",
                logo: "", // Add your logo URL later
              },
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
