export default function Valores() {
    return (
        <section className="bg-azul text-white py-16 px-6 text-center">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Pilares */}
                <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-center md:space-y-0 md:space-x-12">

                    {/* Humanidad */}
                    <span className="font-bold text-lg md:text-xl">Humanidad</span>

                    <span className="hidden md:block h-8 w-0.5 bg-verde" />

                    {/* Igualdad */}
                    <span className="font-bold text-lg md:text-xl">Igualdad</span>

                    <span className="hidden md:block h-8 w-0.5 bg-rojo" />

                    {/* Empoderamiento */}
                    <span className="font-bold text-lg md:text-xl">Empoderamiento</span>
                </div>

                {/* Descripción */}
                <div className="text-sm md:text-base leading-relaxed space-y-4 text-blanco">
                    <p>
                        Lorem ipsum dolor sit amet. Et odio nostrum sed provident harum qui enim suscipit ea autem voluptatem
                        et reiciendis illo in libero voluptatum. Et esse quia qui corrupti perferendis ut eaque repudiandae qui
                        omnis aliquid!
                    </p>
                    <p>
                        Et cupiditate modi cum debitis odio et animi dignissimos et reiciendis omnis ut reprehenderit voluptates
                        non omnis quas? Hic molestias quod sit earum beatae a praesentium quisquam sit minima sapiente ea
                        totam eius eos necessitatibus enim.
                    </p>
                </div>

            </div>
        </section>
    )
}
