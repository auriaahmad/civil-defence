import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Civil Defence Pakistan - Volunteer Management System",
  description: "Register as a volunteer or manage emergency response coordination for Civil Defence Pakistan. Join thousands of volunteers helping during emergencies across Pakistan.",
  keywords: "civil defence, pakistan, volunteer, emergency response, disaster management, volunteer registration",
  authors: [{ name: "Civil Defence Pakistan" }],
  creator: "Civil Defence Pakistan",
  publisher: "Civil Defence Pakistan",
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: "Civil Defence Pakistan - Volunteer Management System",
    description: "Register as a volunteer for emergency response coordination across Pakistan",
    type: "website",
    locale: "en_PK",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
