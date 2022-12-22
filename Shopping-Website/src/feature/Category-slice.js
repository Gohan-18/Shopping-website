import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllCategories = createAsyncThunk('categories/fetchAll', async () => {
    const data = await fetch('https://dummyjson.com/products/categories');
    const result = await data.json();
    console.log(result);
    return result;
})

const category = createSlice({
    name:'categories',
    initialState: {
        value: [],
        loading: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCategories.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
            state.value = action.payload;
            state.loading = false;
        })
    }
})

export default category.reducer;