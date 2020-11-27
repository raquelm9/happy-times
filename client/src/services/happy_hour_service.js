export class HappyHourService {
    static createHappyHour(restaurantId, happyHour) {
        const url = `http://localhost:3001/restaurants/${restaurantId}/happy-hours`

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
}
