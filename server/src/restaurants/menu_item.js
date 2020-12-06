export class MenuItem {
  constructor(id, name, description, price, category) {
    this.id = id;
    this._id = id;
    this.setName(name);
    this.setDescription(description);
    this.setPrice(price);
    this.setCategory(category);
  }

  static from(document) {
    return new MenuItem(
      (document._id || document.id).toString(),
      document.name,
      document.description,
      document.price,
      document.category
    );
  }

  setName(name) {
    if (!name) {
      throw "Menu item requires name";
    } else {
      this.name = name;
    }
  }

  setDescription(description) {
    if (!description) {
      throw "Menu item requires description";
    } else {
      this.description = description;
    }
  }

  setPrice(price) {
    if (!price) {
      throw "Menu item requires price";
    } else {
      this.price = price;
    }
  }

  setCategory(category) {
    if (!category) {
      throw "Menu item requires category";
    } else if (category !== "food" && category !== "drink") {
      throw "Menu item requires valid category, please select food or drink";
    } else {
      this.category = category;
    }
  }
}
