"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {CloudBannerProps} from "@/interfaces/CloudBannerProps";

gsap.registerPlugin(ScrollTrigger)

export default function CloudBanner({
                                        bannerHeightClasses = "h-[80vh] md:h-[90vh]",
                                        cloudY = 100,
                                        cloudBottomClasses = "bottom-0",
                                    }: CloudBannerProps) {
    const cloudRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!cloudRef.current) return

        gsap.to(cloudRef.current, {
            y: cloudY,
            ease: "power1.out",
            scrollTrigger: {
                trigger: cloudRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        })
    }, [cloudY])

    return (
        <section className="relative bg-azul text-white text-center overflow-visible">
            {/* Banner dinámico */}
            <div className={`${bannerHeightClasses} flex items-center justify-center`}>
                <h1 className="text-3xl md:text-5xl font-bold">BANNER</h1>
            </div>

            {/* Nubes animadas */}
            <div
                ref={cloudRef}
                className={`absolute ${cloudBottomClasses} left-0 w-full pointer-events-none z-10 overflow-hidden`}
            >
                <div className="relative max-md:w-[200%] max-md:left-[-50%]">
                    <img
                        src="/assets/clouds.svg"
                        alt="Nubes blancas"
                        className="w-full h-auto scale-100 transition-transform duration-300"
                    />
                </div>
            </div>
        </section>
    )
}
