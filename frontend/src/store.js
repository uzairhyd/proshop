import {configureStore} from '@reduxjs/toolkit';

import { 
        productListReducer,
        productDetailsReducer,
       } from './reducers/productReducers';

import { cartReducer } from './reducers/cartReducers';

import { userLoginReducer } from './reducers/userReducers'

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo') 
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const store = configureStore({
  reducer: {
    // Add your reducers here
    productList: productListReducer,
    productDetails: productDetailsReducer, 
    cart: cartReducer, 
    userLogin: userLoginReducer
  },
    preloadedState: {
        cart: { cartItems: cartItemsFromStorage },
        userLogin: { userInfo: userInfoFromStorage }
    }, // Initial state can be set here if needed
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for non-serializable data
    }),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
});

export default store;