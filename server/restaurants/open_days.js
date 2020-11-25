export class OpenDays {
  static weekDays = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
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
