import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const AddressSchema = new Schema({
  unit: Number,
  street: String,
  postalCode: String,
  city: String,
  province: String,
});
