import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './feature/Cart-slice';
import productReducer from './feature/Product-slice';
import categoriesReducer from './feature/Category-slice';
import checkoutReducer from './feature/Checkout-slice';
import wishlistReducer from './feature/Wishlist-slice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productReducer,
        categories: categoriesReducer,
        checkout: checkoutReducer,
        wishlist: wishlistReducer
    }
})

export default store;