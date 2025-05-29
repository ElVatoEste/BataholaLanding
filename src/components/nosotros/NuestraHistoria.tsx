"use client"

export default function NuestraHistoria() {
    return (
        <section className="py-16 px-4 md:px-8 lg:px-16 w-full bg-white relative ">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 text-negro">NUESTRA HISTORIA</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                    {/* Primera columna */}
                    <div className="space-y-8">
                        <p className="text-sm md:text-base lg:text-lg text-center md:text-left text-gris">
                            El Centro Cultural Batahola Norte fue fundado por el Padre Ángel Torrellas, Dominico y la Hna. Margarita
                            Navarro, Hermana de San José de Medellín, cuando llegaron de México en marzo de 1983 para colaborar con el
                            pueblo nicaragüense. Los dos iban preparados en la pastoral del Concilio Vaticano II y Medellín. Ángel era
                            profesor de música y Margarita tenía conocimientos en medicina preventiva. Ambos llegaron a Nicaragua con
                            sueños de vivir una sociedad más fraterna según el evangelio.
                        </p>

                        <p className="text-sm md:text-base lg:text-lg text-center md:text-left text-gris">
                            A su llegada, el Barrio Batahola Norte estaba recientemente construida. Asimismo, los fundadores
                            identificaron que los niños y niñas de la comunidad no contaban con una escuela o lugares recreativos.
                        </p>

                        <p className="text-sm md:text-base lg:text-lg text-center md:text-left text-gris">
                            Por lo cual, organizaron e involucraron a la comunidad de Batahola Norte, para realizar la construcción
                            del Colegio Carlos Fonseca Amador y un parque recreativo frente a las instalaciones del Centro.
                        </p>
                    </div>

                    {/* Segunda columna */}
                    <div className="space-y-8">
                        <p className="text-sm md:text-base lg:text-lg text-center md:text-left text-gris">
                            Ambos religiosos visitaron casa por casa de Batahola Norte para formar grupos de reflexión compartiendo la
                            palabra de Dios. Las misas campales todos los domingos se fueron convirtiendo en el sentir de una
                            comunidad.
                        </p>

                        <p className="text-sm md:text-base lg:text-lg text-center md:text-left text-gris">
                            En agosto de 1983, se realizaron las primeras catequesis donde todos los niños, niñas y adolescentes
                            lograron recibir su primera comunión. El Padre Ángel Torrellas formó un coro musical llamado &#34;Coro de
                            Niños de Batahola&#34; conformado por alrededor de 80 integrantes quienes estudiaban música en la
                            organización.
                        </p>

                        <p className="text-sm md:text-base lg:text-lg text-center md:text-left text-gris">
                            El Centro Cultural Batahola Norte fue concebido por sus fundadores como un espacio de formación integral
                            para mujeres, hombres y niñez para ser guiados con los principios cristianos de justicia, amor y
                            solidaridad.
                        </p>
                    </div>
                </div>
            </div>

            {/* Elemento decorativo verde - círculo hueco */}
            <div
                className="
                    absolute
                    -bottom-40 -right-30 w-60 h-60
                    md:-bottom-44 md:-right-24 md:w-72 md:h-72
                    lg:-bottom-48 lg:-right-28 lg:w-80 lg:h-80
                    xl:-bottom-60 xl:-right-35 xl:w-100 xl:h-100
                    pointer-events-none
                  "
            >
                <div
                    className="
                      w-full h-full rounded-full
                      border-[15px] md:border-[20px] lg:border-[25px] xl:border-[40px]
                      border-verde opacity-90
                    "
                />
            </div>

        </section>
    )
}
