import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { openModal } from '../modal/modalSlice';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',//action name
  async (name, thunkAPI) => {
    /**bu yukardaki fonksiyon harbi acayip, 
     * 
     * name: getCartItems fonksiyonuna gönderilen payload
     * thunkAPI: bütün state'e karşılık gelir. Bu bir obje ve burada
     * yazmayan birçok property'si daha var
     *   
     */

    try {
      // console.log(name);
      // console.log(thunkAPI);

      //bu ikisi gösteriyor ki, thunkAPI ile bütün state'e buradan erişebilirsin
      // console.log(thunkAPI.getState()); 
      // thunkAPI.dispatch(openModal());
      const resp = await axios(url);

      /**resp.data aşşağıdaki getCartItems.fulfilled kısmına gönderilen "action" parametresidir*/
      return resp.data;

    } catch (error) {
      //getCartItems.rejected'e gönderilen action
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,//initial state slice içine konulur

  /**State'i güncelleyen fonksiyonlar reducerlardır ve obje içinde aşşağıdaki gibi yazılırlar
   * 
   * state: slice'ın anlık durumu
   * action: dispatch fonksiyonuna gönderilen parametredir
   * 
   * action.payload ile dispatch'ten gönderilen verilere ulaşılır
   */
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: (builder) => {//async thunk, extraReducer içine eklenir
    builder
      .addCase(getCartItems.pending, (state) => {//loading
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {//success
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {//error
        console.log(action);
        state.isLoading = false;
      });
  },
});

//Gerekli veriler export edilir
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
