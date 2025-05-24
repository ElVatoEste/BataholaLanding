'use client'

import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaClock, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-negro  text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Mapa */}
            <div className="w-full">
    <iframe
        src="https://maps.google.com/maps?q=Batahola%20Norte%20Managua&t=&z=15&ie=UTF8&iwloc=&output=embed"
    allowFullScreen
    loading="lazy"
    className="w-full h-64 rounded-lg border-0"
        />
        </div>

    {/* Ubicación & Horario */}
    <div>
        <h3 className="text-xl font-bold mb-4">Ubicación</h3>
        <div className="flex items-start gap-3 mb-6">
    <FaMapMarkerAlt className="mt-1 text-verde" />
    <p className="text-sm leading-relaxed">
        Batahola Norte, de donde fue Embajada EEUU 1c. abajo, 3c. al lago, 1c. abajo.
        Apdo. RP 42. Managua, Nicaragua
    </p>
    </div>

    <h3 className="text-xl font-bold mb-4">Horario de Oficinas</h3>
    <div className="flex flex-col gap-3 text-sm">
    <div className="flex items-center gap-2">
        <FaClock />
        <span>Lunes a Viernes — 8:00 am – 12:00 pm | 1:30 pm – 5:30 pm</span>
    </div>
    <div className="flex items-center gap-2">
        <FaClock />
        <span>Sábados — 8:00 am – 12:00 pm</span>
    </div>
    </div>
    </div>

    {/* Contacto */}
    <div>
        <h3 className="text-xl font-bold mb-4">Contáctanos</h3>
        <div className="flex flex-col gap-3 text-sm">
    <div className="flex items-center gap-2">
        <FaPhone />
        <span>(505) 2266-7737 | (505) 2250-4542</span>
    </div>
    <div className="flex items-center gap-2">
    <FaWhatsapp className="text-green-500" />
        <span>WhatsApp</span>
        </div>
        </div>
        </div>

    {/* Redes Sociales */}
    <div>
        <h3 className="text-xl font-bold mb-4">Redes Sociales</h3>
    <div className="flex flex-col gap-3 text-sm">
    <div className="flex items-center gap-2">
        <FaFacebookF />
        <span>Facebook</span>
        </div>
        <div className="flex items-center gap-2">
        <FaInstagram />
        <span>Instagram</span>
        </div>
        <div className="flex items-center gap-2">
        <FaYoutube />
        <span>YouTube</span>
        </div>
        </div>
        </div>

        </div>

        <div className="mt-12 text-center text-sm">
        © {new Date().getFullYear()} CENTRO CULTURAL BATAHOLA NORTE
    </div>
    </footer>
)
}
