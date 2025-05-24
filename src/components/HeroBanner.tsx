"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"


gsap.registerPlugin(ScrollTrigger)

export default function HeroBanner() {
    const cloudRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!cloudRef.current) return

        gsap.to(cloudRef.current, {
            y: 100,
            ease: "power1.out",
            scrollTrigger: {
                trigger: cloudRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        })
    }, [])

    return (
        <section className="relative bg-azul text-white text-center overflow-visible">
            {/* Contenido principal */}
            <div className="h-[80vh] md:h-[90vh] flex items-center justify-center">
                <h1 className="text-3xl md:text-5xl font-bold">BANNER</h1>
            </div>

            {/* Nubes animadas con <img> nativo para animación */}
            <div
                ref={cloudRef}
                className="absolute bottom-10 md:-bottom-25 left-0 w-full pointer-events-none z-10"
             >
            <img
                src="/assets/clouds.svg"
                alt="Nubes blancas"
                className="w-full h-auto scale-[2] md:scale-100 transition-transform duration-300"
            />
        </div>

</section>
)
}
