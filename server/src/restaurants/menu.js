import { MenuItem } from "./menu_item.js";

export class Menu {
  constructor(menuItems) {
    if (menuItems) {
      this.items = menuItems;
    } else {
      this.items = [];
    }
  }

  static from(doc) {
    const items = doc.items.map((item) => MenuItem.from(item));
    return new Menu(items);
  }

  registerItem(menuItem) {
    this.items.push(menuItem);
  }
}
