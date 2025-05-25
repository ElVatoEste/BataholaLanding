export interface CircleProps {
    /** Texto que aparece dentro del círculo */
    label: string;
    /** Clases Tailwind para el tamaño (por defecto w-40 h-40) */
    sizeClass?: string;
    /** Clase Tailwind para el color de fondo del relleno */
    bgClass?: string;
    /** Clase Tailwind para el color del borde exterior */
    outerBorderClass?: string;
    /** Clase Tailwind para el color del borde interior */
    innerBorderClass?: string;
}
