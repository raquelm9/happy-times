import "whatwg-fetch";

export class HttpService {
  getRestaurants = () => {
    var promise = new Promise((resolve, reject) => {
      fetch("http://localhost:3001/restaurants").then((res) => {
        resolve(res.json());
      });
    });
    return promise;
  };

  getRestaurantDetail = (id) => {
    var promise = new Promise((resolve, reject) => {
      fetch("http://localhost:3001/restaurant/" + id).then((res) => {
        resolve(res.json());
      });
    });
    return promise;
  };

  getRestaurantHappyHour = (restaurantId, happyHourId) => {
    var promise = new Promise((resolve, reject) => {
      fetch(
        "http://localhost:3001/restaurant/" +
          restaurantId +
          "/happy-hour/" +
          happyHourId
      ).then((res) => {
        resolve(res.json());
      });
    });
    return promise;
  };

  removeRestaurant = (id) => {
    var promise = new Promise((resolve, reject) => {
      fetch("http://localhost:3001/restaurants/" + id, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Hubot",
          login: "hubot",
        }),
      }).then((res) => {
        resolve(res.json());
      });
    });
    return promise;
  };

  removeHappyHour = (idRestaurant, idHappyHour) => {
    var promise = new Promise((resolve, reject) => {
      fetch(
        "http://localhost:3001/restaurants/" +
          idRestaurant +
          "/happy-hours/" +
          idHappyHour,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Hubot",
            login: "hubot",
          }),
        }
      ).then((res) => {
        resolve(res.json());
      });
    });
    return promise;
  };

  addRestaurant = (restaurant) => {
    var promise = new Promise((resolve, reject) => {
      fetch("http://localhost:3001/restaurants/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurant),
      }).then((res) => {
        resolve(res.json());
      });
    });
    return promise;
  };

  editRestaurant = (id, restaurant) => {
    var promise = new Promise((resolve, reject) => {
      fetch("http://localhost:3001/restaurants/" + id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurant),
      }).then((res) => {
        resolve(res.json());
      });
    });
    return promise;
  };
}
