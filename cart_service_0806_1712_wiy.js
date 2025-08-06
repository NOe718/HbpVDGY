// 代码生成时间: 2025-08-06 17:12:22
class CartService {
  // Initialize cart items
  constructor() {
    this.cartItems = [];
  }

  /**
   * Adds an item to the cart.
   *
   * @param {Object} item - The item to add to the cart.
   * @param {String} item.id - Unique identifier for the item.
   * @param {String} item.name - Name of the item.
   * @param {Number} item.price - Price of the item.
   * @param {Number} item.quantity - Quantity of the item to add.
   */
  addItemToCart(item) {
    if (!item.id || !item.name || !item.price || typeof item.quantity !== 'number') {
      throw new Error('Invalid item object provided');
    }

    const existingItem = this.cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push({
        ...item,
        quantity: item.quantity
      });
    }
  }

  /**
   * Removes an item from the cart.
   *
   * @param {String} id - The ID of the item to remove.
   */
  removeItemFromCart(id) {
    this.cartItems = this.cartItems.filter((item) => item.id !== id);
  }

  /**
   * Updates the quantity of an item in the cart.
   *
   * @param {String} id - The ID of the item to update.
   * @param {Number} quantity - The new quantity of the item.
   */
  updateItemQuantity(id, quantity) {
    if (typeof quantity !== 'number' || quantity < 0) {
      throw new Error('Invalid quantity provided');
    }

    const item = this.cartItems.find((cartItem) => cartItem.id === id);
    if (item) {
      item.quantity = quantity;
    } else {
      throw new Error('Item not found in cart');
    }
  }

  /**
   * Clears the entire cart.
   */
  clearCart() {
    this.cartItems = [];
  }

  /**
   * Retrieves the cart items.
   *
   * @returns {Array} - List of cart items.
   */
  getCartItems() {
    return this.cartItems;
  }
}

// Example usage:
// const cartService = new CartService();
// cartService.addItemToCart({ id: '1', name: 'Apple', price: 1.99, quantity: 2 });
// cartService.addItemToCart({ id: '2', name: 'Banana', price: 0.99, quantity: 3 });
// console.log(cartService.getCartItems());
// cartService.removeItemFromCart('1');
// console.log(cartService.getCartItems());
