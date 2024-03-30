import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    value: "1",
};

const tabOverviewSlice = createSlice({
    name: "tabOverview",
    initialState,
    reducers: {
        changeTabValue: (state: any, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    },
});

export const {
    changeTabValue
} = tabOverviewSlice.actions;

export default tabOverviewSlice.reducer;
