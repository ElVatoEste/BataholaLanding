'use client'

import CloudBanner from "@/components/general/CloudBanner"
import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaClock, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import React from "react";
import FormContacto from "@/components/contacto/FormContacto";
import FixLineGlitch from "@/components/general/FixLineGlitch"

export default function Contacto() {
    return (
        <main>
            <div className="relative">
                <CloudBanner
                    bannerText="Contáctanos"
                    bannerHeightClasses="h-[80vh] md:h-[90vh]"
                />
            </div>

            {/* Sección de Información de Contacto (alineada a la izquierda) */}
            <section className="relative z-[50] bg-white text-black py-10">
                <div className="ml-8 md:ml-16 lg:ml-24 xl:ml-32"> {/* Ajusta estos valores según necesites */}
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Llámanos o escríbenos</h1>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <FaPhone className="text-lg"/>
                                <span className="text-base md:text-lg">
                                    (505) 2266-7737 | (505) 2250-4542
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaWhatsapp className="text-lg"/>
                                <span className="text-base md:text-lg">WhatsApp</span>
                            </div>
                        </div>
                    </div>

                    <FixLineGlitch/>

                    <div className="flex flex-col md:flex-row gap-8 md:gap-20 mt-20">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Redes Sociales</h3>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <FaFacebookF className="text-lg"/>
                                    <span className="text-base md:text-lg">Facebook</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaInstagram className="text-lg"/>
                                    <span className="text-base md:text-lg">Instagram</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaYoutube className="text-lg"/>
                                    <span className="text-base md:text-lg">YouTube</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-4">Horario de Oficinas</h3>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <FaClock className="text-lg"/>
                                    <span className="text-base md:text-lg">Lunes a Viernes — 8:00 am – 12:00 pm | 1:30 pm – 5:30 pm</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaClock className="text-lg"/>
                                    <span className="text-base md:text-lg">Sábados — 8:00 am – 12:00 pm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Ubicación y Mapa (centrados) */}
            <section className="bg-white py-10">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    {/* Contenido de Ubicación */}
                    <div className="text-center mb-10">
                        <div className="flex justify-center items-center gap-3 mb-4">
                            <FaMapMarkerAlt className="text-2xl text-black"/>
                            <h3 className="text-3xl font-bold text-black">Ubicación</h3>
                        </div>
                        <p className="text-lg mx-auto max-w-2xl text-black">
                            Batahola Norte, de donde fue Embajada EEUU 1c. abajo, 3c. al lago, 1c. abajo.
                            Apdo. RP 42. Managua, Nicaragua
                        </p>
                    </div>

                    {/* Mapa */}
                    <div className="w-full rounded-lg overflow-hidden">
                        <iframe
                            src="https://maps.google.com/maps?q=Batahola%20Norte%20Managua&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            allowFullScreen
                            loading="lazy"
                            className="w-full h-64 md:h-96 border-0"
                        />
                    </div>
                </div>
            </section>

            <FormContacto/>
        </main>
    )
}