import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const MenuItemSchema = new Schema({
  name: String,
  description: String,
  price: String,
  category: String,
});
