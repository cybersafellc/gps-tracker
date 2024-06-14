import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gps tracker",
  description: "Track your friend or familys in gps tracker",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
          <link
            href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
            rel="stylesheet"
          ></link>
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </>
  );
}
