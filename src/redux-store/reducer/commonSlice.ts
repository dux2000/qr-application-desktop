import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CommonDataDto} from "../../interface/Interfaces";

const initialState: CommonDataDto = {
    productTypes : [],
    userTypes: []
};

const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        saveCommonData: (state: any, action: PayloadAction<CommonDataDto>) => {
            const data = action.payload;
            console.log(data);
            state.productTypes = data.productTypes;
            state.userTypes = data.userTypes;
        },
    },
});

export const {
    saveCommonData
} = commonSlice.actions;

export default commonSlice.reducer;