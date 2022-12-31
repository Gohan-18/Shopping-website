import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk('products/fetchAll', async() => {
    const data = await fetch('https://dummyjson.com/products?limit=8');
    const result = await data.json();
    return result.products;
})

const productSlice = createSlice({
    name:'products',
    initialState: {
        value: [],
        loading: false
    },
    extraReducers:(builder) => {
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.value = action.payload;
            state.loading = false;
        });
    }
})

export default productSlice.reducer;