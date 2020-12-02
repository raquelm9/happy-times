export function todaysHappyHour(restaurant) {
    if (!restaurant.id) return

    const happyHours = restaurant.happyHours

    //Getting current day of the week
    var day = new Date()
    var dayofWeek = day.getDay()

    //time for today's happyhour
    var happyHourFound

    for (var i = 0; i < happyHours.length; i++) {
        var currentHappyHour = happyHours[i]

        var happyHourDays = currentHappyHour.openDays.days

        for (var j = 0; j < happyHourDays.length; j++) {
            var happyHourDay = happyHourDays[j]

            if (dayofWeek === happyHourDay) {
                happyHourFound = currentHappyHour
                break
            }
        }
    }

    return happyHourFound
}

export function timeHappyHour(restaurant) {
    if (!restaurant.id) {
        return ''
    }
    const happyHour = todaysHappyHour(restaurant)

    if (!happyHour) {
        return 'No Happy Hours Today'
    } else {
        return happyHour.startTime + ' - ' + happyHour.endTime
    }
}

export function itemsByCategory(items) {
    if (items.length === 0) {
        return { food: [], drink: [] }
    }

    return {
        food: items.filter((item) => item.category === 'food'),
        drink: items.filter((item) => item.category === 'drink'),
    }
}
