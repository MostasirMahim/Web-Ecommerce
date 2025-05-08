"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductItem from "./ProductCard";
import { IProduct } from "@/lib/type";

interface Props {
  products: IProduct[];
}
export default function ProductCarousel({ products }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    function getWidthBasedOnBreakpoint() {
      if (window.innerWidth < 640) {
        return 160;
      } else if (window.innerWidth < 1024) {
        return 230;
      } else {
        return 230;
      }
    }

    const updateWidth = () => {
      setWidth(getWidthBasedOnBreakpoint());
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 1 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-fulloverflow-hidden">
      {/* Fixed promotional banner */}
      <div className="absolute  left-0 top-0 w-[125px] md:w-[250px]  h-full z-10">
        <div className="h-full bg-emerald-50 md:p-8 p-2 rounded-lg flex flex-col justify-around items-center">
          <h2 className="md:text-4xl text-xl font-Amaranth font-semibold text-gray-800 mb-1">
            Shop Outside the Box
          </h2>
          <p className="text-gray-800 md:mb-4 mb-1 text-xs font-spartan">
            Discover the Essence of Timeless Beauty.Crafted for the Modern
            Connoisseur.
          </p>
          <button className="bg-emerald-500 text-white px-2 md:px-6 py-2 text-sm md:text-lg w-[100px] md:w-[150px] rounded-lg hover:bg-emerald-600 transition-colors duration-300">
            Explore Now
          </button>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-[110px] sm:left-[120px] md:left-[230px] top-1/2 z-10 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
        aria-label="Previous item"
      >
        <ChevronLeft className="md:w-6 md:h-6 w-4 h-4" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2  bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
        aria-label="Next item"
      >
        <ChevronRight className="md:w-6 md:h-6 w-4 h-4" />
      </button>

      {/* Products carousel */}
      <div className="overflow-hidden pl-[125px] md:pl-[250px] ">
        <div
          className="flex  transition duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (width || 0)}px)`,
          }}
        >
          {products.map((product, index) => (
            <div key={index} className="flex-shrink-0 w-[160px] md:w-[230px] ">
              <ProductItem product={product} from={"carousel"} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
