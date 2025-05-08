// import User from "../models/user.model.js";
// import Product from "./../models/product.model.js";
// import Store from "./../models/store.model.js";
// import Order from "./../models/order.model.js";
// import Ecommerce from "../models/ecommerce.model.js";
// import { v2 as cloudinary } from "cloudinary";


// export const shuffleProducts = async (req, res) => {
//   try {
//     const products = await Product.aggregate([
//       { $sample: { size: 5 } }, // Returns 5 random documents from the Product collection
//     ]);
//     res.status(200).json(products);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const getCatProducts = async (req, res) => {
//   try {
//     const { subCat } = req.params;
//     const products = await Product.find({ subCategory: subCat });
//     res.status(200).json(products);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const gethomeProducts = async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = 10;
//   const skip = (page - 1) * limit;
//   try {
//     const totalCount = await Product.countDocuments();
//     const products = await Product.find().skip(skip).limit(limit);
//     res.status(200).json({ products, totalCount });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select(
//       "_id name email number altNumber createdAt orders store"
//     );
//     res.status(200).json(users);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const getAllStores = async (req, res) => {
//   try {
//     const stores = await Store.find()
//       .select("_id name owner products orders createdAt")
//       .populate({
//         path: "owner",
//         select: "name email number _id",
//       });
//     res.status(200).json(stores);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find()
//       .select("_id name store subCategory image price sold createdAt")
//       .populate("store", "_id name");
//     res.status(200).json(products);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .select("_id customer amount delivaryCharge COD status createdAt")
//       .populate("customer", "_id name number altNumber email");
//     res.status(200).json(orders);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const getSuperAdminData = async (req, res) => {
//   try {
//     const users = await User.find();
//     const TOTALUSERS = users.length;
//     const TOTALCUSTOMER = users.filter(
//       (user) => user.store?.length === 0
//     ).length;
//     const TOTALSELLER = users.filter((user) => user.store?.length > 0).length;
//     const REPORTEDUSERS = 0; //CREATE A REPORTEDUSERS MODEL AND INCLUDE IT

//     const stores = await Store.find();
//     const TOTALSTORES = stores.length;
//     const TOTALVERIFIEDSTORES = stores.filter(
//       (store) => store.orders?.length > 0
//     ).length;
//     const ZERODELIVERED = stores.filter(
//       (store) => store.orders?.length === 0
//     ).length;
//     const REVIEWEDSTORES = 0; //CREATE A REVIEWEDSTORES MODEL AND INCLUDE IT

//     const products = await Product.find();
//     const TOTALPRODUCTS = products.length;
//     const TOTALSELL = products.reduce((acc, product) => acc + product.sold, 0);
//     const REPORTEDPRODUCTS = 0; //CREATE A REPORTEDPRODUCTS MODEL AND INCLUDE IT
//     const TOTALSTOCK = products.reduce(
//       (acc, product) => acc + product.stock,
//       0
//     );

//     const orders = await Order.find();
//     const TOTALORDERS = orders.length;
//     const PENDINGORDERS = orders.filter(
//       (order) => order.status === "pending"
//     ).length;
//     const DELIVEREDORDERS = orders.filter(
//       (order) => order.status === "delivered"
//     ).length;
//     const CANCELLEDORDERS = orders.filter(
//       (order) => order.status === "cancelled"
//     ).length;

//     const DASHBOARD = {
//       TOTALCUSTOMER,
//       TOTALSELLER,
//       TOTALUSERS,
//       REPORTEDUSERS,
//       TOTALSTORES,
//       TOTALVERIFIEDSTORES,
//       ZERODELIVERED,
//       REVIEWEDSTORES,
//       TOTALPRODUCTS,
//       TOTALSELL,
//       REPORTEDPRODUCTS,
//       TOTALSTOCK,
//       TOTALORDERS,
//       PENDINGORDERS,
//       DELIVEREDORDERS,
//       CANCELLEDORDERS,
//     };

//     res.status(200).json(DASHBOARD);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const carouselUpdate = async (req, res) => {
//   try {
//     let { slides: images } = req.body;
//     if (!images || images.length < 4)
//       return res.status(400).json({ error: "4 Images are required" });
//     //onClick navigate Create Later
//     async function uploadImage(images) {
//       if (images && images.length > 0) {
//         const uploadImage = await Promise.all(
//           images.map(async (image) => {
//             const upload = await cloudinary.uploader.upload(image);
//             return upload.secure_url;
//           })
//         );
//         images = uploadImage;
//       }
//     }
//     await uploadImage(images);
//     const carousel = await Ecommerce.findOneAndUpdate(
//       {},
//       { $set: { carousel: images } },
//       { new: true, upsert: true }
//     );
//     res.status(200).json(carousel);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const getCarouselSlides = async (req, res) => {
//   try {
//     const carousel = await Ecommerce.findOne().select("carousel");
//     res.status(200).json(carousel);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const createGridCat = async (req, res) => {
//   try {
//     const { gridCat } = req.body;

//     if (!gridCat || !Array.isArray(gridCat)) {
//       return res.status(400).json({ error: "Invalid categories data" });
//     }

//     // Find the existing document or create a new one
//     const ecommerce = await Ecommerce.findOneAndUpdate(
//       {},
//       { gridCat },
//       { new: true, upsert: true }
//     );

//     res.status(200).json(ecommerce);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const getLastSection = async (req, res) => {
//   try {
//     const PRODUCTS = await Product.find()
//       .limit(12)
//       .select("name avgRatting price image");
//     const SELLING = PRODUCTS.slice(0, 3);
//     const TRENDING = PRODUCTS.slice(3, 6);
//     const RECENT = PRODUCTS.slice(6, 9);
//     const RATED = PRODUCTS.slice(9, 12);

//     const sections = {
//       SELLING,
//       TRENDING,
//       RECENT,
//       RATED,
//     };

//     res.status(200).json(sections);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
