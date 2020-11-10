import { restaurants } from "./restaurants/restaurants.js";

import { Restaurant } from "./restaurants/restaurants.js";
import { Address } from "./restaurants/address.js";
import { HappyHour } from "./restaurants/happy_hours.js";
import { MenuItem } from "./restaurants/menu_item.js";
import { Menu } from "./restaurants/menu.js";
import { OpenDays } from "./restaurants/open_days.js";

import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

var fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var app = express();

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

app.get("/restaurants", function (req, res) {
  res.send(restaurants);
});

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

app.delete("/restaurants/:restaurantId/happy-hours/:happyhourId", function (
  req,
  res
) {
  var restaurantId = req.params.restaurantId;
  var happyHourId = req.params.happyhourId;

  const rest = restaurants.find((restaurant) => restaurantId === restaurant.id);

  const hh = rest.happyHours.find((happyHour) => happyHourId === happyHour.id);

  const index = rest.happyHours.indexOf(hh);

  if (index > -1) {
    rest.happyHours.splice(index, 1);
    res.status(200).send(restaurants);
  } else {
    res.status(404).send("Restaurant Id not found");
  }
});

// Restaurant: name, description, website, image, address
app.post("/restaurants", upload.single("image"), function (req, res) {
  var reqBodyRest = req.body;
  var newImage = req.file;

  var newRest = new Restaurant(
    reqBodyRest.id,
    reqBodyRest.name,
    reqBodyRest.description,
    reqBodyRest.website,
    newImage.path,
    newAddress
  );

  var newAddress = new Address(
    reqBodyRest.address.unit,
    reqBodyRest.address.street,
    reqBodyRest.address.postalCode,
    reqBodyRest.address.city,
    reqBodyRest.address.province
  );

  restaurants.push(newRest);
  res.status(200).send(restaurants);
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

app.put("/restaurants/:restaurantId", upload.single("image"), function (
  req,
  res
) {
  var restaurantId = req.params.restaurantId;
  const rest = restaurants.find((restaurant) => restaurantId === restaurant.id);

  if (rest) {
    const address = req.body.address;

    const newAddress = new Address(
      address.unit,
      address.street,
      address.postalCode,
      address.city,
      address.province
    );

    if (req.body.name) {
      rest.setName(req.body.name);
    }

    if (req.body.description) {
      rest.setDescription(req.body.description);
    }

    if (req.body.website) {
      rest.setWebsite(req.body.website);
    }

    if (req.file) {
      rest.setImage(req.file);
    }

    if (newAddress) {
      rest.setAddress(newAddress);
    }

    res.status(200).send(rest);
  } else {
    res.status(400).send({ error: "Restaurant Id not found" });
  }
});

app.put("/restaurants/:restaurantId/happy-hours/:happyhourId", function (
  req,
  res
) {
  var restaurantId = req.params.restaurantId;
  var happyHourId = req.params.happyhourId;

  const rest = restaurants.find((restaurant) => restaurantId === restaurant.id);

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
});

app.put(
  "/restaurants/:restaurantId/happy-hours/:happyhourId/:itemId",
  function (req, res) {
    var restaurantId = req.params.restaurantId;
    var happyHourId = req.params.happyhourId;
    var happyHourItemID = req.params.itemId;

    const rest = restaurants.find(
      (restaurant) => restaurantId === restaurant.id
    );

    const hh = rest.happyHours.find(
      (happyHour) => happyHourId === happyHour.id
    );

    const HappyHourItem = rest.hh.menu.items.find(
      (item) => happyHourItemID === item.id
    );

    if (happyHourItem) {
      const index1 = rest.happyHours.indexOf(hh);
      const index2 = rest.happyHours[index1].menu.items.indexOf(HappyHourItem);

      if (req.body.name) {
        rest.happyHours[index1].menu.items[index2].setName(req.body.name);
      }

      if (req.body.description) {
        rest.happyHours[index1].menu.items[index2].setDescription(
          req.body.description
        );
      }

      if (req.body.price) {
        rest.happyHours[index1].menu.items[index2].setDescription(
          req.body.price
        );
      }

      if (req.body.category) {
        rest.happyHours[index1].menu.items[index2].setCategory(
          req.body.category
        );
      }

      res.status(200).send(restaurants);
    } else if (!rest) {
      res.status(400).send({ error: "Restaurant Id not found" });
    } else if (!happyHourUpdate) {
      res.status(400).send({ error: "Happy Hour Id not found" });
    } else if (!HappyHourItem) {
      res.status(400).send({ error: "Item Id not found" });
    }
  }
);

app.listen(3000, function () {
  console.log("First API running on port 3000!");
});
