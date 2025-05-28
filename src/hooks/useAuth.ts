import { useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/clientApp"
import { FirebaseError } from "firebase/app"

export function useAuth() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const login = async (email: string, password: string): Promise<string | null> => {
        setLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            router.push("/dashboard")
            return null
        } catch (error: unknown) {
            return handleAuthError(error)
        } finally {
            setLoading(false)
        }
    }

    const register = async (email: string, password: string): Promise<string | null> => {
        setLoading(true)
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            router.push("/dashboard")
            return null
        } catch (error: unknown) {
            return handleAuthError(error)
        } finally {
            setLoading(false)
        }
    }

    const handleAuthError = (error: unknown): string => {
        if (error instanceof FirebaseError) {
            switch (error.code) {
                case "auth/user-not-found":
                    return "Usuario no encontrado"
                case "auth/wrong-password":
                    return "Contraseña incorrecta"
                case "auth/email-already-in-use":
                    return "El correo ya está en uso"
                case "auth/invalid-email":
                    return "Correo inválido"
                case "auth/weak-password":
                    return "Contraseña demasiado débil"
                default:
                    return error.message
            }
        } else {
            return "Ocurrió un error inesperado"
        }
    }

    return { login, register, loading }
}
