"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SmoothWrapper from "@/components/SmoothWrapper"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const hideFooter = ["/login", "/dashboard"].includes(pathname)

    return (
        <SmoothWrapper>
            <Navbar />
            {children}
            {!hideFooter && <Footer />}
        </SmoothWrapper>
    )
}
