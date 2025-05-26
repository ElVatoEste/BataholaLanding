import CloudBanner from "@/components/CloudBanner"
import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaClock, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import React from "react";
import FormContacto from "@/components/contacto/FormContacto";

export default function Contacto() {
    return (
        <main className="relative">
            <CloudBanner
                bannerText="Contáctanos"
                bannerHeightClasses="h-[80vh] md:h-[100vh]"
            />

            <section className="relative z-[50] bg-white text-black flex justify-center py-10">
                <div className="bg-white w-full">
                    {/* informacion de contacto */}
                    <div className="ml-20">
                        <div>
                            <h1 className="text-2xl font-bold mb-4">Llámanos o escríbenos</h1>
                            <div className="flex flex-col gap-3 ">
                                <div className="flex items-center gap-2">
                                    <FaPhone />
                                    <span className="text-base md:text-lg">
                                        (505) 2266-7737 | (505) 2250-4542
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaWhatsapp />
                                    <span className="text-base md:text-lg">WhatsApp</span>
                                </div>
                            </div>
                        </div>
                    
                        {/* Contenedor para Redes Sociales y Horario en la misma fila */}
                        <div className="flex flex-row gap-20 mt-20">
                            {/* Redes Sociales */}
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Redes Sociales</h3>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <FaFacebookF />
                                        <span className="text-base md:text-lg">Facebook</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaInstagram />
                                        <span className="text-base md:text-lg">Instagram</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaYoutube />
                                        <span className="text-base md:text-lg">YouTube</span>
                                    </div>
                                </div>
                            </div>

                        {/* Horario de Oficinas */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Horario de Oficinas</h3>
                            <div className="flex flex-col gap-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <FaClock />
                                    <span className="text-base md:text-lg">Lunes a Viernes — 8:00 am – 12:00 pm | 1:30 pm – 5:30 pm</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaClock />
                                    <span className="text-base md:text-lg">Sábados — 8:00 am – 12:00 pm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    {/* Container de Ubicación (centrado en la página) */}
                    <div className="mt-20 w-full flex justify-center">
                        <div className="max-w-2xl text-center">
                            {/* Icono y Título (en línea) */}
                            <div className="flex justify-center items-center gap-2">
                                <FaMapMarkerAlt className="text-xl" />
                                <h3 className="text-2xl font-bold">Ubicación</h3>
                            </div>
                            
                            {/* Dirección (centrada debajo) */}
                            <p className="text-base md:text-lg">
                                Batahola Norte, de donde fue Embajada EEUU 1c. abajo, 3c. al lago, 1c. abajo. Apdo. RP 42. Managua, Nicaragua
                            </p>
                        </div>
                    </div>
                    {/* Mapa */}
                    <div className="mt-10 mx-auto w-full max-w-6xl">
                        <iframe
                        src="https://maps.google.com/maps?q=Batahola%20Norte%20Managua&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-64 md:h-96 rounded-lg border-0"
                        />
                    </div>
                </div>
            </section>
            <FormContacto />
        </main>
    )
}