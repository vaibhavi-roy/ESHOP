import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

//if anything is in local storage, put in initial state even after refreshing
const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { cartItems: [] };


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        //action-data inside payload
        addToCart: (state, action) => {
            // The item to add to the cart
            const item = action.payload;

            // Check if the item is already in the cart
            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                // If exists, update quantity
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existItem._id ? item : x
                );
            } else {
                // If not exists, add new item to cartItems
                state.cartItems = [...state.cartItems, item];
            }

            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

            return updateCart(state);

        }
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;