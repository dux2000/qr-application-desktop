import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {UserInterface} from "../../interface/Interfaces";

const initialState: UserInterface = {
    id: 0,
    username: "",
    fullName: "",
    error: "",
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginSuccessAction: (state: any, action: PayloadAction<UserInterface>) => {
            const { id, username, fullName } =
                action.payload;
            state.id = id;
            state.username = username;
            state.fullName = fullName;
            state.isLoggedIn = true;
            console.log(state)
        },
        loginFailedAction: (state: any, action: PayloadAction<any>) => {
            state.error = action.payload.response.data.message;
            state.isLoggedIn = false;
        },
        signOutAction: (state: any) => {
            localStorage.removeItem("plmLoginInfo");
            return initialState;
        },
        registerSuccessAction: (
            state: any,
            action: PayloadAction<UserInterface>
        ) => {
            const { id, username, fullName } =
                action.payload;

            state.id = id;
            state.username = username;
            state.fullName = fullName;
            state.error = "";
            state.isLoggedIn = false;
        },
        registerFailedAction: (state: any, action: PayloadAction<any>) => {
            state.error = action.payload.response.data.message;
            state.isLoggedIn = false;
        },
        changePasswordSuccessAction: (
            state: any,
            action: PayloadAction<UserInterface>
        ) => {
            state.system = action.payload;
            state.error = "";
        },
        changePasswordFailedAction: (state: any, action: PayloadAction<any>) => {
            state.error = action.payload.response.data.message;
        },
        clearMessageError: (state: any) => {
            state.error = "";
        },
    },
});

export const {
    loginSuccessAction,
    loginFailedAction,
    signOutAction,
    registerSuccessAction,
    registerFailedAction,
    changePasswordSuccessAction,
    changePasswordFailedAction,
    clearMessageError,
} = userSlice.actions;

export default userSlice.reducer;
