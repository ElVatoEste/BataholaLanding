"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface CloudBannerProps {
    /** Clases Tailwind para la altura del banner (ej. "h-[70vh] md:h-[80vh]") */
    bannerHeightClasses?: string
    /** Pixel final de movimiento en Y para las nubes (ej. 80) */
    cloudY?: number
    /** Clases Tailwind para posicionamiento de las nubes (ej. "bottom-5 md:bottom-20") */
    cloudBottomClasses?: string
}

export default function CloudBanner({
                                        bannerHeightClasses = "h-[80vh] md:h-[90vh]",
                                        cloudY = 100,
                                        cloudBottomClasses = "bottom-10 md:-bottom-35",
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
                className={`absolute ${cloudBottomClasses} left-0 w-full pointer-events-none z-10`}
            >
                <img
                    src="/assets/clouds.svg"
                    alt="Nubes blancas"
                    className="w-full h-auto scale-[2.2] md:scale-100 transition-transform duration-300"
                />
            </div>
        </section>
    )
}
