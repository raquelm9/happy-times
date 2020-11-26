import { restaurants } from "./restaurants/restaurants.js";

import { Restaurant } from "./restaurants/restaurants.js";
import { Address } from "./restaurants/address.js";
import { HappyHour } from "./restaurants/happy_hours.js";
import { MenuItem } from "./restaurants/menu_item.js";
import { Menu } from "./restaurants/menu.js";
import { OpenDays } from "./restaurants/open_days.js";

import { saveBase64Image } from "./utils/images.js";
import uniqueId from "lodash/uniqueId.js";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

var app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

app.get("/restaurants", function (req, res) {
  res.send(restaurants);
});

app.get("/restaurant/:restaurantId", function (req, res) {
  var restaurantId = req.params.restaurantId;
  const found = restaurants.find(
    (restaurant) => restaurant.id === restaurantId
  );

  if (found) {
    res.status(200).send(found);
  } else {
    res.status(404).send("Restaurant Id not found");
  }
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
    uniqueId("restaurant-"),
    reqBodyRest.name,
    reqBodyRest.description,
    reqBodyRest.website,
    path,
    newAddress
  );

  restaurants.push(newRest);
  res.status(200).send(newRest);
});

// Happy Time: open days, start time, end time, menu (name, description, price, category)
app.post("/restaurants/:restaurantId/happy-hours", function (req, res) {
  var restaurantId = req.params.restaurantId;
  var reqBodyHappyHour = req.body;

  var newOpenDays = new OpenDays(reqBodyHappyHour.openDays);

  const items = reqBodyHappyHour.menu.items.map(
    (jsonItem) =>
      new MenuItem(
        jsonItem.name,
        jsonItem.description,
        jsonItem.price,
        jsonItem.category
      )
  );

  var newMenu = new Menu(items);

  var newHappyHour = new HappyHour(
    newOpenDays,
    reqBodyHappyHour.startTime,
    reqBodyHappyHour.endTime,
    newMenu
  );

  const rest = restaurants.find((restaurant) => restaurant.id === restaurantId);

  if (rest) {
    rest.registerHappyHour(newHappyHour);
    res.status(200).send(restaurants);
  } else {
    res.status(400).send({ error: "Restaurant Id not found" });
  }
});

app.put("/restaurants/:restaurantId", function (req, res) {
  var restaurantId = req.params.restaurantId;
  const rest = restaurants.find((restaurant) => restaurantId === restaurant.id);

  if (rest) {
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

    res.status(200).send(rest);
  } else {
    res.status(400).send({ error: "Restaurant Id not found" });
  }
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

      res.status(200).send(restaurants);
    } else if (!rest) {
      res.status(400).send({ error: "Restaurant Id not found" });
    } else if (!happyHourUpdate) {
      res.status(400).send({ error: "Happy Hour Id not found" });
    }
  }
);

app.put(
  "/restaurants/:restaurantId/happy-hours/:happyhourId/:itemId",
  function (req, res) {
    var restaurantId = req.params.restaurantId;
    var happyHourId = req.params.happyhourId;
    var happyHourItemID = req.params.itemId;

    const rest = restaurants.find(
      (restaurant) => restaurantId === restaurant.id
    );

    const happyHr = rest.happyHours.find(
      (happyHour) => happyHourId === happyHour.id
    );

    const index1 = rest.happyHours.indexOf(happyHr);

    const happyHourItem = rest.happyHours[index1].menu.items.find(
      (item) => happyHourItemID === item.id
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
      res.status(200).send(restaurants);
    } else if (!rest) {
      res.status(400).send({ error: "Restaurant Id not found" });
    } else if (!happyHr) {
      res.status(400).send({ error: "Happy Hour Id not found" });
    } else if (!HappyHourItem) {
      res.status(400).send({ error: "Item Id not found" });
    }
  }
);

app.listen(3001, function () {
  console.log("First API running on port 3001!");
});
