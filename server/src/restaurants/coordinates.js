export class Coordinates {
  constructor(latitude, longitude) {
    this.setLatitude(latitude);
    this.setLongitude(longitude);
  }

  static from(document) {
    return new Coordinates(document.latitude, document.longitude);
  }

  setLatitude(latitude) {
    if (!latitude) {
      throw "Coordinates require latitude";
    } else if (isNaN(latitude)) {
      throw "Latitud must be a number";
    } else {
      this.latitude = latitude;
    }
  }

  setLongitude(longitude) {
    if (!longitude) {
      throw "Coordinates require longitude";
    } else if (isNaN(longitude)) {
      throw "Longitude must be a number";
    } else {
      this.longitude = longitude;
    }
  }
}
