import type { Metadata } from "next"
import React from "react"
import "./globals.css"
import { Poppins } from "next/font/google"
import ClientLayout from "@/components/ClientLayout"

const poppins = Poppins({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
})

export const metadata: Metadata = {
    title: "Centro Cultural Batahola Norte",
    description:
        "El Centro Cultural Batahola Norte, en Managua, es una organización que ofrece " +
        "formación integral para mujeres, hombres y niñez en educación, cultura y arte.",
    icons: {
        icon: "/assets/logo.svg",
        shortcut: "/assets/logo.svg",
        apple: "/assets/logo.svg",
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es" className={`${poppins.variable} font-poppins`}>
        <body>
        <ClientLayout>{children}</ClientLayout>
        </body>
        </html>
    )
}
