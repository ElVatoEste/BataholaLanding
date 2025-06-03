"use client"

import { useState, useEffect, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import {
    uploadImageToStorage,
    saveContentToFirestore,
    getContentFromFirestore,
    deleteContentFromFirestore,
    type ContentData,
} from "@/lib/firebase-storage"

interface ImageManagerProps {
    page: string
}

export function ImageManager({ page }: ImageManagerProps) {
    const [contents, setContents] = useState<ContentData[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
    const [uploadCategory, setUploadCategory] = useState<string>("")
    const [newText, setNewText] = useState<string>("")
    const [isTextDialogOpen, setIsTextDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})

    // Definimos categorías disponibles para cada página
    const categoriesByPage: Record<string, { id: string; name: string; allowsText: boolean }[]> = {
        inicio: [
            { id: "banner", name: "Banner Principal", allowsText: true },
            { id: "carrusel", name: "Carrusel", allowsText: false },
        ],
        nosotros: [
            { id: "banner", name: "Banner Nosotros", allowsText: true },
            { id: "galeria", name: "Galeria de fotos", allowsText: false },
        ],
        programas: [
            { id: "banner", name: "Banner Programas", allowsText: true },
            { id: "educacion", name: "Programa Educación", allowsText: true },
        ],
        cursos: [
            { id: "banner", name: "Banner Cursos", allowsText: true },
            { id: "listado", name: "Listado de Cursos", allowsText: false },
        ],
        novedades: [
            { id: "banner", name: "Banner Noticias", allowsText: true },
            { id: "noticias", name: "Noticias", allowsText: true },
        ],
    }

    const defaultCategories = [{ id: "general", name: "General", allowsText: true }]
    const categories = categoriesByPage[page] || defaultCategories

    // Cargar contenido al cambiar página o categoría
    useEffect(() => {
        if (categories.length > 0) {
            setSelectedCategory(categories[0].id)
            setUploadCategory(categories[0].id)
        }
        loadContent()
    }, [page])

    useEffect(() => {
        loadContent()
    }, [selectedCategory])

    const loadContent = async () => {
        setIsLoading(true)
        try {
            const content = await getContentFromFirestore(page, selectedCategory)
            setContents(content)
        } catch (error) {
            console.error("Error loading content:", error)
        } finally {
            setIsLoading(false)
        }
    }

    // Manejo de subida de imágenes
    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            setIsUploadDialogOpen(false)

            for (const file of acceptedFiles) {
                const fileId = Math.random().toString(36).substr(2, 9)
                setUploadProgress((prev) => ({ ...prev, [fileId]: 0 }))

                try {
                    // Subir imagen a Storage
                    setUploadProgress((prev) => ({ ...prev, [fileId]: 30 }))
                    const { url, storagePath } = await uploadImageToStorage(file, page, uploadCategory)

                    // Guardar metadatos en Firestore
                    setUploadProgress((prev) => ({ ...prev, [fileId]: 70 }))
                    const contentData: Omit<ContentData, "id"> = {
                        type: "image",
                        page,
                        category: uploadCategory,
                        uploadDate: new Date(),
                        name: file.name,
                        url,
                        size: file.size,
                        fileType: file.type,
                        storagePath,
                    }

                    const contentId = await saveContentToFirestore(contentData)

                    // Actualizar estado local
                    setUploadProgress((prev) => ({ ...prev, [fileId]: 100 }))
                    setContents((prev) => [{ ...contentData, id: contentId }, ...prev])

                    // Limpiar progreso después de un momento
                    setTimeout(() => {
                        setUploadProgress((prev) => {
                            const newProgress = { ...prev }
                            delete newProgress[fileId]
                            return newProgress
                        })
                    }, 2000)
                } catch (error) {
                    console.error("Error uploading file:", error)
                    alert(`Error al subir ${file.name}`)
                    setUploadProgress((prev) => {
                        const newProgress = { ...prev }
                        delete newProgress[fileId]
                        return newProgress
                    })
                }
            }
        },
        [page, uploadCategory],
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp", ".svg"],
        },
        multiple: true,
    })

    // Filtrar por categoría
    const filteredContents = contents.filter((item) => {
        if (selectedCategory === "" || selectedCategory === "all") return true
        return item.category === selectedCategory
    })

    const deleteContent = async (content: ContentData) => {
        if (!content.id) return

        const confirmDelete = window.confirm(
            `¿Estás seguro de que quieres eliminar este ${content.type === "image" ? "imagen" : "texto"}?`,
        )

        if (!confirmDelete) return

        try {
            await deleteContentFromFirestore(content.id, content.storagePath)
            setContents((prev) => prev.filter((item) => item.id !== content.id))
        } catch (error) {
            console.error("Error deleting content:", error)
            alert("Error al eliminar el contenido")
        }
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    // Agregar nuevo texto
    const addText = async () => {
        if (newText.trim() === "") return

        try {
            const contentData: Omit<ContentData, "id"> = {
                type: "text",
                page,
                category: uploadCategory,
                uploadDate: new Date(),
                text: newText.trim(),
            }

            const contentId = await saveContentToFirestore(contentData)
            setContents((prev) => [{ ...contentData, id: contentId }, ...prev])
            setNewText("")
            setIsTextDialogOpen(false)
        } catch (error) {
            console.error("Error saving text:", error)
            alert("Error al guardar el texto")
        }
    }

    // Determinar si la categoría seleccionada permite texto
    const allowsText = categories.find((c) => c.id === selectedCategory)?.allowsText || false

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Gestión de Contenidos</h2>
                    <p className="text-gray-500">
                        Administra imágenes y texto para la página:
                        <span className="ml-1 inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
              {page}
            </span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Ruta de almacenamiento: /images/{page}/{selectedCategory}/
                    </p>
                </div>
                <div className="flex gap-2">
                    {allowsText && (
                        <button
                            onClick={() => setIsTextDialogOpen(true)}
                            className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 mr-1"
                            >
                                <path d="M12 5v14M5 12h14"></path>
                            </svg>
                            Agregar Texto
                        </button>
                    )}
                    <button
                        onClick={() => setIsUploadDialogOpen(true)}
                        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
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
                            className="h-4 w-4 mr-2"
                        >
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                        </svg>
                        Subir Imágenes
                    </button>
                </div>
            </div>

            {/* Progress indicators */}
            {Object.keys(uploadProgress).length > 0 && (
                <div className="space-y-2">
                    {Object.entries(uploadProgress).map(([fileId, progress]) => (
                        <div key={fileId} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="flex items-center justify-between text-sm text-blue-700 mb-1">
                                <span>Subiendo imagen...</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full bg-blue-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Category Tabs */}
            <div className="border-b">
                <div className="flex overflow-x-auto">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => {
                                setSelectedCategory(category.id)
                                setUploadCategory(category.id)
                            }}
                            className={`whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium ${
                                selectedCategory === category.id
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                            }`}
                        >
                            {category.name}
                            {category.allowsText && <span className="ml-1 text-xs text-green-600">📝</span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Loading state */}
            {isLoading && (
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Cargando contenido...</span>
                </div>
            )}

            {/* Listado de Contenidos */}
            {!isLoading && (
                <div className="mt-6">
                    {filteredContents.length === 0 ? (
                        <div className="rounded-lg border border-dashed p-8 text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
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
                                    className="h-6 w-6 text-gray-400"
                                >
                                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <path d="m21 15-5-5L5 21"></path>
                                </svg>
                            </div>
                            <h3 className="mt-2 text-sm font-semibold text-gray-900">No hay contenido</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {selectedCategory === "" || selectedCategory === "all"
                                    ? "Aún no has agregado contenido para esta página."
                                    : `No hay elementos en la categoría "${categories.find((c) => c.id === selectedCategory)?.name}".`}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredContents.map((item) =>
                                    item.type === "image" ? (
                                        <div key={item.id} className="group relative overflow-hidden rounded-lg border bg-white">
                                            <div className="aspect-square relative">
                                                <img
                                                    src={item.url || "/placeholder.svg"}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => window.open(item.url, "_blank")}
                                                        className="rounded-md bg-white/90 p-1.5 text-gray-700 hover:text-gray-900"
                                                    >
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
                                                            className="h-4 w-4"
                                                        >
                                                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                                            <circle cx="12" cy="12" r="3"></circle>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(item.url || "")
                                                            alert("URL copiada al portapapeles")
                                                        }}
                                                        className="rounded-md bg-white/90 p-1.5 text-gray-700 hover:text-gray-900"
                                                    >
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
                                                            className="h-4 w-4"
                                                        >
                                                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                                                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => deleteContent(item)}
                                                        className="rounded-md bg-red-500/90 p-1.5 text-white hover:bg-red-600/90"
                                                    >
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
                                                            className="h-4 w-4"
                                                        >
                                                            <path d="M3 6h18"></path>
                                                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="p-3">
                                                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                                                <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                                                    <span>{formatFileSize(item.size || 0)}</span>
                                                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                          {categories.find((c) => c.id === item.category)?.name}
                        </span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">{item.uploadDate.toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={item.id} className="relative rounded-lg border bg-yellow-50 p-4 break-words">
                                            <div className="flex justify-between items-start">
                                                <p className="text-sm text-gray-800 pr-2">{item.text}</p>
                                                <button
                                                    onClick={() => deleteContent(item)}
                                                    className="text-red-500 hover:text-red-700 flex-shrink-0"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="h-4 w-4"
                                                    >
                                                        <path d="M3 6h18"></path>
                                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                        Texto
                      </span>
                                                <span>{item.uploadDate.toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    ),
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Diálogo de Subir Imágenes */}
            {isUploadDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-5">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Subir Imágenes</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Las imágenes se guardarán en:{" "}
                                <code className="bg-gray-100 px-1 rounded">
                                    /images/{page}/{uploadCategory}/
                                </code>
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                    Categoría
                                </label>
                                <select
                                    id="category"
                                    value={uploadCategory}
                                    onChange={(e) => setUploadCategory(e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                >
                                    {categories.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div
                                {...getRootProps()}
                                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                                    isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                                }`}
                            >
                                <input {...getInputProps()} />
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
                                    className="mx-auto h-12 w-12 text-gray-400"
                                >
                                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                                    <path d="M12 12v9"></path>
                                    <path d="m16 16-4-4-4 4"></path>
                                </svg>
                                {isDragActive ? (
                                    <p className="mt-2 text-sm text-blue-600">Suelta las imágenes aquí...</p>
                                ) : (
                                    <div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Arrastra y suelta imágenes aquí, o haz clic para seleccionar
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500">Formatos soportados: JPG, PNG, GIF, WebP, SVG</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsUploadDialogOpen(false)}
                                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Diálogo de Agregar Texto */}
            {isTextDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-5">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Agregar Texto</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Ingresa el texto para la categoría:{" "}
                                <strong>{categories.find((c) => c.id === uploadCategory)?.name}</strong>
                            </p>
                        </div>
                        <div className="space-y-4">
              <textarea
                  rows={4}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  placeholder="Escribe el texto aquí..."
              />
                        </div>
                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsTextDialogOpen(false)}
                                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={addText}
                                disabled={!newText.trim()}
                                className="rounded-md bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Guardar Texto
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
