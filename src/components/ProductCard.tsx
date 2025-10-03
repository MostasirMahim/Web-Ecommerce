"use client";
import { Heart, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import Star from '@/components/Star';
import { IProduct } from "@/lib/type";
import { useEffect, useState } from "react";

interface ProductProps {
    product: IProduct;
    from?: string | null;
}
function ProductItem({ product, from = null } : ProductProps) {
  const navigate = useRouter();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // adjust breakpoint if needed
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

//   const addToCart = useAddCart();
//   const addToWishlist = useAddWishlist(product?._id);
//   const { data: authUser, isLoading } = useQuery({
//     queryKey: ["authUser"],
//   });
//   const isWishListed = authUser?.wishlist.includes(product?._id);
//   const isCarted = authUser?.cart?.some((cart) => cart.item === product?._id);
//   const isOwned = authUser?._id === product?.uploader;
//   const handleCartButton = async (e) => {
//     try {
//       e.preventDefault();
//       if (isOwned) {
//         toast.error("You can't buy your own product");
//         return;
//       }
//       if (isCarted) {
//         navigate(`/product/${product?._id}`);
//         return;
//       }
//       addToCart.mutate({
//         shopID: product?.store?._id,
//         size: product?.price[0]?.size,
//         sellPrice: product?.price[0]?.sellPrice,
//         color: product?.colors[0]?.name,
//         quantity: 1,
//         item: product?._id,
//       });
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
//   const handleWishlistButton = async (e) => {
//     try {
//       e.preventDefault();
//       if (isOwned) {
//         toast.error("You can't add your own product");
//         return;
//       }
//       addToWishlist.mutate();
//     } catch (error) {
//       toast.error(error.message);
//       console.log(error);
//     }
//   };

//   if (isLoading) return <Loading />;
   return (
    <div
      className={`h-[230px] sm:h-[355px] pb-1  ${
        from === "carousel" ? "w-[150px]" : "w-[150px]"
      }  md:w-[220px] hover:shadow-md hover:-translate-y-1 hover:duration-300 hover:shadow-sky-400 hover:border-sky-400 cursor-pointer m-2 relative border-[1px] border-gray-300 rounded-xl `}
    >
      <div onClick={() => navigate.push(`/products/${product?._id}`)} className="relative w-full h-[100px] sm:h-[200px] rounded-t-xl">
        <div className="absolute top-0 rounded-t-xl w-full h-[100px] md:h-[200px] flex justify-center items-center ">
          <img
            src={(product?.images?.[0] )|| "/placeholder.jpg"}
            onClick={() => navigate.push(`/product/${product?._id}`)}
            alt=""
            className="h-[100px] sm:h-[200px] w-full max-h-[200px] md:max-h-[200px]  object-contain rounded-t-xl absolute top-0 pb-1"
          />

          <div className="absolute flex flex-center top-0 -left-[1px] w-[40px] md:w-[55px] h-5 md:h-6 bg-[#4ccff3]  rounded-tl-xl border-l-[1px] rounded-br-2xl ">
            <p className="text-white font-lato text-xs text-center w-full my-auto">50%</p>
          </div>
          {
            <div className="absolute top-[3px] md:top-[6px] right-[5px] md:right-2">
              {true ? (
                <Heart
                  strokeWidth={2.5}
                  absoluteStrokeWidth
                  className="w-5 h-5 text-pink-500 "
                />
              ) : (
                <Heart
                  
                  strokeWidth={2.5}
                  absoluteStrokeWidth
                  className="w-5 h-5 text-[#4ccff3] hover:text-pink-500"
                />
              )}
            </div>
          }
        </div>
      </div>

     <section className="absolute bottom-2 w-full">
     <p className="hidden sm:block text-[#ADADAD] text-left w-full px-3 mt-1 text-xs font-quicksand font-semibold hover:text-sky-400">
        {product?.subCategory}
      </p>
      <div className="px-3 w-full py-[2px]  md:h-[90px] flex justify-start items-center overflow-hidden">
        <div className="flex flex-col justify-start ">
          <p
            onClick={() => navigate.push(`/products/${product?._id}`)}
            className="line-clamp-2 break-words max-h-[55px] md:max-h-[45px]  text-[12px] md:text-[14px] font-quicksand font-bold text-left w-full  hover:translate-x-1 hover:duration-300"
          >
            {product?.name || "..........."}
          </p>
          <div
            onClick={() => navigate.push(`/products/${product?._id}`)}
            className="hidden sm:flex gap-2 hover:translate-x-1 hover:duration-300"
          >
            <Star stars={product?.avgRatting || 4} size={"sm"} />
            <p className="text-[#ADADAD] text-sm font-quicksand font-semibold">
              ({product?.avgRatting})
            </p>
          </div>
          <p className=" hover:translate-x-1 hover:duration-300">
            <span className="text-[#ADADAD] text-xs sm:text-sm font-spartan font-semibold">
              Brand :
            </span>{" "}
            <span className="text-[#4ccff3]  text-xs sm:text-sm md:text-md font-quicksand font-bold">
              {product?.brand}
            </span>
          </p>
        </div>
      </div>
      <div className="px-3 mx-auto w-full flex flex-col md:flex-row justify-center md:justify-between items-center ">
        <div
          onClick={() => navigate.push(`/products/${product?._id}`)}
          className="flex justify-start items-center space-x-1 px-1 hover:scale-110 hover:duration-300"
        >
          <p className="text-sm py-1 sm:text-xl font-quicksand font-bold ">
            {product?.price[0]?.sellPrice.toLocaleString("en-IN")}
          </p>
          <p className="text-[#ADADAD] text-[10px] sm:text-sm line-through font-quicksand font-bold">
            {product?.price[0]?.mrp.toLocaleString("en-IN")}
          </p>
        </div>
        <div
          
          className={`h-7 sm:h-8 md:w-16 w-[90%] ${
            true ? "bg-[#4ccff3]" : "bg-[#d6d7d7] hover:bg-gray-400"
          } rounded-lg flex justify-center items-center gap-1 text-white cursor-pointer hover:translate-x-1 duration-300 hover:bg-sky-400`}
        >
          <ShoppingCart strokeWidth={3} className="w-4 h-4" />
          <p className=" text-sm font-quicksand font-bold ">
            {isMobile ? "View" : "Add"}
          </p>
        </div>
      </div>
     </section>
    </div>
  );
}

export default ProductItem;