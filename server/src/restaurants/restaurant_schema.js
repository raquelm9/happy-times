import mongoose from "mongoose";
import { AddressSchema } from "./adress_schema.js";
import { Restaurant } from "./restaurants.js";

const Schema = mongoose.Schema;

export const RestaurantSchema = new Schema(
  {
    name: String,
    description: String,
    website: String,
    image: String,
    address: AddressSchema,
  },
  { timestamps: true }
);

const RestaurantModel = mongoose.model("restaurants", RestaurantSchema);

export const createRestaurant = (restaurant) => {
  return RestaurantModel.create(restaurant).then((document) => {
    return Restaurant.from(document);
  });
};

export const findAllRestaurants = () => {
  return RestaurantModel.find({}).then((documents) => {
    return documents.map((document) => Restaurant.from(document));
  });
};
