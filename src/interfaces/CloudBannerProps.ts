export interface CloudBannerProps {
    /** Clases Tailwind para la altura del banner (ej. "h-[70vh] md:h-[80vh]") */
    bannerHeightClasses?: string
    /** Pixel final de movimiento en Y para las nubes (ej. 80) */
    cloudY?: number
    /** Clases Tailwind para posicionamiento de las nubes (ej. "bottom-5 md:bottom-20") */
    cloudBottomClasses?: string
    /** Texto del banner */
    bannerText: string;
}