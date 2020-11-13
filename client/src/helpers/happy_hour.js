export function todaysHappyHour(restaurant) {
  const happyHours = restaurant.happyHours;

  //Getting current day of the week
  var day = new Date();
  var dayofWeek = day.getDay();

  //time for today's happyhour
  var happyHourFound;

  for (var i = 0; i < happyHours.length; i++) {
    var currentHappyHour = happyHours[i];

    var happyHourDays = currentHappyHour.openDays.days;

    for (var j = 0; j < happyHourDays.length; j++) {
      var happyHourDay = happyHourDays[j];

      if (dayofWeek === happyHourDay) {
        happyHourFound = currentHappyHour;
        break;
      }
    }
  }

  return happyHourFound;
}
