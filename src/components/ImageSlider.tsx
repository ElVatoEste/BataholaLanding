"use client"

import React, { useState, useRef, useEffect } from "react"
import { ImageSliderProps } from "@/interfaces/ImageSliderProps"
import { gsap } from "gsap"

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [current, setCurrent] = useState(0)
    const len = images.length

    // índices de anterior y siguiente (wrap-around)
    const prevIndex = (current - 1 + len) % len
    const nextIndex = (current + 1) % len

    // refs para animar con GSAP
    const prevRef = useRef<HTMLImageElement>(null)
    const centralRef = useRef<HTMLImageElement>(null)
    const nextRef = useRef<HTMLImageElement>(null)

    // animación al cambiar de slide
    useEffect(() => {
        const tl = gsap.timeline()
        tl.fromTo(
            [prevRef.current, centralRef.current, nextRef.current],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power1.out" }
        )
    }, [current])

    return (
        <div className="relative bg-azul py-12 px-4 overflow-visible">
            {/* contenedor centralizado con solape */}
            <div className="relative mx-auto lg:mx-12 flex items-center justify-center overflow-visible [gap:-2rem] md:[gap:-4rem]">
                {/* Slider container con espacio positivo y esquinas más redondeadas */}
                <div className="flex items-center justify-center space-x-4 md:space-x-8">
                    {/* Peek anterior */}
                    <div
                        className="relative z-10 hidden sm:block flex-shrink-0 w-28 sm:w-40 md:w-48 lg:w-56 cursor-pointer"
                        onClick={() => setCurrent(prevIndex)}
                    >
                        <img
                            ref={prevRef}
                            src={images[prevIndex]}
                            alt={`Slide ${prevIndex + 1}`}
                            className="rounded-2xl w-full h-40 sm:h-56 md:h-64 lg:h-72 object-cover shadow-lg"
                        />
                    </div>

                    {/* Imagen central */}
                    <div
                        className="relative z-20 flex-shrink-0 w-64 sm:w-80 md:w-96 lg:w-[28rem] scale-105 cursor-pointer"
                        onClick={() => setCurrent(current)}
                    >
                        <img
                            ref={centralRef}
                            src={images[current]}
                            alt={`Slide ${current + 1}`}
                            className="rounded-2xl w-full h-56 sm:h-72 md:h-80 lg:h-[28rem] object-cover shadow-xl"
                        />
                    </div>

                    {/* Peek siguiente */}
                    <div
                        className="relative z-10 hidden sm:block flex-shrink-0 w-28 sm:w-40 md:w-48 lg:w-56 cursor-pointer"
                        onClick={() => setCurrent(nextIndex)}
                    >
                        <img
                            ref={nextRef}
                            src={images[nextIndex]}
                            alt={`Slide ${nextIndex + 1}`}
                            className="rounded-2xl w-full h-40 sm:h-56 md:h-64 lg:h-72 object-cover shadow-lg"
                        />
                    </div>
                </div>

                {/* Flechas pegadas a los peeks */}
                <button
                    onClick={() => setCurrent(prevIndex)}
                    className="absolute top-1/2 left-6 -translate-y-1/2 p-2 bg-white bg-opacity-20 text-white rounded-full z-30 sm:left-2"
                >
                    ‹
                </button>
                <button
                    onClick={() => setCurrent(nextIndex)}
                    className="absolute top-1/2 right-6 -translate-y-1/2 p-2 bg-white bg-opacity-20 text-white rounded-full z-30 sm:right-2"
                >
                    ›
                </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center space-x-2 mt-8">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-3 h-3 rounded-full transition ${
                            idx === current
                                ? "bg-green-500"
                                : "bg-gray-400 hover:bg-gray-200"
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default ImageSlider
