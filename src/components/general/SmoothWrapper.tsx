"use client"

import { useEffect, ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default function SmoothWrapper({ children }: { children: ReactNode }) {
    useEffect(() => {
        const smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.2,
            effects: true,
        })
        return () => smoother.kill()
    }, [])

    return (
        <div id="smooth-wrapper" className="overflow-hidden">
            <div id="smooth-content">
                {children}
            </div>
        </div>
    )
}
