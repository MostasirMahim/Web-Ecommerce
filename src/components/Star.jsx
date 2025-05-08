"use client";
import { StarHalf, StarIcon } from "lucide-react";

function Star({ stars, size }) {
  const rattingStar = Array.from({ length: 5 }, (element, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <StarIcon
            className={`${
              size == "sm" ? "w-[16px] h-[16px]" : "w-[36px] h-[36px]"
            } text-[#FFBE00]`}
          />
        ) : stars >= number ? (
          <StarHalf
            className={`${
              size == "sm" ? "w-[15px] h-[15px]" : "w-[35px] h-[35px]"
            } text-[#FFBE00]`}
          />
        ) : (
          <StarIcon
            strokeWidth={0.5}
            className={`${
              size == "sm" ? "w-[19px] h-[19px]" : "w-[40px] h-[40px]"
            } text-[#FFBE00]`}
          />
        )}
      </span>
    );
  });
  return <div className=" flex items-center justify-center">{rattingStar}</div>;
}

export default Star;
