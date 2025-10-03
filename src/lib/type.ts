interface IPrice {
    size: string;
    sellPrice: number;
    mrp: number;
  }
  
  interface IColor {
    name: string;
    code: string;
  }
  
  interface IOrderItem {
    order: string; // use string instead of ObjectId for frontend
    quantity: number;
  }
  
  export interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: IPrice[];
    images: string[];
    colors: IColor[];
    size: string[];
    category: string;
    subCategory: string;
    brand: string;
    material: string;
    GWS: string;
    stock: number;
    status: string;
    store: string;
    uploader: string;
    reviews: string[];
    sold: number;
    avgRatting: number;
    addtocart: string[];
    orders: IOrderItem[];
    wishlisted: string[];
    createdAt: string;
    updatedAt: string;
  }



