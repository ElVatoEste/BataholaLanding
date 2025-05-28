import CloudBanner from "@/components/CloudBanner"
import Image from "next/image"
import Valores from "@/components/home/Valores"
import React from "react";
import {CirclesSection} from "@/components/CircleSection";
import ImageSlider from "@/components/ImageSlider";

export default function Home() {

    const fotos = [
        "/img/img1.jpg",
        "/img/img2.jpg",
        "/img/img3.jpg",
    ];


    return (
        <main className="relative">
            <CloudBanner
                bannerText="Banner"
                bannerHeightClasses="h-[80vh] md:h-[100vh]"
            />

            <section className="relative z-[50] bg-white flex justify-center py-10">
                <div className="bg-white inline-block overflow-hidden">
                    <Image
                        src="/assets/CCBN_Hero.webp"
                        alt="Banner institucional del CCBN"
                        width={1024}
                        height={520}
                        className="w-auto h-full"
                        priority
                    />
                </div>
            </section>

            <Valores />

            <CirclesSection
                title="LÍNEAS DE TRABAJO"
                subtitle="La convergencia de estos tres derechos o ejes estratégicos es fundamental
                para que los cambios visionados por el CCBN dejen de ser un sueño y se hagan realidad.
                Es por ello, que a cada uno de estos senderos los hemos convertido en programas estratégicos
                 que guiarán el trabajo a realizar con mujeres y hombres de todas las edades."
                items={[
                    { id: "1", label: "Programa Educación", bgColorClass: "bg-verde", borderColorClass: "border-verde" },
                    { id: "2", label: "Arte y Cultura",    bgColorClass: "bg-rojo",   borderColorClass: "border-rojo"   },
                    { id: "3", label: "Integridad",        bgColorClass: "bg-amarillo",borderColorClass: "border-amarillo" },
                ]}
                rows={1}
                showItemDescription={false}
            />

            <ImageSlider images={fotos} />


        </main>
    )
}
