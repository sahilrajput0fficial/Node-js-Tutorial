import dotenv from "dotenv";
dotenv.config();

const APP_ID = process.env.CASHFREE_APP_ID;
const SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
const BASE_URL = "https://sandbox.cashfree.com/pg/orders";

export const config = {
  APP_ID,
  SECRET_KEY,
  BASE_URL,
};
