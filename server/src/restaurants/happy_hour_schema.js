import { MenuSchema } from "./menu_schema.js";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const HappyHourSchema = new Schema(
  {
    openDays: [Number],
    startTime: String,
    endTime: String,
    menu: MenuSchema,
  },
  { timestamps: true }
);
