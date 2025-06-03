import { storage, db } from "@/firebase/clientApp"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, orderBy, updateDoc } from "firebase/firestore"

export interface ContentData {
    id?: string
    type: "image" | "text"
    page: string
    category: string
    uploadDate: Date
    // Solo para imágenes:
    name?: string
    url?: string
    size?: number
    fileType?: string
    storagePath?: string
    // Solo para texto:
    text?: string
}

// Subir imagen a Firebase Storage
export async function uploadImageToStorage(
    file: File,
    page: string,
    category: string,
): Promise<{ url: string; storagePath: string }> {
    try {
        // Crear ruta organizada: images/page/category/filename
        const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
        const storagePath = `images/${page}/${category}/${fileName}`
        const storageRef = ref(storage, storagePath)

        // Subir archivo
        const snapshot = await uploadBytes(storageRef, file)

        // Obtener URL con metadatos para evitar problemas de caché
        const url = await getDownloadURL(snapshot.ref)

        return { url, storagePath }
    } catch (error) {
        console.error("Error uploading image:", error)
        throw new Error("Error al subir la imagen")
    }
}

// Guardar contenido en Firestore
export async function saveContentToFirestore(contentData: Omit<ContentData, "id">): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, "contents"), {
            ...contentData,
            uploadDate: contentData.uploadDate,
        })
        return docRef.id
    } catch (error) {
        console.error("Error saving content:", error)
        throw new Error("Error al guardar el contenido")
    }
}

// Obtener contenido por página y categoría
export async function getContentFromFirestore(page: string, category?: string): Promise<ContentData[]> {
    try {
        let q = query(collection(db, "contents"), where("page", "==", page), orderBy("uploadDate", "desc"))

        if (category && category !== "all") {
            q = query(
                collection(db, "contents"),
                where("page", "==", page),
                where("category", "==", category),
                orderBy("uploadDate", "desc"),
            )
        }

        const querySnapshot = await getDocs(q)
        const contents: ContentData[] = []

        querySnapshot.forEach((doc) => {
            const data = doc.data()
            contents.push({
                id: doc.id,
                ...data,
                uploadDate: data.uploadDate.toDate(),
            } as ContentData)
        })

        return contents
    } catch (error) {
        console.error("Error getting content:", error)
        throw new Error("Error al obtener el contenido")
    }
}

// Eliminar contenido
export async function deleteContentFromFirestore(contentId: string, storagePath?: string): Promise<void> {
    try {
        // Eliminar de Firestore
        await deleteDoc(doc(db, "contents", contentId))

        // Si es una imagen, eliminar también de Storage
        if (storagePath) {
            const storageRef = ref(storage, storagePath)
            await deleteObject(storageRef)
        }
    } catch (error) {
        console.error("Error deleting content:", error)
        throw new Error("Error al eliminar el contenido")
    }
}

// Actualizar contenido
export async function updateContentInFirestore(contentId: string, updates: Partial<ContentData>): Promise<void> {
    try {
        const contentRef = doc(db, "contents", contentId)
        await updateDoc(contentRef, updates)
    } catch (error) {
        console.error("Error updating content:", error)
        throw new Error("Error al actualizar el contenido")
    }
}
