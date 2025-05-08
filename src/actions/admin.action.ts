import { getAuthStatus } from "@/lib/authMiddleware";
import Order from "@/models/order.model";
import Product from "@/models/product.model";
import Store from "@/models/store.model";
import User from "@/models/user.model";
import { v2 as cloudinary } from "cloudinary";

export const createProduct = async (productData:any) => {
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

    const product = productData;
    if (!product) {
      return { success: false, error: "Please Provide Product Details" };
    }

    const store = await Store.findById(product?.shopID.toString());
    if (!store) {
      return { success: false, error: "Store not found" };
    }

    if (user.role !== "admin") {
      return { success: false, error: "Access Denied" };
    }

   const uploadImage = async (product : any) => {
      if (product?.image && product.image.length > 0) {
        const uploadImage = await Promise.all(
          product.image.map(async (image : any) => {
            const upload = await cloudinary.uploader.upload(image);
            return upload.secure_url;
          })
        );
        product.image = uploadImage;
      }
    }
    const avgRatting = Math.floor(Math.random() * 5) + 1;

    await uploadImage(product);
    const newProduct = new Product({
      name: product.name,
      description: product.description,
      price: product.price || [],
      image: product.image || [],
      colors: product.colors || [],
      size: product.size || [],
      category: product.category,
      subCategory: product.subCategory,
      brand: product.brand,
      material: product.material,
      GWS: product.GWS,
      avgRatting,
      stock: product.stock,
      store: product.shopID,
      uploader: user._id,
    });

    if (newProduct) {
      await newProduct.save();
      await Store.findByIdAndUpdate(product?.shopID, {
        $push: { products: newProduct._id },
      });
    }

    return { success: true, message: "Product created successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Internal Server Error" };
  }
};

export const updateOrderStatus = async (orderId: string, status: "pending" | "dispatched" | "shipped" | "delivered" | "cancelled") => {
  try {
    if (!status || !orderId) {
      return {
        success: false,
        error: "Please provide order Id and status",
      };
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return {
        success: false,
        error: "Order not found",
      };
    }
    const alreadyCancelled = order.status === "cancelled";
    if (alreadyCancelled) {
      return {
        success: false,
        error: "Order already cancelled",
      }
    }
    order.status = status;
    await order.save();

    return {
      success: true,
      message: "Order status updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};

export const getAdminOrders = async (orderId: string) => {
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
    if(user.role !== "admin" && !user.store){
      return {
        success: false,
        error: "Access Denied",
      };
    }

    const store = await Store.findById(user.store)
      .select("orders completedOrders cancelledOrders pendingOrders _id")
      .populate([
        {
          path: "orders",
          populate: [
            { path: "customer", select: "name number altNumber email _id" },
            {
              path: "products",
              populate: { path: "item", select: "name image _id" },
            },
          ],
        },
      ]);
    if (!store) {
      return {
        success: false,
        error: "Store not found",
      };
    }

    const filterOrder = (order : any) =>{
      return order.map((order:any) => ({
        ...order._doc,
        products: order.products.filter(
          (product:any) => product.shopID.toString() === (store._id as any).toString()
        ),
      }));
    }

    const Orders = filterOrder(store.orders);
    return {
      success: true,
      data: Orders,
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};

export const getAdminStore = async () => {
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
    if(user.role !== "admin" && !user.store){
      return {
        success: false,
        error: "Access Denied",
      };
    }

    const store = await Store.findById(user.store)
      .select("orders completedOrders cancelledOrders pendingOrders _id")
      .populate([
        {
          path: "orders",
          populate: [
            { path: "customer", select: "name number altNumber email _id" },
            {
              path: "products",
              populate: { path: "item", select: "name image _id" },
            },
          ],
        },
      ])
      .lean();
    if (!store) {
      return {
        success: false,
        error: "Store not found",
      };
    }
    return {
      success: true,
      data: store,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};

export const getProductById = async (productId: string) => {
  try {
   if(!productId){
    return {
      success: false,
      error: "Product not found",
    };
   }
    const id = productId;
    const product = await Product.findById(id).populate([
      "store",
      "orders",
      "reviews",
      "wishlisted",
      "addtocart",
    ]);
    if (!product) {
      return {
        success: false,
        error: "Product not found",
      }
    }
    return {
      success: true,
      data: product,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};

export const getProductReviews = async (productID: string) => {
  try {
    const id = productID;
    const product = await Product.findById(id)
      .select("reviews")
      .populate({
        path: "reviews",
        populate: {
          path: "customer",
          model: "User",
          select: "name profileImg _id",
        },
      });
    if (!product) {
      return {
        success: false,
        error: "Product not found",
      }
    }
    const reviews = product.reviews.reverse();
    return {
      success: true,
      data: reviews,
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};



export const adminDashboardInfo = async () => {
  
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
    if(user.role !== "admin" && !user.store){
      return {
        success: false,
        error: "Access Denied",
      };
    }
    const shopId = user.store;
    const STORE = await Store.findById(shopId).populate([
      { path: "orders" },
      { path: "products" },
    ]);

    if (!STORE) {
      return {
        success: false,
        error: "Store not found",
      }
    }
    const PRODUCTS = STORE.products.length;
    const TOTAL_SOLD = STORE.products.reduce(
      (acc, product: any) => acc + product.sold,
      0
    );

    const TOTAL_ORDERS = STORE.orders.length;
    const TOTAL_REVIEWS = STORE.reviews.length;

    const TOTAL_COMPLETEDORDERS = STORE.orders.filter(
      (order:any) => order.status === "delivered"
    ).length;
    const delivered = STORE.orders.filter(
      (order:any) => order.status === "delivered"
    );
    const TOTAL_SELL = delivered.reduce(
      (acc, order:any) => acc + (order.amount - order.delivaryCharge),
      0
    );
    const TOTAL_CANCELLEDORDERS = STORE.orders.filter(
      (order:any) => order.status === "cancelled"
    ).length;
    const TOTAL_PENDINGORDERS = STORE.orders.filter(
      (order:any) =>
        order.status === "pending" ||
        order.status === "shipped" ||
        order.status === "dispatched"
    ).length;
    const DASHBOARD = {
      PRODUCTS,
      TOTAL_SOLD,
      TOTAL_SELL,
      TOTAL_ORDERS,
      TOTAL_COMPLETEDORDERS,
      TOTAL_CANCELLEDORDERS,
      TOTAL_PENDINGORDERS,
      TOTAL_REVIEWS,
    };

    return {
      success: true,
      data: DASHBOARD,
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};
