// src/pages/novedades/index.tsx

import React from "react";
import TextCloudBanner from "@/components/TextCloudBanner";
import NewsGallery from "@/components/novedades/NewsGallery";
import type { NewsImage } from "@/interfaces/Novedades/NewsGalleryCard";

export default function NovedadesPage() {
  // reutilice las mismas imagenes solo para el ejemplo
  const images: string[] = [
    "/img/img1.jpg",
    "/img/img2.jpg",
    "/img/img3.jpg",
  ];

  // Ejemplo de datos, luego obtener de la source necesaria.
  const sampleNews: NewsImage[] = [
    {
      src: images[0],
      alt: "Noticia sobre Igualdad",
      title: "Igualdad",
      description: "Lorem ipsum dolor sit amet. Et odio nostrum sed provident harum…",
      url: "/novedades/igualdad",
    },
    {
      src: images[1],
      alt: "Noticia sobre Cultura",
      title: "Arte y Cultura",
      description: "Breve descripción sobre actividades culturales en Batahola.",
      url: "/novedades/arte-y-cultura",
    },
    {
      src: images[2],
      alt: "Anuncio de Evento",
      title: "Próximo Evento",
      description: "Detalles sobre nuestro próximo evento comunitario.",
      url: "/novedades/proximo-evento",
    },
    {
      src: images[0],
      alt: "Noticia sobre Igualdad",
      title: "Igualdad",
      description: "Lorem ipsum dolor sit amet. Et odio nostrum sed provident harum…",
      url: "/novedades/igualdad",
    },
    {
      src: images[1],
      alt: "Noticia sobre Cultura",
      title: "Arte y Cultura",
      description: "Breve descripción sobre actividades culturales en Batahola.",
      url: "/novedades/arte-y-cultura",
    },
    {
      src: images[2],
      alt: "Anuncio de Evento",
      title: "Próximo Evento",
      description: "Detalles sobre nuestro próximo evento comunitario.",
      url: "/novedades/proximo-evento",
    }
  ];

  return (
    <main className="relative">
      <TextCloudBanner
        bannerHeightClasses="h-[80vh] md:h-[80vh] lg:h-[100vh]"
        columns={[
          {
            type: "text",
            title: "APÓYATE EN NOSOTROS",
            description:
              "Lorem ipsum dolor sit amet. Et odio nostrum sed provident harum qui enim suscipit ea autem voluptatem et reiciendis illo in libero voluptatum.",
            secondDescription:
              "Et esse quia qui corrupti perferendis ut eaque repudiandae qui omnis aliquid! Et cupiditate modi cum debitis odio et animi dignissimos et reiciendis omnis ut reprehenderit voluptates non omnis quas?",
          },
          {
            type: "image",
            src: "/assets/CCBN_Hero.webp",
            alt: "Equipo del centro cultural",
          },
        ]}
      />

      <NewsGallery
        images={sampleNews}

      />
    </main>
  );
}
