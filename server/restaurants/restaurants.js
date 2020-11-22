import { HappyHour } from "./happy_hours.js";
import { OpenDays } from "./open_days.js";
import { Menu } from "./menu.js";
import { MenuItem } from "./menu_item.js";
import { Address } from "./address.js";

import uniqueId from "lodash/uniqueId.js";

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
  uniqueId("restaurant-"),
  "Cannibale",
  "Eat, drink, and be groomed later",
  "https://www.cannibale.ca/",
  "http://localhost:3001/uploads/2020-11-13T17:18:19.211Zfinals-0001.jpg",
  new Address(813, "1 AVE NE", "T2E 0C2", "Calgary", "AB")
);
rest1.registerHappyHour(
  new HappyHour(
    "1.1",
    new OpenDays([
      OpenDays.weekDays.MON,
      OpenDays.weekDays.TUE,
      OpenDays.weekDays.WED,
      OpenDays.weekDays.FRI,
      OpenDays.weekDays.SAT,
    ]),
    "3:00PM",
    "5:00PM",
    new Menu([
      new MenuItem("1.1.1", "Alyth Lager", "Dandy Brewing Co", 5, "drink"),
      new MenuItem(
        "1.1.2",
        "Super Fusion Catharina Sour with Pink Guava",
        "The Establishment Brewing Co",
        5,
        "drink"
      ),
      new MenuItem("1.1.3", "Sundaze", "Tequila + Lager", 7, "drink"),
      new MenuItem("1.1.4", "The Banger", "Whisky + IPA", 7, "drink"),
      new MenuItem(
        "1.1.5",
        "Manhatten",
        "Rye, sweet vermouth, Angostura bitters",
        9,
        "drink"
      ),
      new MenuItem(
        "1.1.6",
        "Old Fashioned",
        "Evan Williams, demarara, Angostura bitters",
        9,
        "drink"
      ),
    ])
  )
);
rest1.registerHappyHour(
  new HappyHour(
    "1.2",
    new OpenDays([OpenDays.weekDays.SUN, OpenDays.weekDays.THU]),
    "10:00PM",
    "Close",
    new Menu([
      new MenuItem(
        "1.1.7",
        "Super Saturation NEPA",
        "Cabin Brewing Co",
        5,
        "drink"
      ),
      new MenuItem(
        "1.1.8",
        "Tokyo Drift IPA",
        "Last Best Brewing Co",
        5,
        "drink"
      ),
      new MenuItem(
        "1.1.9",
        "Shiki Cheeky",
        "Japanese Whisky + Sake",
        7,
        "drink"
      ),
      new MenuItem("1.1.10", "Super Duper Fusion", "Aperol + Sour", 7, "drink"),
      new MenuItem(
        "1.1.11",
        "Daiquiri",
        "Bacardi White Rum, lime, gomme syrup",
        9,
        "drink"
      ),
      new MenuItem(
        "1.1.12",
        "El Diablo",
        "Tequila, cassis, lime, ginger ale",
        9,
        "drink"
      ),
    ])
  )
);

const rest2 = new Restaurant(
  uniqueId("restaurant-"),
  "Anejo",
  "Añejo Mexican Restaurant",
  "https://anejo.ca/",
  "http://localhost:3001/uploads/2020-11-13T18:13:09.094Ztequila.jpg",
  new Address(2116, "4 St SE", "T2S 1W7", "Calgary", "AB")
);
rest2.registerHappyHour(
  new HappyHour(
    "2.1",
    new OpenDays([
      OpenDays.weekDays.MON,
      OpenDays.weekDays.TUE,
      OpenDays.weekDays.WED,
      OpenDays.weekDays.THU,
      OpenDays.weekDays.FRI,
      OpenDays.weekDays.SAT,
      OpenDays.weekDays.SUN,
    ]),
    "3:00PM",
    "5:00PM",
    new Menu([
      new MenuItem(
        "2.1.1",
        "Margarita",
        "Variations of the Cocktail",
        6,
        "drink"
      ),
      new MenuItem("2.1.2", "Beers", "Mex Cervezas", 6, "drink"),
      new MenuItem(
        "2.1.3",
        "Tacos",
        "Variations of the Tacos",
        "1/2 price",
        "food"
      ),
      new MenuItem(
        "2.1.4",
        "Tequila",
        "Variations of Tequila",
        "1/2 price",
        "drink"
      ),
    ])
  )
);

const rest3 = new Restaurant(
  uniqueId("restaurant-"),
  "Double Zero",
  "It'll be amore at first sight",
  "https://www.doublezeropizza.ca/",
  "http://localhost:3001/uploads/2020-11-13T18:14:18.758ZDOUBLEZERO-7539.jpg",
  new Address(1133, "6455 Macleod Trail SW", "T2H 0K8", "Calgary", "AB")
);
rest3.registerHappyHour(
  new HappyHour(
    "3.1",
    new OpenDays([
      OpenDays.weekDays.MON,
      OpenDays.weekDays.TUE,
      OpenDays.weekDays.WED,
      OpenDays.weekDays.THU,
      OpenDays.weekDays.FRI,
      OpenDays.weekDays.SAT,
      OpenDays.weekDays.SUN,
    ]),
    "2:00PM",
    "5:00PM",
    new Menu([
      new MenuItem("3.1.1", "Pizza", "Variations of Pizzas", 12, "food"),
      new MenuItem(
        "3.1.2",
        "Glass of wine",
        "Red, white or rose",
        "1/2 price",
        "drink"
      ),
      new MenuItem("2.1.3", "Beer", "Craft beer", "1/2 price", "drink"),
      new MenuItem(
        "2.1.4",
        "Bubbles",
        "Variations of bubbles",
        "1/2 price",
        "drink"
      ),
    ])
  )
);

export const restaurants = [rest1, rest2, rest3];
