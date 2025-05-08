
import { getAuthStatus } from "@/lib/authMiddleware.js";
import Order from "@/models/order.model";
import Product from "@/models/product.model.js";
import Review from "@/models/review.model.js";
import User from "@/models/user.model.js";
import { ObjectId } from "mongoose";
export const getMe = async () => {
  try {
    const { isAuthenticated, user: userdata } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const user = await User.findById(userdata?._id).select("-password");
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }
    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};

//Destrucres req.body and get items and update
export const updateUserAdress = async (address: string) => {
  try {
    const { isAuthenticated, user } = await getAuthStatus();

    if (!isAuthenticated) throw new Error("User not authenticated");
    const userdata = await User.findById(user?._id);
    if (!userdata) throw new Error("User not found");

    userdata?.address.push(address);
    await userdata.save();
    return userdata;
  } catch (error) {
    console.log(error);
    return { success: false, error: "Internal Server Error" };
  }
};

export const addToCart = async (data: any) => {
  try {
    const { item, color, sellPrice, size, quantity } = await data;

    const { isAuthenticated, user } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const product = await Product.findById(item);
    if (!product) {
      return {
        success: false,
        error: "Product not found",
      };
    }

    const userdata = await User.findById(user?._id);
    if (!userdata) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const cartItem = userdata?.cart.some(
      (cart: any) => cart.item.toString() === item
    );
    if (cartItem) {
      userdata.cart = userdata.cart.filter(
        (cart: any) => cart.item.toString() !== item
      );
      await userdata.save();
      return {
        success: true,
        message: "Product removed from cart",
      };
    } else {
      const cart = {
        item,
        color,
        size,
        sellPrice,
        quantity,
      };
      userdata.cart.push(cart);
      await userdata.save();
      return {
        success: true,
        message: "Product added to cart",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};

export const getCart = async () => {
  try {
    const { isAuthenticated, user } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const userdata = await User.findById(user?._id).populate({
      path: "cart.item",
      model: "Product",
    });
    if (!userdata) {
      return {
        success: false,
        error: "User not found",
      };
    }

    return {
      success: true,
      data: userdata.cart,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};

export const updateCart = async (data: any) => {
  try {
    const { productID, update } = await data;
    const { isAuthenticated, user: userdata } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    const user = await User.findById(userdata?._id);
    if(!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const cartItem = user.cart.find(
      (cart: any) => cart.item.toString() === productID
    );
    if (!cartItem) {
      return {
        success: false,
        error: "Product not found in cart",
      };
    }
    Object.assign(cartItem, update);
    await user.save();

    return {
      success: true,
      data: user.cart,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};

export const addToWishlist = async (productId: string) => {
  try {
    const { isAuthenticated, user: userdata } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const user = await User.findById(userdata?._id);
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }
    const product = await Product.findById(productId);
    if (!product) {
      return {
        success: false,
        error: "Product not found",
      };
    }

    if (user.wishlist.includes(product._id as any)) {
      user.wishlist = user.wishlist?.filter(
        (id) => id.toString() !== (product._id as any).toString()
      );
      await user.save();
      return {
        success: true,
        message: "Product removed from wishlist",
      };
    } else {
      user.wishlist.push(product._id as any);
      await user?.save();
    }

    return {
      success: true,
      message: "Product added to wishlist",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};

export const getWishlist = async () => {
  try {
    const { isAuthenticated, user: userdata } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const user = await User.findById(userdata?._id).populate("wishlist");
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }
    const Wishlist = user.wishlist.reverse();
    return {
      success: true,
      data: Wishlist,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};

export const addReview = async (data: any) => {
  try {
    const { product, ratting, review, images } = await data;
    if (!product || !ratting || !review) {
      return {
        success: false,
        error: "All fields are required",
      };
    }
    const { isAuthenticated, user: userdata } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const customer = await User.findById(userdata?._id);
    if (!customer) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const productItem = await Product.findById(product);
    if (!productItem) {
      return {
        success: false,
        error: "Product not found",
      };
    }
    const reviewItem = new Review({
      customer: customer._id,
      product: productItem._id,
      ratting,
      review,
      images,
    });

    productItem.reviews.push(reviewItem._id as any);
    await productItem.save();

    customer.reviews.push(reviewItem._id as any);
    await customer.save();
    await reviewItem.save();

    return {
      success: true,
      message: "Review added successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};
export const getUserReviews = async () => {
  try {
    const { isAuthenticated, user: userdata } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    const user = await User.findById(userdata?._id)
      .select("reviews")
      .populate({
        path: "reviews",
        populate: {
          path: "product",
          model: "Product",
          select: "name image _id store brand ",
          populate: { path: "store", model: "Store", select: "name logo _id" },
        },
      });
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }
    const Reviews = user.reviews.reverse();
    return {
      success: true,
      data: Reviews,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};

export const deleteReview = async (reviewId : string) => {
  try {
    const { isAuthenticated, user: userdata } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const user = await User.findById(userdata?._id);
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }
    const review = await Review.findById(reviewId);
    if (!review) {
      return {
        success: false,
        error: "Review not found",
      };
    }
    

    const productItem = await Product.findById(review.product);
    if (!productItem) {
      return {
        success: false,
        error: "Product not found",
      };
    }
    productItem.reviews = productItem?.reviews.filter((id : any) => id.toString() !== reviewId);
    await productItem.save();

    const customer = await User.findById(review.customer);
    if (!customer) {
      return {
        success: false,
        error: "Customer not found",
      };
    }
    customer.reviews = customer?.reviews.filter((id : any) => id.toString() !== reviewId);
    await customer.save();

    await Review.findByIdAndDelete(reviewId);
    return {
      success: true,
      message: "Review deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};

export const updateReview = async (reviewId : string, data: { ratting: string; reviewText: string }) => {
  try {
    const { isAuthenticated, user: userdata } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const user = await User.findById(userdata?._id);
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }
    const review = await Review.findById(reviewId);
    if (!review) {
      return {
        success: false,
        error: "Review not found",
      }
    }
    const { ratting, reviewText } = await data;
    if (!ratting || !reviewText) {
      return {
        success: false,
        error: "Please fill all the fields",
      };
    }
    review.ratting = ratting;
    review.review = reviewText;
    await review.save();

    return {
      success: true,
      message: "Review updated successfully",
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};

export const createOrders = async (data: any) => {
  try {
    const { products, shippingAddress, COD, amount, delivaryCharge } = await data;
    if (!products || !shippingAddress || !COD || !amount || !delivaryCharge) {
      return {
        success: false,
        error: "Please fill all the fields",
      };
    }


    const { isAuthenticated, user: userdata } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const customer = await User.findById(userdata?._id);
    if (!customer) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const productsIDs = products.map((product: any) => product.item);
    const productsData = await Product.find({ _id: { $in: productsIDs } });
    if (productsData.length !== productsIDs.length) {
      return {
        success: false,
        error: "Product not found",
      }
    }

    const date = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    const delivaryDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    const newOrder = new Order({
      products,
      shippingAddress,
      COD,
      amount,
      delivaryCharge,
      customer: customer._id,
      delivaryDate,
    });

    customer.orders.push(newOrder._id as any);
    await customer.save();

    for (const item of products) {
      const quantity = item.quantity || 1;
      const product = await Product.findById(item.item);
      if (product) {
        await Product.findOneAndUpdate(
          { _id: product._id },
          {
            $push: {
              orders: { order: newOrder._id, quantity: quantity },
            },
          }
        );
      }
    }
    await newOrder.save();
    
    return {
      success: true,
      message: "Order created successfully",
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};

export const getUserOrders = async () => {
  try {
    const { isAuthenticated, user: userdata } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

   
    const user = await User.findById(userdata?._id)
      .select("orders _id")
      .populate({
        path: "orders",
        populate: [
          { path: "products.item", model: "Product", select: "name image _id" },
          {
            path: "customer",
            model: "User",
            select: "name number altNumber email _id",
          },
        ],
      });
      if (!user) {
        return {
          success: false,
          error: "User not found",
        };
      }
    const Orders = user.orders.reverse();
    return {
      success: true,
      data: Orders,
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error",
    }
  }
};
