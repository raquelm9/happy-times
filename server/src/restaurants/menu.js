import { MenuItem } from "./menu_item.js";
import last from "lodash/last.js";

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

  allItems() {
    return this.items;
  }

  registerItem(menuItem) {
    this.items.push(menuItem);
  }

  findMenuItemForId(itemId) {
    return this.items.find((each) => each.id.toString() === itemId);
  }

  lastItem() {
    return last(this.items);
  }
}
