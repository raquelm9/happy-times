import mongoose from "mongoose";
import { HappyHourSchema } from "./happy_hour_schema.js";
import { Restaurant } from "./restaurants.js";

const Schema = mongoose.Schema;

export const RestaurantSchema = new Schema(
  {
    name: String,
    description: String,
    website: String,
    image: String,
    address: {
      unit: Number,
      street: String,
      postalCode: String,
      city: String,
      province: String,
    },
    happyHours: [HappyHourSchema],
  },
  { timestamps: true }
);

const RestaurantModel = mongoose.model("restaurants", RestaurantSchema);

export const findAllRestaurants = () => {
  return RestaurantModel.find({}).then((documents) => {
    return documents.map((document) => Restaurant.from(document));
  });
};

export const findRestaurantById = (restaurantId) => {
  return RestaurantModel.findOne({ _id: restaurantId }).then((document) =>
    Restaurant.from(document)
  );
};

export const createRestaurant = (restaurant) => {
  return RestaurantModel.create(restaurant).then((document) => {
    return Restaurant.from(document);
  });
};

export const updateRestaurant = (restaurant) => {
  return RestaurantModel.update({ _id: restaurant.id }, restaurant).then(() => {
    return restaurant;
  });
};
