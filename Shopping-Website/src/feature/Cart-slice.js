import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        value: []
    },
    reducers: {
        addTOCart(state, action) {
            state.value.push(action.payload);
        }
    }
})

console.log(cartSlice);

export const { addTOCart } = cartSlice.actions;
export default cartSlice.reducer;