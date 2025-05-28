import {BannerColumn} from "@/interfaces/BannerColumn";

export interface CloudBannerProps {
    /** Altura de la sección */
    bannerHeightClasses?: string
    /** Desplazamiento en Y de las nubes */
    cloudY?: number
    /** Posición bottom de las nubes */
    cloudBottomClasses?: string
    /** Configuración de columnas dentro del banner */
    columns?: BannerColumn[]
}