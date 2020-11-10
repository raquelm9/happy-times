export class Menu {
  constructor(menuItems) {
    if (menuItems) {
      this.items = menuItems;
    } else {
      this.items = [];
    }
  }

  registerItem(menuItem) {
    this.items.push(menuItem);
  }
}
