import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        value: []
    },
    reducers: {
        addTOCart(state, action) {
            const { product, quantity} = action.payload;
            const existingItem = state.value?.find(({ product : prod}) => prod.id === product.id);
            if(existingItem) {
                existingItem.quantity += 1;
            }
            else{
                state.value.push(action.payload);    
            }
        },
        removeFromCart(state, action) {
            const { product } = action.payload;
            const index = state.value.findIndex(({ product : prod}) => prod.id === product.id);
            if (index > -1) {
                const existingItem = state.value[index];
                if(existingItem.quantity === 1){
                    state.value.splice(index, 1);
                }
                else {
                    existingItem.quantity -= 1;
                }
            }
        },
        removeItemFromCart(state, action) {
            const { product } = action.payload;
            const index = state.value.findIndex(({ product : prod}) => prod.id === product.id);
            if (index > -1) {
                state.value.splice(index,1);
            }
        },
        clearCart(state){
            state.value = [];
        }
    }
})

export const { addTOCart, removeFromCart, clearCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;