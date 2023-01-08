import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        address: {},
        payment: {},
        allData: []
    },
    reducers: {
        updateAddress(state, action) {
            const { payload } = action;
            state.address = { ...state.address, ...payload};
        },
        updatePayment(state, action) {
            const { payload } = action;
            state.payment = { ...state.payment, ...payload};
        },
        clearAddress(state){
            state.address = {},
            state.payment = {}
        },
        saveDetails(state, action) {
            const {payload} = action;
            state.allData = {...state.fullAddress, ...payload};
            state.allData = {...state.cart, ...payload};
        }
    }
})

export const { updateAddress, updatePayment , clearAddress, saveDetails} = checkoutSlice.actions;
export default checkoutSlice.reducer;