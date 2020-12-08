import mongoose from "mongoose";
import { HappyHourSchema } from "./happy_hour_schema.js";
import { Restaurant } from "./restaurants.js";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

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
      coordinates: { latitude: Number, longitude: Number },
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
  return RestaurantModel.findOne({
    _id: ObjectId(restaurantId),
  }).then((document) => Restaurant.from(document));
};

export const createRestaurant = (restaurant) => {
  return RestaurantModel.create(restaurant).then((document) => {
    return Restaurant.from(document);
  });
};

export const updateRestaurant = (restaurant) => {
  return RestaurantModel.updateOne(
    { _id: ObjectId(restaurant.id) },
    restaurant
  ).then(() => findRestaurantById(restaurant.id));
};

export const deleteRestaurant = (restaurantId) => {
  return RestaurantModel.deleteOne({ _id: ObjectId(restaurantId) });
};

export const deleteHappyHour = (restaurantId, happyHourId) => {
  return RestaurantModel.updateOne(
    { _id: ObjectId(restaurantId) },
    { $pull: { happyHours: { _id: ObjectId(happyHourId) } } }
  );
};

export const deleteItem = (restaurantId, happyHourItemId) => {
  return RestaurantModel.updateOne(
    { _id: ObjectId(restaurantId) },
    {
      $pull: {
        "happyHours.$[].menu.items": { _id: ObjectId(happyHourItemId) },
      },
    }
  );
};
