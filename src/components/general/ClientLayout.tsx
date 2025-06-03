"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/general/Navbar"
import Footer from "@/components/general/Footer"
import SmoothWrapper from "@/components/general/SmoothWrapper"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const hideFooter = ["/login", "/dashboard"].includes(pathname)
    const hideNavBar = ["/dashboard"].includes(pathname)

    return (
        <SmoothWrapper>
            {!hideNavBar && <Navbar />}
            {children}
            {!hideFooter && <Footer />}
        </SmoothWrapper>
    )
}
