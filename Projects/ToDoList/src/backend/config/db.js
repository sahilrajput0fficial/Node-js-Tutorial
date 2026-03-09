import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const db_user = encodeURIComponent(process.env.DATABASE_USER);
const db_password = encodeURIComponent(process.env.DATABASE_PASSWORD);
const db_userdb = encodeURIComponent(process.env.DB_NAME);
const db_usercluster = encodeURIComponent(process.env.CLUSTER_NAME);

const uri = `mongodb+srv://${db_user}:${db_password}@cluster0.wftt93m.mongodb.net/${db_userdb}?appName=${db_usercluster}`;
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(uri);

    console.log("DATABASE Connected");
  } catch (err) {
    console.log(`Error ocuured ${err}`);
  }
};
export default connectDb;
