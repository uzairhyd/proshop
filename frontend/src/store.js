import {configureStore} from '@reduxjs/toolkit';

import { productListReducer } from './reducers/productReducers';

const store = configureStore({
  reducer: {
    // Add your reducers here
    productList: productListReducer, // Product list reducer
  },
    preloadedState: {}, // Initial state can be set here if needed
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for non-serializable data
    }),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
});

export default store;