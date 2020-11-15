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

  removeRestaurant = (id) => {
    var promise = new Promise((resolve, reject) => {
      fetch("http://localhost:3001/restaurants/" + id, {
        method: "delete",
      }).then((res) => {
        resolve(res.json());
      });
    });
    return promise;
  };
}
