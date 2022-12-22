import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './feature/Cart-slice';
import productReducer from './feature/Product-slice';
import categoriesReducer from './feature/Category-slice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productReducer,
        categories: categoriesReducer
    }
})

export default store;