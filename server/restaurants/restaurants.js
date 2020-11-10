import { HappyHour } from "./happy_hours.js";
import { OpenDays } from "./open_days.js";
import { Menu } from "./menu.js";
import { MenuItem } from "./menu_item.js";
import { Address } from "./address.js";

export class Restaurant {
  constructor(id, name, description, website, image, address) {
    this.id = id;
    this.setName(name);
    this.setDescription(description);
    this.setWebsite(website);
    this.setImage(image);
    this.setAddress(address);

    this.happyHours = [];
  }

  registerHappyHour(happyHour) {
    this.happyHours.push(happyHour);
  }

  setName(name) {
    if (!name) {
      throw "Name is required";
    } else {
      this.name = name;
    }
  }

  setDescription(description) {
    if (!description) {
      throw "Description is required";
    } else {
      this.description = description;
    }
  }

  setWebsite(website) {
    if (!website) {
      throw "Website is required";
    } else {
      this.website = website;
    }
  }

  setImage(image) {
    if (!image) {
      throw "Image is required";
    } else {
      this.image = image;
    }
  }

  setAddress(address) {
    if (!address) {
      throw "Address is required";
    } else {
      this.address = address;
    }
  }
}

const rest1 = new Restaurant(
  "23445",
  "abc",
  "Lorem ipsum dolor sit amet.",
  "https://abc.com",
  "http://localhost:3000/uploads/2020-11-03T18:56:45.481Zcoding_img.png",
  new Address(710, 5, "T2R0Y6", "Calgary", "AB")
);
rest1.registerHappyHour(
  new HappyHour(
    "2345",
    new OpenDays([OpenDays.weekDays.MON, OpenDays.weekDays.TUE]),
    "3:00PM",
    "6:00PM",
    new Menu([
      new MenuItem("123", "a", "b", 2, "food"),
      new MenuItem("456", "a", "b", 3, "food"),
    ])
  )
);

export const restaurants = [rest1];
