
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { Providers } from "./components/providers";
import Footer from "@/app/components/Footer"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Ecostay | Renting, Villas, Houses",
    description: "Ecostay - eco reliable houses for vacation",
};

export default function RootLayout({ children }) {

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
            <Navbar />
            {children}
            <Footer></Footer>
        </Providers>
        </body>
        </html>
    );
}
