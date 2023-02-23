import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import modalReducer from './features/modal/modalSlice';

export const store = configureStore({
  /**Configure store ile app wide state tanımlayıp
   * ilgili slice'ları reducer objesi ile ekliyoruz
  */

  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
});
