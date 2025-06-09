import {configureStore} from '@reduxjs/toolkit';

import { 
        productListReducer,
        productDetailsReducer } from './reducers/productReducers';

import { cartReducer } from './reducers/cartReducers';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const store = configureStore({
  reducer: {
    // Add your reducers here
    productList: productListReducer,
    productDetails: productDetailsReducer, 
    cart: cartReducer, 
  },
    preloadedState: {
        cart: { cartItems: cartItemsFromStorage },
    }, // Initial state can be set here if needed
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for non-serializable data
    }),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
});

export default store;