import { restaurants } from "./src/restaurants/restaurants.js";

import { Restaurant } from "./src/restaurants/restaurants.js";
import { Address } from "./src/restaurants/address.js";
import { HappyHour } from "./src/restaurants/happy_hours.js";
import { MenuItem } from "./src/restaurants/menu_item.js";
import { Menu } from "./src/restaurants/menu.js";

import { saveBase64Image } from "./utils/images.js";
import uniqueId from "lodash/uniqueId.js";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { bootstrapDB } from "./bootstrap/bootstrap_db.js";
import {
  createRestaurant,
  findAllRestaurants,
  findRestaurantById,
  updateRestaurant,
} from "./src/restaurants/restaurant_schema.js";

const SERVER_PORT = 3001;
const APP_NAME = "happy-times";

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

app.get("/restaurants", function (req, res) {
  findAllRestaurants().then((rests) => {
    // res.send(restaurants);
    res.status(200).send(rests);
  });
});

app.get("/restaurant/:restaurantId", function (req, res) {
  var restaurantId = req.params.restaurantId;
  findRestaurantById(restaurantId).then((found) => {
    if (found) {
      res.status(200).send(found);
    } else {
      res.status(404).send("Restaurant Id not found");
    }
  });
});

app.get(
  "/restaurant/:restaurantId/happy-hour/:happyHourId",
  function (req, res) {
    var restaurantId = req.params.restaurantId;
    var happyHourId = req.params.happyHourId;

    const rest = restaurants.find(
      (restaurant) => restaurantId === restaurant.id
    );

    const happyHour = rest.happyHours.find(
      (happyHour) => happyHourId === happyHour.id
    );

    if (happyHour) {
      res.status(200).send(happyHour);
    } else if (!rest) {
      res.status(404).send("Restaurant Id not found");
    } else if (!happyHour) {
      res.status(404).send("Happy Hour Id not found");
    }
  }
);

app.get(
  "/restaurant/:restaurantId/happy-hour/:happyHourId/item/:itemId",
  function (req, res) {
    var restaurantId = req.params.restaurantId;
    var happyHourId = req.params.happyHourId;
    var itemId = req.params.itemId;

    const rest = restaurants.find(
      (restaurant) => restaurantId === restaurant.id
    );

    const happyHour = rest.happyHours.find(
      (happyHour) => happyHourId === happyHour.id
    );

    const index1 = rest.happyHours.indexOf(happyHour);

    const item = rest.happyHours[index1].menu.items.find(
      (item) => itemId === item.id
    );

    if (item) {
      res.status(200).send(item);
    } else if (!rest) {
      res.status(404).send("Restaurant Id not found");
    } else if (!happyHour) {
      res.status(404).send("Happy Hour Id not found");
    } else if (!item) {
      res.status(404).send("Item Id not found");
    }
  }
);

app.delete("/restaurants/:restaurantId", function (req, res) {
  var restaurantId = req.params.restaurantId;

  const rest = restaurants.find((restaurant) => restaurantId === restaurant.id);

  const index = restaurants.indexOf(rest);

  if (index > -1) {
    restaurants.splice(index, 1);
    res.status(200).send(restaurants);
  } else {
    res.status(404).send("Restaurant Id not found");
  }
});

app.delete(
  "/restaurants/:restaurantId/happy-hours/:happyhourId",
  function (req, res) {
    var restaurantId = req.params.restaurantId;
    var happyHourId = req.params.happyhourId;

    const rest = restaurants.find(
      (restaurant) => restaurantId === restaurant.id
    );

    const hh = rest.happyHours.find(
      (happyHour) => happyHourId === happyHour.id
    );

    const index = rest.happyHours.indexOf(hh);

    if (index > -1) {
      rest.happyHours.splice(index, 1);
      res.status(200).send(restaurants);
    } else {
      res.status(404).send("Restaurant Id not found");
    }
  }
);

app.delete(
  "/restaurants/:restaurantId/happy-hours/:happyhourId/:itemId",
  function (req, res) {
    var restaurantId = req.params.restaurantId;
    var happyHourId = req.params.happyhourId;
    var happyHourItemId = req.params.itemId;

    const rest = restaurants.find(
      (restaurant) => restaurantId === restaurant.id
    );

    const happyHr = rest.happyHours.find(
      (happyHour) => happyHourId === happyHour.id
    );

    const index1 = rest.happyHours.indexOf(happyHr);

    const happyHourItem = rest.happyHours[index1].menu.items.find(
      (item) => happyHourItemId === item.id
    );

    var index2 = rest.happyHours[index1].menu.items.indexOf(happyHourItem);

    if (index2 > -1) {
      rest.happyHours[index1].menu.items.splice(index2, 1);
      res.status(200).send(restaurants);
    } else {
      res.status(404).send("Restaurant Id not found");
    }
  }
);

// Restaurant: name, description, website, image, address
app.post("/restaurants", function (req, res) {
  const reqBodyRest = req.body;
  const path = saveBase64Image(reqBodyRest.image);

  const newAddress = new Address(
    reqBodyRest.address.unit,
    reqBodyRest.address.street,
    reqBodyRest.address.postalCode,
    reqBodyRest.address.city,
    reqBodyRest.address.province
  );

  const newRest = new Restaurant(
    undefined,
    reqBodyRest.name,
    reqBodyRest.description,
    reqBodyRest.website,
    path,
    newAddress
  );

  createRestaurant(newRest).then((savedRestaurant) => {
    restaurants.push(savedRestaurant);
    res.status(200).send(savedRestaurant);
  });
});

// Happy Time: open days, start time, end time, menu (name, description, price, category)
app.post("/restaurants/:restaurantId/happy-hours", function (req, res) {
  var restaurantId = req.params.restaurantId;
  var reqBodyHappyHour = req.body;

  var newHappyHour = new HappyHour(
    undefined,
    reqBodyHappyHour.openDays,
    reqBodyHappyHour.startTime,
    reqBodyHappyHour.endTime,
    new Menu()
  );

  findRestaurantById(restaurantId).then((restaurant) => {
    if (restaurant) {
      restaurant.registerHappyHour(newHappyHour);
      return updateRestaurant(restaurant).then((updatedRestaurant) => {
        res.status(200).send(updatedRestaurant.happyHours[0]);
      });
    } else {
      res.status(404).send("Restaurant Id not found");
    }
  });
});

app.post(
  "/restaurants/:restaurantId/happy-hours/:happyHourId/item/",
  function (req, res) {
    var restaurantId = req.params.restaurantId;
    var happyHourId = req.params.happyHourId;

    const rest = restaurants.find(
      (restaurant) => restaurantId === restaurant.id
    );
    const happyHr = rest.happyHours.find(
      (happyHour) => happyHourId === happyHour.id
    );
    const index1 = rest.happyHours.indexOf(happyHr);

    const newItem = new MenuItem(
      uniqueId("item-"),
      req.body.name,
      req.body.description,
      req.body.price,
      req.body.category
    );

    rest.happyHours[index1].menu.registerItem(newItem);
    const updatedListItems = rest.happyHours[index1].menu.items;
    res.status(200).send(updatedListItems);
  }
);

app.put("/restaurants/:restaurantId", function (req, res) {
  var restaurantId = req.params.restaurantId;

  findRestaurantById(restaurantId).then((rest) => {
    const address = req.body.address;

    if (req.body.name) {
      rest.setName(req.body.name);
    }

    if (req.body.image) {
      const path = saveBase64Image(req.body.image);
      rest.setImage(path);
    }

    if (req.body.description) {
      rest.setDescription(req.body.description);
    }

    if (req.body.website) {
      rest.setWebsite(req.body.website);
    }

    if (address) {
      const newAddress = new Address(
        address.unit,
        address.street,
        address.postalCode,
        address.city,
        address.province
      );
      rest.setAddress(newAddress);
    }

    if (rest) {
      return updateRestaurant(rest).then((updated) =>
        res.status(200).send(updated)
      );
    } else {
      res.status(400).send({ error: "Restaurant Id not found" });
    }
  });
});

app.put(
  "/restaurants/:restaurantId/happy-hours/:happyhourId",
  function (req, res) {
    var restaurantId = req.params.restaurantId;
    var happyHourId = req.params.happyhourId;

    const rest = restaurants.find(
      (restaurant) => restaurantId === restaurant.id
    );

    const happyHourUpdate = rest.happyHours.find(
      (happyHour) => happyHourId === happyHour.id
    );

    if (happyHourUpdate) {
      const index = rest.happyHours.indexOf(happyHourUpdate);

      if (req.body.openDays) {
        rest.happyHours[index].setOpenDays(req.body.openDays);
      }

      if (req.body.startTime) {
        rest.happyHours[index].setStartTime(req.body.startTime);
      }

      if (req.body.endTime) {
        rest.happyHours[index].setEndTime(req.body.endTime);
      }

      res.status(200).send(happyHourUpdate);
    } else if (!rest) {
      res.status(400).send({ error: "Restaurant Id not found" });
    } else if (!happyHourUpdate) {
      res.status(400).send({ error: "Happy Hour Id not found" });
    }
  }
);

app.put(
  "/restaurants/:restaurantId/happy-hours/:happyHourId/:itemId",
  function (req, res) {
    var restaurantId = req.params.restaurantId;
    var happyHourId = req.params.happyHourId;
    var happyHourItemId = req.params.itemId;

    const rest = restaurants.find(
      (restaurant) => restaurantId === restaurant.id
    );

    const happyHr = rest.happyHours.find(
      (happyHour) => happyHourId === happyHour.id
    );

    const index1 = rest.happyHours.indexOf(happyHr);

    const happyHourItem = rest.happyHours[index1].menu.items.find(
      (item) => happyHourItemId === item.id
    );

    if (happyHourItem) {
      var index2 = rest.happyHours[index1].menu.items.indexOf(happyHourItem);

      if (req.body.name) {
        rest.happyHours[index1].menu.items[index2].setName(req.body.name);
      }

      if (req.body.description) {
        rest.happyHours[index1].menu.items[index2].setDescription(
          req.body.description
        );
      }

      if (req.body.price) {
        rest.happyHours[index1].menu.items[index2].setPrice(req.body.price);
      }

      if (req.body.category) {
        rest.happyHours[index1].menu.items[index2].setCategory(
          req.body.category
        );
      }

      const updatedListItems = rest.happyHours[index1].menu.items;

      res.status(200).send(updatedListItems);
    } else if (!rest) {
      res.status(400).send({ error: "Restaurant Id not found" });
    } else if (!happyHr) {
      res.status(400).send({ error: "Happy Hour Id not found" });
    } else if (!HappyHourItem) {
      res.status(400).send({ error: "Item Id not found" });
    }
  }
);

app.listen(SERVER_PORT, function () {
  bootstrapDB(APP_NAME);
  console.log(`--- Connected to databse ${APP_NAME} ---`);

  console.log(` --- Server running on port ${SERVER_PORT}! --`);
});
