import {CircleItem} from "@/interfaces/CircleItem";

export interface CirclesSectionProps {
    /** Título principal */
    title: string;
    /** Párrafo bajo el título */
    subtitle?: string;
    /** Lista de círculos a mostrar */
    items: CircleItem[];
    /** Número de filas (líneas) */
    rows?: number;
    /** Muestra u oculta el footer (description) de cada círculo */
    showItemDescription?: boolean;
}