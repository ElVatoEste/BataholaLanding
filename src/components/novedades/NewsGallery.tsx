import React from "react";
import { NewsGalleryProps } from "@/interfaces/Novedades/NewsGalleryProps";

export const NewsGallery: React.FC<NewsGalleryProps> = ({
  images = [],
  className = "",
}) => {
  return (
    <section
      className={`
        w-full bg-white 
        py-12 px-4 md:px-8 lg:px-16
        ${className}
      `}
    >
      {/* EQUIPO DE DISENO ESPECIFICO QUE SERIAN 6 IMAGENES ESTATICAS */}
      {/*cambiar el send button a un component realmente reutilizable, pero ahi luego luego */}
      {/*title */}
      <h2 className="text-3xl font-bold text-center text-[#1D2270] mb-8">
        
      </h2>

      {/*initial grid*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {images.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            {/* news card*/}
            <div className="bg-[#1D2270] rounded-lg overflow-hidden w-full max-w-xs">
                {/*image container*/}
              <div className="w-full h-48 bg-gray-100 overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/*inside blue rectangle */}
              <div className="px-4 py-6 flex flex-col items-center text-center">
                <h3 className="text-white text-lg font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            {/* “Ver más” BUTTON*/}
            {item.url && (
              <div className="mt-4">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-block 
                    bg-[#FFD500] text-black font-bold 
                    px-5 py-2 rounded-md 
                    hover:bg-yellow-600 transition
                  "
                >
                  Leer más
                </a>
              </div>
            )}
          </div>
        ))}

        {/* If no mews, show placeholder message centered across all columns */}
        {images.length === 0 && (
          <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center text-gray-500">
            No hay novedades por el momento.
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsGallery;
