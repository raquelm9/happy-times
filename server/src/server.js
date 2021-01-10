import { Restaurant } from "./restaurants/restaurants.js";
import { Address } from "./restaurants/address.js";
import { HappyHour } from "./restaurants/happy_hours.js";
import { MenuItem } from "./restaurants/menu_item.js";
import { Menu } from "./restaurants/menu.js";
import { Coordinates } from "./restaurants/coordinates.js";
import { CloudinaryImageUploader } from "./utils/images.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { bootstrapDB } from "./bootstrap/bootstrap_db.js";
import {
  createRestaurant,
  deleteRestaurant,
  findAllRestaurants,
  findRestaurantById,
  updateRestaurant,
  deleteHappyHour,
  deleteItem,
} from "./restaurants/restaurant_schema.js";
import { config } from "./config/config.js";

var app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/uploads", express.static("uploads"));

/**
 * Restaurant
 */

app.get("/restaurants", function (req, res) {
  findAllRestaurants().then((rests) => {
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

app.delete("/restaurants/:restaurantId", function (req, res) {
  var restaurantId = req.params.restaurantId;

  deleteRestaurant(restaurantId)
    .then(() => findAllRestaurants())
    .then((allRestaurants) => res.status(200).send(allRestaurants));
});

app.post("/restaurants", function (req, res) {
  const reqBodyRest = req.body;
  const uploader = new CloudinaryImageUploader();

  uploader.upload(reqBodyRest.image).then((path) => {
    const newAddress = new Address(
      reqBodyRest.address.unit,
      reqBodyRest.address.street,
      reqBodyRest.address.postalCode,
      reqBodyRest.address.city,
      reqBodyRest.address.province,
      Coordinates.from(reqBodyRest.address.coordinates)
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
      res.status(200).send(savedRestaurant);
    });
  });
});

app.put("/restaurants/:restaurantId", function (req, res) {
  let uploadPromise = Promise.resolve();
  var restaurantId = req.params.restaurantId;

  findRestaurantById(restaurantId).then((rest) => {
    const address = req.body.address;

    if (req.body.name) {
      rest.setName(req.body.name);
    }

    if (req.body.image) {
      const uploader = new CloudinaryImageUploader();
      uploadPromise = uploader.upload(req.body.image).then((path) => {
        rest.setImage(path);
      });
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
        address.province,
        Coordinates.from(address.coordinates)
      );
      rest.setAddress(newAddress);
    }

    if (rest) {
      return uploadPromise
        .then(() => updateRestaurant(rest))
        .then((updated) => res.status(200).send(updated));
    } else {
      res.status(400).send({ error: "Restaurant Id not found" });
    }
  });
});

/**
 * Happy Hours
 */

app.get(
  "/restaurant/:restaurantId/happy-hour/:happyHourId",
  function (req, res) {
    var restaurantId = req.params.restaurantId;
    var happyHourId = req.params.happyHourId;

    findRestaurantById(restaurantId).then((restaurant) => {
      if (restaurant) {
        const happyHour = restaurant.happyHourForId(happyHourId);

        if (happyHour) {
          res.status(200).send(happyHour);
        } else if (!restaurant) {
          res.status(404).send("Restaurant Id not found");
        } else if (!happyHour) {
          res.status(404).send("Happy Hour Id not found");
        }
      }
    });
  }
);

app.delete(
  "/restaurants/:restaurantId/happy-hours/:happyhourId",
  function (req, res) {
    var restaurantId = req.params.restaurantId;
    var happyHourId = req.params.happyhourId;

    deleteHappyHour(restaurantId, happyHourId)
      .then(() => findAllRestaurants())
      .then((allRestaurants) => res.status(200).send(allRestaurants));
  }
);

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
        var index = updatedRestaurant.happyHours.length - 1;
        res.status(200).send(updatedRestaurant.happyHours[index]);
      });
    } else {
      res.status(404).send("Restaurant Id not found");
    }
  });
});

app.put(
  "/restaurants/:restaurantId/happy-hours/:happyhourId",
  function (req, res) {
    var restaurantId = req.params.restaurantId;
    var happyHourId = req.params.happyhourId;

    findRestaurantById(restaurantId).then((rest) => {
      if (!rest) {
        res.status(404).send({ error: "Restaurant Id not found" });
      }

      const happyHourUpdate = rest.happyHourForId(happyHourId);

      if (!happyHourUpdate) {
        res.status(404).send({ error: "HappyHour Id not found" });
      }

      if (req.body.openDays) {
        happyHourUpdate.setOpenDays(req.body.openDays);
      }

      if (req.body.startTime) {
        happyHourUpdate.setStartTime(req.body.startTime);
      }

      if (req.body.endTime) {
        happyHourUpdate.setEndTime(req.body.endTime);
      }

      return updateRestaurant(rest).then((updated) => {
        const updatedHappyHour = updated.happyHourForId(happyHourId);
        res.status(200).send(updatedHappyHour);
      });
    });
  }
);

/**
 * Menu Items
 */

app.get(
  "/restaurant/:restaurantId/happy-hour/:happyHourId/item/:itemId",
  function (req, res) {
    var restaurantId = req.params.restaurantId;
    var happyHourId = req.params.happyHourId;
    var itemId = req.params.itemId;

    findRestaurantById(restaurantId).then((restaurant) => {
      if (restaurant) {
        const happyHour = restaurant.happyHourForId(happyHourId);

        if (happyHour) {
          const item = happyHour.menu.findMenuItemForId(itemId);

          if (item) {
            res.status(200).send(item);
          } else if (!item) {
            res.status(404).send("Item not found");
          }
        } else if (!happyHour) {
          res.status(404).send("Happy Hour Id not found");
        }
      } else if (!restaurant) {
        res.status(404).send("Restaurant Id not found");
      }
    });
  }
);

app.delete(
  "/restaurants/:restaurantId/happy-hours/:happyhourId/:itemId",
  function (req, res) {
    var restaurantId = req.params.restaurantId;
    var happyHourItemId = req.params.itemId;

    deleteItem(restaurantId, happyHourItemId)
      .then(() => findAllRestaurants())
      .then((allRestaurants) => res.status(200).send(allRestaurants));
  }
);

app.post(
  "/restaurants/:restaurantId/happy-hours/:happyHourId/item/",
  function (req, res) {
    var restaurantId = req.params.restaurantId;
    var happyHourId = req.params.happyHourId;
    var reqBodyItem = req.body;

    const newItem = new MenuItem(
      undefined,
      reqBodyItem.name,
      reqBodyItem.description,
      reqBodyItem.price,
      reqBodyItem.category
    );

    findRestaurantById(restaurantId).then((restaurant) => {
      if (restaurant) {
        const happyHour = restaurant.happyHourForId(happyHourId);

        if (happyHour) {
          happyHour.menu.registerItem(newItem);
          return updateRestaurant(restaurant).then((updated) => {
            const updateHappyHour = updated.happyHourForId(happyHourId);
            res.status(200).send(updateHappyHour.menu.lastItem());
          });
        } else {
          res.status(404).send("Happy Hour Id not found");
        }
      } else {
        res.status(404).send("Restaurant Id not found");
      }
    });
  }
);

app.put(
  "/restaurants/:restaurantId/happy-hours/:happyHourId/:itemId",
  function (req, res) {
    var restaurantId = req.params.restaurantId;
    var happyHourId = req.params.happyHourId;
    var happyHourItemId = req.params.itemId;

    findRestaurantById(restaurantId).then((rest) => {
      if (!rest) {
        return res.status(404).send({ error: "Restaurant Id not found" });
      }

      const happyHr = rest.happyHourForId(happyHourId);

      if (!happyHr) {
        return res.status(404).send({ error: "Happy Hour Id not found" });
      }

      const item = happyHr.menu.findMenuItemForId(happyHourItemId);

      if (!item) {
        return res.status(404).send({ error: "Item Id not found" });
      }

      if (req.body.name) {
        item.setName(req.body.name);
      }

      if (req.body.description) {
        item.setDescription(req.body.description);
      }

      if (req.body.price) {
        item.setPrice(req.body.price);
      }

      if (req.body.category) {
        item.setCategory(req.body.category);
      }

      return updateRestaurant(rest).then((updated) => {
        const updatedHappyHour = updated.happyHourForId(happyHourId);
        res.status(200).send(updatedHappyHour.menu.allItems());
      });
    });
  }
);

app.listen(config.PORT, function () {
  bootstrapDB();
  console.log(`--- Connected to databse ${config.APP_NAME} ---`);
  console.log(` --- Server running on port ${config.PORT}! --`);
});
