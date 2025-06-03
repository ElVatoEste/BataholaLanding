"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, signOut, type User } from "firebase/auth"
import { auth } from "@/firebase/clientApp"
import { ImageManager } from "@/components/dashboard/image-manager"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null)
    const [selectedPage, setSelectedPage] = useState("inicio")
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser)
            } else {
                router.push("/login")
            }
        })

        return () => unsubscribe()
    }, [router])

    const handleSignOut = async () => {
        try {
            await signOut(auth)
            router.push("/login")
        } catch (error) {
            console.error("Error signing out:", error)
        }
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <DashboardSidebar
                user={user}
                selectedPage={selectedPage}
                onPageSelect={setSelectedPage}
                onSignOut={handleSignOut}
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex h-16 items-center gap-2 border-b bg-white px-4">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded-md hover:bg-gray-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                        >
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                            <line x1="9" x2="9" y1="3" y2="21"></line>
                        </svg>
                        <span className="sr-only">Toggle Sidebar</span>
                    </button>
                    <div className="h-4 w-px bg-gray-300 mx-2"></div>
                    <h1 className="text-lg font-semibold capitalize">
                        {selectedPage === "inicio"
                            ? "Página de Inicio"
                            : selectedPage === "nosotros"
                                ? "Nosotros"
                                : selectedPage === "programas"
                                    ? "Programas"
                                    : selectedPage === "cursos"
                                        ? "Cursos"
                                        : selectedPage === "novedades"
                                            ? "Novedades"
                                            : selectedPage === "contacto"
                                                ? "Contacto"
                                                : selectedPage}
                    </h1>
                </header>
                <main className="flex-1 overflow-auto p-4">
                    <ImageManager page={selectedPage} />
                </main>
            </div>
        </div>
    )
}
