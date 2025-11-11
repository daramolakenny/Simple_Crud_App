import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://daramolakenny18_db_user:dkAI4RItxmbflvDt@cluster0.zptwmes.mongodb.net/")
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1);                                     
  }
}
 
// "mongodb+srv://essentialng23:mN7tBifRDCClp2BC@cluster0.bgpf6.mongodb.net/Ejobs?retryWrites=true&w=majority&appName=Cluster0"