export interface BannerColumn {
    /** "text" mostrará un título + párrafo, "image" mostrará un <img> con src */
    type: "text" | "image"
    /** Para type="text": título del bloque */
    title?: string
    /** Para type="text": párrafo descriptivo */
    description?: string
    /** Para type="image": URL de la imagen */
    src?: string
    /** Alt text para la imagen */
    alt?: string
}