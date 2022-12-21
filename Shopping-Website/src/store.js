import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './feature/Cart-slice'

const store = configureStore({
    reducer: {
        cart: cartReducer
    }
})

export default store;