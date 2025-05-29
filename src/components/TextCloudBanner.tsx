"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { CloudBannerProps } from "@/interfaces/CloudBannerProps"

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
                                                        "En CCBN, somos un equipo de profesionales apasionados por impulsar el crecimiento de nuestros clientes. Nos especializamos en brindar soluciones integrales de consultoría y asesoramiento en diversas áreas clave para el éxito empresarial.",
                                                    secondDescription:
                                                        "Nuestra misión es clara: ser el socio estratégico que impulse a nuestros clientes hacia el logro de sus metas y la consolidación de su liderazgo en el mercado. Nos comprometemos a ofrecer servicios de la más alta calidad, adaptados a las necesidades específicas de cada cliente y respaldados por un equipo de expertos altamente capacitados.",
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
          px-15 md:px-20 lg:px-30 xl:px-40
        `}
            >
                {/* Texto */}
                {columns
                    .filter((c) => c.type === "text")
                    .map((col, i) => (
                        <div key={i} className="md:w-1/2 space-y-6 md:space-y-8 md:pr-8">
                            {col.title && <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{col.title}</h2>}
                            {col.description && <p className="text-sm md:text-base lg:text-lg leading-relaxed">{col.description}</p>}
                            {col.secondDescription && (
                                <p className="text-sm md:text-base lg:text-lg leading-relaxed">{col.secondDescription}</p>
                            )}
                        </div>
                    ))}

                {/* Imagen circular */}
                {columns
                    .filter((c) => c.type === "image")
                    .map((col, i) => (
                        <div
                            key={i}
                            className="md:w-1/2 flex justify-center items-center md:justify-end md:items-start mt-8 md:mt-0"
                        >
                            {col.src ? (
                                <img
                                    src={col.src || "/placeholder.svg"}
                                    alt={col.alt || ""}
                                    className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-[26rem] xl:h-[26rem] rounded-full bg-gray-300 object-cover"
                                />
                            ) : (
                                <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full bg-gray-300"/>
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
                    <img src="/assets/clouds.svg" alt="Nubes blancas" className="w-full h-auto"/>
                </div>
            </div>
        </section>
    )
}
