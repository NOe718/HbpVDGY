// 代码生成时间: 2025-08-24 05:47:04
// Define the InventoryService to handle inventory operations
class InventoryService {
  constructor() {
    this.inventory = []; // Stores the inventory items
  }

  // Adds a new item to the inventory
  addInventoryItem(item) {
    if (!item.name || !item.quantity) {
      throw new Error('Item name and quantity are required');
    }
    this.inventory.push(item);
    console.log(`Item '${item.name}' added successfully with quantity ${item.quantity}`);
  }

  // Retrieves all items in the inventory
  getAllItems() {
    return this.inventory;
  }

  // Updates an existing item's quantity
  updateItemQuantity(itemId, newQuantity) {
    const itemIndex = this.inventory.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      throw new Error('Item not found');
    }
    if (newQuantity < 0) {
      throw new Error('Quantity cannot be negative');
    }
    this.inventory[itemIndex].quantity = newQuantity;
    console.log(`Item quantity updated successfully`);
  }

  // Removes an item from the inventory
  removeItem(itemId) {
    const initialLength = this.inventory.length;
    this.inventory = this.inventory.filter(item => item.id !== itemId);
    if (this.inventory.length === initialLength) {
      throw new Error('Item not found');
    }
    console.log(`Item removed successfully`);
  }
}

// Example usage of the InventoryService
const inventoryService = new InventoryService();
try {
  inventoryService.addInventoryItem({ id: 1, name: 'Apple', quantity: 10 });
  inventoryService.addInventoryItem({ id: 2, name: 'Banana', quantity: 5 });
  console.log(inventoryService.getAllItems());
  inventoryService.updateItemQuantity(1, 8);
  console.log(inventoryService.getAllItems());
  inventoryService.removeItem(2);
  console.log(inventoryService.getAllItems());
} catch (error) {
  console.error('An error occurred:', error.message);
}