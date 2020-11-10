export class Address {
  constructor(unit, street, postalCode, city, province) {
    this.setUnit(unit);
    this.setStreet(street);
    this.setPostalCode(postalCode);
    this.setCity(city);
    this.setProvince(province);
  }

  setUnit(unit) {
    if (!unit) {
      throw "Address requires unit";
    } else if (isNaN(unit)) {
      throw "Unit address must be a number";
    } else {
      this.unit = unit;
    }
  }

  setStreet(street) {
    if (!street) {
      throw "Address requires street";
    } else {
      this.street = street;
    }
  }

  setPostalCode(postalCode) {
    if (!postalCode) {
      throw "Address requires postal code";
    } else {
      this.postalCode = postalCode;
    }
  }

  setCity(city) {
    if (!city) {
      throw "Address requires city";
    } else {
      this.city = city;
    }
  }

  setProvince(province) {
    if (!province) {
      throw "Address requires province";
    } else {
      this.province = province;
    }
  }
}
