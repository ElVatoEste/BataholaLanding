export interface CircleItem {
    id: string;
    /** Texto que va dentro del círculo */
    label: string;
    /** Clase Tailwind para el fondo (por ejemplo "bg-green-500") */
    bgColorClass?: string;
    /** Clase Tailwind para el borde (por ejemplo "border-green-500") */
    borderColorClass?: string;
    /** Texto o etiqueta del footer bajo el círculo */
    description?: string;
    /** Si description es un botón o texto plano */
    footerType?: "text" | "button";
}