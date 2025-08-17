"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar />
          <Header />
          <div className='pt-14'>{children}</div>
        </Provider>
      </body>
    </html>
  );
}
