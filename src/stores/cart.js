import { createStore } from '@harlem/core';
import actionExtension from '@harlem/extension-action';
import storageExtension from '@harlem/extension-storage';

const BASE_STATE = {
  cartName: 'Black Friday Cart',
  shop: [],
  items: []
};

export const {
  state,
  getter,
  mutation,
  action,
  ...store
} = createStore('cart', BASE_STATE, {
  extensions: [
    actionExtension(),
    storageExtension({
      type: 'local',
      prefix: 'marketplace',
      sync: true,
      exclude: [],
      serialiser: state => JSON.stringify(state),
      parser: value => JSON.parse(value)
    })
  ]
});

export const cartItems = getter('cartItems', state => {
  return state.items
});

export const setCartName = mutation('setCartName', (state, payload) => {
  state.cartName = payload
})

export const availableItems = getter('availableItems', state => {
  return state.shop.filter(item => item.isAvailable);
})

export const addToCart = mutation('addToCart', (state, payload) => {
  state.items.push(payload)
  state.shop = state.shop.map(item => {
    if (item.id === payload.id) {
      item.isAvailable = false
    }
    return item
  })
})

export const removeFromCart = mutation('removeFromCart', (state, payload) => {
  state.items = state.items.filter(x => x !== payload)
  state.shop = state.shop.map(item => {
    if (item.id === payload.id) {
      item.isAvailable = true
    }
    return item
  })
})

export const clearCart = mutation('clearCart', state => {
  state.items = []
  state.shop = state.shop.map(item => ({ ...item, isAvailable: true }))
})

export const populateStore = mutation('populateCart', (state, payload) => {
  state.shop = payload;
})

export const fetchStoreData = action('fetchStoreData', async () => {
  const data = await fetch('https://fakestoreapi.com/products').then(res => res.json())
  const items = data.map(({ id, title, price, description, image }) => ({ id, title, price, description, image, isAvailable: true }))
  populateStore(items)
})
