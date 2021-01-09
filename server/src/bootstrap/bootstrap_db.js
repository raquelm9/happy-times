import mongoose from "mongoose";
import { config } from "../config/config.js";

export const bootstrapDB = () => {
  mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
