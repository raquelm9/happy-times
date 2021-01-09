const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001'

export class HappyHourService {
  static createHappyHour(restaurantId, happyHour) {
    const url = `${SERVER_URL}/restaurants/${restaurantId}/happy-hours`

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(happyHour),
      }).then((res) => {
        resolve(res.json())
      })
    })
  }

  static editHappyHour(restaurantId, happyHourId, happyHour) {
    const url = `${SERVER_URL}/restaurants/${restaurantId}/happy-hours/${happyHourId}`

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(happyHour),
      }).then((res) => {
        resolve(res.json())
      })
    })
  }
}
