"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"

export default function AuthForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const { login, register, loading } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        const errorMsg = isLogin
            ? await login(email, password)
            : await register(email, password)

        if (errorMsg) setError(errorMsg)
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-sm mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-center">
                {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
            </h1>

            {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm">
                    {error}
                </div>
            )}

            <input
                className="border border-gray-300 p-2 w-full rounded"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                className="border border-gray-300 p-2 w-full rounded"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button
                className={`w-full px-4 py-2 text-white rounded ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
                type="submit"
                disabled={loading}
            >
                {loading ? "Procesando..." : isLogin ? "Ingresar" : "Registrarse"}
            </button>

            <p className="text-center text-sm mt-4">
                {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
                <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-600 underline"
                >
                    {isLogin ? "Regístrate" : "Inicia sesión"}
                </button>
            </p>
        </form>
    )
}
