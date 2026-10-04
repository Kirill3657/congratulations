import type { Metadata } from "next";
import { Great_Vibes, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://congratulations-iota.vercel.app"),
  title: "С Днём Рождения, Викуля! 🎂",
  description:
    "Тёплое поздравление с 15-летием — моменты дружбы, письма от близких и много любви 💕",
  openGraph: {
    title: "С Днём Рождения, Викуля! 🎂",
    description:
      "Тёплое поздравление с 15-летием — моменты дружбы, письма от близких и много любви 💕",
    url: "https://congratulations-iota.vercel.app",
    siteName: "С Днём Рождения, Викуля!",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "С Днём Рождения, Викуля!",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "С Днём Рождения, Викуля! 🎂",
    description:
      "Тёплое поздравление с 15-летием — моменты дружбы, письма от близких и много любви 💕",
    images: ["/favicon.ico"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body
        className={`${montserrat.variable} ${greatVibes.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}