import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  itemCount: 0,
  totalPrice: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state, action) {
      console.log(action);
      state.itemCount = action.payload.itemCount;
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
    },
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      //console.log(newItem)
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        ++existingItem.quantity;
        existingItem.totalPrice += newItem.price;
      }
      ++state.itemCount;
      state.totalPrice += newItem.price;
      state.changed = true;
      //console.log(state.items[0])
    },
    removeItem(state, action) {
      //console.log(action.payload)
      //console.log(state.items[0])
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        --existingItem.quantity;
        existingItem.totalPrice -= existingItem.price;
      }
      --state.itemCount;
      state.totalPrice -= existingItem.price;
      state.changed = true;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
