import 'whatwg-fetch'

// TODO: Move this to config
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001'

export class HttpService {
  getRestaurants = () => {
    var promise = new Promise((resolve, reject) => {
      fetch(`${SERVER_URL}/restaurants`).then((res) => {
        resolve(res.json())
      })
    })
    return promise
  }

  getRestaurantDetail = (id) => {
    var promise = new Promise((resolve, reject) => {
      fetch(`${SERVER_URL}/restaurant/${id}`).then((res) => {
        resolve(res.json())
      })
    })
    return promise
  }

  getRestaurantHappyHour = (restaurantId, happyHourId) => {
    var promise = new Promise((resolve, reject) => {
      fetch(
        `${SERVER_URL}/restaurant/${restaurantId}/happy-hour/${happyHourId}`
      ).then((res) => {
        resolve(res.json())
      })
    })
    return promise
  }

  getRestaurantItem = (restaurantId, happyHourId, itemId) => {
    var promise = new Promise((resolve, reject) => {
      fetch(
        `${SERVER_URL}/restaurant/${restaurantId}/happy-hour/${happyHourId}/item/${itemId}`
      ).then((res) => {
        resolve(res.json())
      })
    })
    return promise
  }

  removeRestaurant = (id) => {
    var promise = new Promise((resolve, reject) => {
      fetch(`${SERVER_URL}/restaurants/${id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        resolve(res.json())
      })
    })
    return promise
  }

  removeHappyHour = (idRestaurant, idHappyHour) => {
    var promise = new Promise((resolve, reject) => {
      fetch(
        `${SERVER_URL}/restaurants/${idRestaurant}/happy-hours/${idHappyHour}`,
        {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => {
        resolve(res.json())
      })
    })
    return promise
  }

  removeItem = (idRestaurant, idHappyHour, idItem) => {
    var promise = new Promise((resolve, reject) => {
      fetch(
        `${SERVER_URL}/restaurants/${idRestaurant}/happy-hours/${idHappyHour}/${idItem}`,
        {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => {
        resolve(res.json())
      })
    })
    return promise
  }

  addRestaurant = (restaurant) => {
    var promise = new Promise((resolve, reject) => {
      fetch(`${SERVER_URL}/restaurants/`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restaurant),
      }).then((res) => {
        resolve(res.json())
      })
    })
    return promise
  }

  addItem = (restaurantId, happyHourId, item) => {
    var promise = new Promise((resolve, reject) => {
      fetch(
        `${SERVER_URL}/restaurants/${restaurantId}/happy-hours/${happyHourId}/item/`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        }
      ).then((res) => {
        resolve(res.json())
      })
    })
    return promise
  }

  editRestaurant = (id, restaurant) => {
    var promise = new Promise((resolve, reject) => {
      fetch(`${SERVER_URL}/restaurants/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restaurant),
      }).then((res) => {
        resolve(res.json())
      })
    })
    return promise
  }

  editItem = (restaurantId, happyHourId, itemId, item) => {
    var promise = new Promise((resolve, reject) => {
      fetch(
        `${SERVER_URL}/restaurants/${restaurantId}/happy-hours/${happyHourId}/${itemId}`,
        {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        }
      ).then((res) => {
        resolve(res.json())
      })
    })
    return promise
  }
}
