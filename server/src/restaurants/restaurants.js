import { HappyHour } from "./happy_hours.js";
import { Address } from "./address.js";

const weekDays = {
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
};

export class Restaurant {
  constructor(id, name, description, website, image, address) {
    this.id = id;
    this._id = id;
    this.setName(name);
    this.setDescription(description);
    this.setWebsite(website);
    this.setImage(image);
    this.setAddress(address);

    this.happyHours = [];
  }

  static from(document) {
    const restaurant = new Restaurant(
      (document._id || document.id).toString(),
      document.name,
      document.description,
      document.website,
      document.image,
      Address.from(document.address)
    );

    // Populate restaurant happy hours
    restaurant.happyHours = document.happyHours.map((hh) => HappyHour.from(hh));
    return restaurant;
  }

  registerHappyHour(happyHour) {
    this.happyHours.push(happyHour);
  }

  happyHourForId(happyHourId) {
    return this.happyHours.find((each) => each.id.toString() === happyHourId);
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
