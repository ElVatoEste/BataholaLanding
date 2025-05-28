"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, signOut, User } from "firebase/auth"
import { auth } from "@/firebase/clientApp"

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null)
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
    }, [])

    if (!user) return <div>Loading...</div>

    return (
        <div className="p-4">
            <h1>Welcome, {user.displayName || user.email}</h1>
            <button
                onClick={async () => {
                    await signOut(auth)
                    router.push("/login")
                }}
                className="bg-red-500 text-white px-4 py-2 mt-4"
            >
                Logout
            </button>
        </div>
    )
}
