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
}
