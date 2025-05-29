import React from 'react'
import { FaChevronDown } from 'react-icons/fa'
import EnviarButton from '@/components/buttons/EnviarButton'

export default function FormContacto() {
  return (
    <section className="bg-azul text-white py-16 px-6">
      <div className="max-w-4xl mx-auto flex flex-col space-y-8">
        {/* Header */}
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Queremos escucharte
        </h1>
        <p className="text-base md:text-lg leading-relaxed text-blanco text-center">
          Si tienes preguntas sobre nuestros talleres, actividades culturales o deseas
          colaborar con el Centro Cultural Batahola Norte, por favor completa el
          siguiente formulario. Te responderemos lo antes posible, muchas gracias.
        </p>

        {/* Formulario */}
        <form className="flex flex-col md:flex-row gap-6">
          {/* Campos Izquierda */}
          <div className="flex-1 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nombre"
              className="w-full bg-white text-black rounded-full px-4 py-2 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full bg-white text-black rounded-full px-4 py-2 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Número de contacto"
              className="w-full bg-white text-black rounded-full px-4 py-2 focus:outline-none"
            />
            <div className="relative">
              <select
                className="w-full bg-white text-black rounded-full px-4 py-2 appearance-none focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Motivo del mensaje
                </option>
                <option>Información</option>
                <option>Colaboración</option>
                <option>Otro</option>
              </select>
              <FaChevronDown
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
          </div>

          {/* Mensaje */}
          <textarea
            placeholder="Mensaje"
            className="flex-1 h-48 bg-white text-black rounded-lg p-4 resize-none focus:outline-none"
          />
        </form>

        {/* Botón */}
        <div className="flex justify-center">
          <EnviarButton>Enviar</EnviarButton>
        </div>
      </div>
    </section>
  )
}
