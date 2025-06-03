import React from "react";
import { CirclesSectionProps } from "@/interfaces/CirclesSectionProps";
import { Circle } from "@/components/general/Circle";

export const CirclesSection: React.FC<CirclesSectionProps> = ({
                                                                  title,
                                                                  subtitle,
                                                                  items,
                                                                  rows = 1,
                                                                  showItemDescription = false,
                                                              }) => {
    // columnas totales para MD+
    const columns = Math.ceil(items.length / rows);

    // clases responsive para grid-columns
    // en móvil 1 columna, en sm 2, en md+ las 'columns' calculadas
    const gridColsClass = `grid-cols-1 sm:grid-cols-3 md:grid-cols-${columns}`;

    return (
        <section className="bg-blanco text-center py-12 px-6 md:px-60">
            <h2 className="text-3xl font-bold text-center mb-4 text-negro">{title}</h2>
            {subtitle && (
                <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
                    {subtitle}
                </p>
            )}

            <div
                className={`
          grid
          ${gridColsClass}
          gap-4        /* gap pequeño en móvil */
          md:gap-8     /* gap mayor en pantallas MD+ */
        `}
            >
                {items.map((item) => (
                    <div key={item.id} className="flex flex-col items-center">
                        <Circle
                            label={item.label}
                            bgClass={item.bgColorClass ?? "bg-white"}
                            outerBorderClass={item.borderColorClass ?? "border-gray-300"}
                        />

                        {showItemDescription && item.description && (
                            <div className="mt-4">
                                {item.footerType === "button" ? (
                                    <button className="px-4 py-2 rounded-full bg-yellow-400 text-black">
                                        {item.description}
                                    </button>
                                ) : (
                                    <p className="text-center text-gray-600">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};
