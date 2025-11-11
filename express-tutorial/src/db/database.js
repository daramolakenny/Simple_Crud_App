import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1);                                     
  }
}
 
// "mongodb+srv://essentialng23:mN7tBifRDCClp2BC@cluster0.bgpf6.mongodb.net/Ejobs?retryWrites=true&w=majority&appName=Cluster0"