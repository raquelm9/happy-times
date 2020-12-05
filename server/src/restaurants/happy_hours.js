export class HappyHour {
  constructor(id, openDays, startTime, endTime, menu) {
    this.id = id;
    this.setOpenDays(openDays);
    this.setStartTime(startTime);
    this.setEndTime(endTime);
    this.setMenu(menu);
  }

  setOpenDays(openDays) {
    if (!openDays) {
      throw "Happy hour requires open days";
    } else {
      this.openDays = openDays;
    }
  }

  setStartTime(startTime) {
    if (!startTime) {
      throw "Start Time is required";
    } else {
      this.startTime = startTime;
    }
  }

  setEndTime(endTime) {
    if (!endTime) {
      throw "End Time is required";
    } else {
      this.endTime = endTime;
    }
  }

  setMenu(menu) {
    if (!menu) {
      throw "Menu is required";
    } else {
      this.menu = menu;
    }
  }
}
