import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  
  title: "Naufal - Vector Artist & Backend Developer",
  description:
    "Muhammad Naufal Ali Akbar - Spesialis vector art, landscape photography, dan backend development dengan CodeIgniter 4",
  keywords: [
    "vector art",
    "portrait vector",
    "landscape photography",
    "backend developer",
    "CodeIgniter",
    "web development",
    "digital art",
  ],
  authors: [{ name: "Muhammad Naufal Ali Akbar" }],
  creator: "Muhammad Naufal Ali Akbar",
  openGraph: {
    title: "Naufal - Vector Artist & Backend Developer",
    description: "Portfolio karya vector art, fotografi, dan web development",
    url: "https://your-domain.com",
    siteName: "Naufal Portfolio",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Naufal Portfolio",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naufal - Vector Artist & Backend Developer",
    description: "Portfolio karya vector art, fotografi, dan web development",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#d97706",
      },
    ],
  },
  manifest: "/site.webmanifest",
  // themeColor: "#d97706",
}

export const viewport: Viewport = {
  themeColor: "#d97706",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
