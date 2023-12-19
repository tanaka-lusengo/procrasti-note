import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Procrasti-Not(e)",
  description: "A simple draggable notes taking app",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);

export default RootLayout;
