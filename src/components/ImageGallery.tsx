"use client"

import Image from "next/image"
import {ImageGalleryProps} from "@/interfaces/ImageGalleryProps";

export default function ImageGallery({
                                         images = [],
                                         title = "Galería de Imágenes",
                                         className = "",
                                     }: ImageGalleryProps) {


    // Combinar las imágenes proporcionadas con los placeholders
    const displayImages = [...images]
    while (displayImages.length < 6) {
        displayImages.push({ src: "", alt: `Imagen ${displayImages.length + 1}` })
    }

    return (
        <section className={`w-full bg-white py-12 px-4 md:px-8 lg:px-16 ${className}`}>
            <div className="max-w-7xl mx-auto">
                {title && <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 z-[23]">
                    {displayImages.map((image, index) => (
                        <div key={index} className="aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                            {image.src ? (
                                <Image
                                    src={image.src || "/placeholder.svg"}
                                    alt={image.alt}
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="64"
                                        height="64"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-gray-300"
                                    >
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                        <polyline points="21 15 16 10 5 21"></polyline>
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
