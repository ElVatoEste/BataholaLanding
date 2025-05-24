import HeroBanner from "@/components/HeroBanner"
import Image from "next/image"
import Valores from "@/components/home/Valores"

export default function Home() {
    return (
        <main className="relative">
            <HeroBanner/>

            <section className="relative z-[50] bg-white flex justify-center py-10">
                <div className="bg-white inline-block overflow-hidden">
                    <Image
                        src="/assets/CCBN_Hero.webp"
                        alt="Banner institucional del CCBN"
                        width={1200}
                        height={400}
                        className="w-full h-auto"
                        priority
                    />
                </div>
            </section>

            <Valores />

            {/* Contenido general debajo */}
            <section className="min-h-screen bg-white pt-[30vh] px-6 md:px-12">
                <h2 className="text-2xl font-bold text-center">Contenido principal</h2>
            </section>


        </main>
    )
}
