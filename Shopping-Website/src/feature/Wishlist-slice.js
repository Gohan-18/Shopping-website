import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        list: []
    },
    reducers: {
        addToWishlist(state, action) {
            const { product} = action.payload;
            const existingItem = state.list?.find(({ product : prod}) => prod.id === product.id);
            if(existingItem) {
                return;
            }
            else{
                state.list.push(action.payload);    
            }
        },
        removeFromWishlist(state, action) {
            const { product } = action.payload;
            const index = state.list.findIndex(({ product : prod}) => prod.id === product.id);
            if (index > -1) {
                state.list.splice(index,1);
            }
        }
    }
})

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;