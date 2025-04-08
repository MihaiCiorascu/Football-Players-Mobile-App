import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "../context/PlayerContext";
import { NetworkProvider } from '../context/NetworkContext';
import NetworkStatus from '../components/NetworkStatus/NetworkStatus';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Football Players Web",
  description: "A web application for managing football players",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NetworkProvider>
          <PlayerProvider>
            {children}
            <NetworkStatus />
          </PlayerProvider>
        </NetworkProvider>
      </body>
    </html>
  );
}
