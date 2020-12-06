import mongoose from "mongoose";
import { MenuItemSchema } from "./menu_item_schema.js";

const Schema = mongoose.Schema;

export const MenuSchema = new Schema({
  items: [MenuItemSchema],
});
