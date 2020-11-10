export class OpenDays {
  static weekDays = {
    MON: 0,
    TUE: 1,
    WED: 2,
    THU: 3,
    FRI: 4,
    SAT: 5,
    SUN: 6,
  };

  constructor(days) {
    this.setOpenDays(days);
  }

  setOpenDays(days) {
    if (!days) {
      throw "Open Day is required";
    } else {
      this.days = days;
    }
  }
}
