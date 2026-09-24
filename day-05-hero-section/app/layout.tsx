import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "AXIOM",
  description: "Visual imagination made effortlessly. Generate photorealistic and cinematic imagery with cutting-edge diffusion AI.",
  keywords: ["AXIOM", "AI Image Generator", "Diffusion Models", "Generative AI", "Concept Art"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${playfair.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white selection:bg-purple-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
