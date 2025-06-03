"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { HiMenu, HiX } from "react-icons/hi"
import clsx from "clsx"

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => setMenuOpen(!menuOpen)

    return (
        <header className="bg-white shadow-sm z-50 relative">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/public" className="flex items-center gap-3">
                        <Image
                            src="/assets/logo.svg"
                            alt="Centro Cultural Batahola Norte"
                            width={50}
                            height={50}
                            priority
                        />
                        <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg text-black">
                Centro Cultural
              </span>
                            <span className="text-sm text-black -mt-1">
                Batahola Norte
              </span>
                        </div>
                    </Link>

                    {/* Icono móvil */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-3xl text-black"
                        aria-label="Toggle Menu"
                    >
                        {menuOpen ? <HiX /> : <HiMenu />}
                    </button>

                    {/* Menú - Desktop */}
                    <ul className="hidden md:flex gap-8 font-bold text-black uppercase text-sm tracking-wide">
                        <li><Link href="/">Inicio</Link></li>
                        <li><Link href="/nosotros">Nosotros</Link></li>
                        <li><Link href="/programas">Programas</Link></li>
                        <li><Link href="/cursos">Cursos</Link></li>
                        <li><Link href="/novedades">Novedades</Link></li>
                        <li><Link href="/contacto">Contacto</Link></li>
                    </ul>
                </div>
            </nav>

            {/* Menú móvil con animación */}
            <div
                className={clsx(
                    "md:hidden origin-top transition-transform duration-300 ease-in-out overflow-hidden bg-white shadow-md absolute w-full left-0 z-40",
                    menuOpen ? "scale-y-100 py-6" : "scale-y-0 py-0"
                )}
                style={{ top: "80px" }} // altura de la navbar
            >
                <ul className="flex flex-col items-center gap-6 font-bold text-black uppercase text-sm tracking-wide">
                    <li><Link href="/" onClick={toggleMenu}>Inicio</Link></li>
                    <li><Link href="/nosotros" onClick={toggleMenu}>Nosotros</Link></li>
                    <li><Link href="/programas" onClick={toggleMenu}>Programas</Link></li>
                    <li><Link href="/cursos" onClick={toggleMenu}>Cursos</Link></li>
                    <li><Link href="/novedades" onClick={toggleMenu}>Novedades</Link></li>
                    <li><Link href="/contacto" onClick={toggleMenu}>Contacto</Link></li>
                </ul>
            </div>
        </header>
    )
}
