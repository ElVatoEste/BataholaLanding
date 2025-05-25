import React from "react";
import {CircleProps} from "@/interfaces/CircleProps";


export const Circle: React.FC<CircleProps> = ({
                                                  label,
                                                  sizeClass = "md:w-60 md:h-60 w-50 h-50",
                                                  bgClass = "bg-verde",
                                                  outerBorderClass = "border-verde",
                                                  innerBorderClass = "border-blanco",
                                              }) => {
    return (
        <div
            className={`
        flex items-center justify-center
        rounded-full
        ${sizeClass}
        border-4 ${outerBorderClass}
      `}
        >
            <div
                className={`
          flex items-center justify-center
          rounded-full
          w-full h-full
          border-4 ${innerBorderClass}
          ${bgClass}
        `}
            >
        <span className="text-center text-white font-semibold px-2">
          {label}
        </span>
            </div>
        </div>
    );
};
