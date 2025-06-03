"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CloudBannerProps } from "@/interfaces/CloudBannerProps"

gsap.registerPlugin(ScrollTrigger)

export default function TextCloudBanner({
                                            bannerHeightClasses = "h-[80vh] md:h-[90vh]",
                                            cloudY = 100,
                                            cloudBottomClasses = "bottom-0",
                                            columns = [
                                                {
                                                    type: "text",
                                                    title: "¿QUIÉNES SOMOS?",
                                                    description:
                                                        "Lorem ipsum dolor sit amet. Et odio nostrum sed provident harum qui enim suscipit ea autem voluptatem et reiciendis illo in libero voluptatum.",
                                                },
                                                {
                                                    type: "image",
                                                    src: "/assets/CCBN_Hero.webp",
                                                    alt: "Ilustración circular",
                                                },
                                            ],
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
        <section className="relative bg-azul text-white overflow-hidden">
            {/* Banner principal */}
            <div
                className={`
          ${bannerHeightClasses} w-full
          flex flex-col md:flex-row
          pt-[5%]
          items-start
          px-6 md:px-50
        `}
            >
                {/* Texto */}
                {columns
                    .filter((c) => c.type === "text")
                    .map((col, i) => (

                        <div key={i} className="md:w-1/2 space-y-4 md:space-y-6">
                            {col.title && (
                                <h2 className="text-3xl md:text-5xl font-bold">
                                    {col.title}
                                </h2>
                            )}
                            {col.description && (
                                <p className="text-sm md:text-base leading-relaxed">
                                    {col.description}
                                </p>
                            )}ygir
                        </div>

                    ))}

                {/* Imagen circular */}
                {columns
                    .filter((c) => c.type === "image")
                    .map((col, i) => (
                        <div
                            key={i}
                            className="md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0"
                        >
                            {col.src ? (
                                <img
                                    src={col.src}
                                    alt={col.alt || ""}
                                    className="w-40 h-40 md:w-120 md:h-120 rounded-full bg-gray-300 object-cover"
                                />
                            ) : (
                                <div className="w-40 h-40 md:w-60 md:h-60 rounded-full bg-gray-300" />
                            )}
                        </div>
                    ))}
            </div>

            {/* Nubes animadas al fondo */}
            <div
                ref={cloudRef}
                className={`absolute ${cloudBottomClasses} left-0 w-full pointer-events-none z-10 overflow-hidden`}
            >
                <div className="relative max-md:w-[200%] max-md:-left-[50%]">
                    <img
                        src="/assets/clouds.svg"
                        alt="Nubes blancas"
                        className="w-full h-auto"
                    />
                </div>
            </div>
        </section>
    )
}
