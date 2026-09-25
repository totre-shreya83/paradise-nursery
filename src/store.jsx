import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './components/CartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});