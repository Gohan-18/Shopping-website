import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk('products/fetchAll', async() => {
    const data = await fetch('https://dummyjson.com/products?limit=8');
    const result = await data.json();
    return result.products;
});

export const fetchSingleProduct = createAsyncThunk('products/fetchOne', async ({productid}) => {
    console.log(productid)
    const data = await fetch(`https://dummyjson.com/products/${productid}`)
    const result = await data.json();
    return result;
});

const productSlice = createSlice({
    name:'products',
    initialState: {
        value: [],
        singleValue: {},
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
        builder.addCase(fetchSingleProduct.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
            state.singleValue = action.payload;
            state.loading = false;
        })
    },
})

export default productSlice.reducer;