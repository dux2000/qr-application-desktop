import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProductTypeDto} from "../../interface/Interfaces";

const initialState = {
    productType : []
};

const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        saveProductTypes: (state: any, action: PayloadAction<ProductTypeDto[]>) => {
            const types = action.payload;
            types.forEach(type => {
                state.productType.push(type)
            })
        },
    },
});

export const {
    saveProductTypes
} = commonSlice.actions;

export default commonSlice.reducer;