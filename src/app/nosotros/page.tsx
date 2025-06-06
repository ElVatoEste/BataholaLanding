import React from "react";
import TextCloudBanner from "@/components/TextCloudBanner";
import NuestraHistoria from "@/components/nosotros/NuestraHistoria";
import ImageGallery from "@/components/ImageGallery";

export default function Home() {

    return (
        <main className="relative">
            <TextCloudBanner
                bannerHeightClasses="h-[80vh] md:h-[80vh] lg:h-[100vh]"
                columns={[
                    {
                        type: "text",
                        title: "¿QUIÉNES SOMOS?",
                        description: "Lorem ipsum dolor sit amet. Et odio nostrum sed provident harum qui enim suscipit ea autem voluptatem et reiciendis illo in libero voluptatum. ",
                        secondDescription: "Et esse quia qui corrupti perferendis ut eaque repudiandae qui omnis aliquid! Et cupiditate modi cum debitis odio et animi dignissimos et reiciendis omnis ut reprehenderit voluptates non omnis quas?"
                    },
                    {
                        type: "image",
                        src: "/assets/CCBN_Hero.webp",
                        alt: "Equipo del centro cultural"
                    }
                ]}
            />

            <NuestraHistoria/>

            <ImageGallery/>

        </main>
    )
}
