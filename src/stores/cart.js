import { createStore } from '@harlem/core';

const BASE_STATE = {
  cartName: 'Black Friday Cart',
  shop: [],
  items: []
};

export const {
  state,
  getter,
  mutation,
  ...store
} = createStore('cart', BASE_STATE, {});

export const cartItems = getter('cartItems', state => {
  return state.items
});

export const availableItems = getter('availableItems', state => {
  return state.shop.filter(item => item.isAvailable);
})

export const addToCart = mutation('addToCart', (state, payload) => {
  state.items.push(payload)
})

export const removeFromCart = mutation('removeFromCart', (state, payload) => {
  state.items = state.items.filter(x => x !== payload)
})

export const clearCart = mutation('clearCart', state => {
  state.items = []
})

export const populateStore = mutation('populateCart', (state, payload) => {
  state.shop = payload;
})
