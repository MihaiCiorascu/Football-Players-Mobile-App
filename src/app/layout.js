import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "../context/PlayerContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Football Players App",
  description: "Manage and view football players",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <PlayerProvider>  
          {children}
        </PlayerProvider>
      </body>
    </html>
  );
}
