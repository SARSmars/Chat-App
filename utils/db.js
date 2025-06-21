import mongoose from "mongoose";

const DbCon = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");

    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
}   
export default DbCon;