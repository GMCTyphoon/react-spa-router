import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from './cartTypes';

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity; 
      } else {
        state.items.push(newItem); 
      }

      state.totalAmount += newItem.price * newItem.quantity; 
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalAmount -= existingItem.price * existingItem.quantity; 
        state.items = state.items.filter((item) => item.id !== id); 
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalAmount -= existingItem.price * existingItem.quantity; 
        existingItem.quantity = quantity; 
        state.totalAmount += existingItem.price * existingItem.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;