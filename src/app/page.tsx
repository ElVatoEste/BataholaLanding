import HeroBanner from "@/components/HeroBanner"

export default function Home() {
    return (
        <main>
            <HeroBanner />
            <section className="min-h-screen bg-white p-12">
                <h2 className="text-2xl font-bold text-center">Contenido principal</h2>
            </section>
        </main>
    )
}
