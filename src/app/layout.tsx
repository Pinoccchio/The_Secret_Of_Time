import type { Metadata } from "next";
import { Cinzel, Crimson_Text, Playfair_Display, Fira_Code } from "next/font/google";
import "./globals.css";

// Mystical display font for titles
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// Literary body font for dialogue and narratives
const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

// Dramatic font for special moments
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

// Monospace for ciphers and code
const firaCode = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Ang Lihim ng Panahon | The Secret of Time",
  description: "A mystical cipher adventure through Philippine history. Uncover ancient secrets, master cryptographic codes, and discover your family's legacy across time.",
  keywords: ["cipher", "cryptography", "Philippine history", "educational game", "time travel", "interactive story"],
  authors: [{ name: "Secret of Time Team" }],
  openGraph: {
    title: "The Secret of Time - Cipher Adventure",
    description: "Journey through Philippine history solving ancient ciphers",
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
      <body
        className={`${cinzel.variable} ${crimsonText.variable} ${playfair.variable} ${firaCode.variable} font-crimson antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
