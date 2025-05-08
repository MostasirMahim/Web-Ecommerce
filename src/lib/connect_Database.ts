import mongoose from "mongoose";

const mongodbConnect = async () => {
  try {
    const URI = process.env.MONGO_URI;
    if(!URI) {
      throw new Error("MONGO_URI is not defined");
    }
    const connect = await mongoose.connect(URI!);
    console.log("MongoDB Connected");
    console.log(`Mongo URI : ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
export default mongodbConnect;