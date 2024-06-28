import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {UserDto, UserInterface} from "../../interface/Interfaces";
import tokenManager from "../../service/token";

const initialState: UserInterface = {
    id: 0,
    username: "",
    fullName: "",
    error: "",
    isLoggedIn: false,
    update: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginSuccessAction: (state: any, action: PayloadAction<UserDto>) => {
            const { id, username, fullName, update } =
                action.payload;
            state.id = id;
            state.username = username;
            state.fullName = fullName;
            state.isLoggedIn = true;
            state.update = update;
        },
        loginFailedAction: (state: any, action: PayloadAction<any>) => {
            state.error = action.payload.response.data.message;
            state.isLoggedIn = false;
        },
        signOutAction: (state: any) => {
            localStorage.removeItem("plmLoginInfo");
            tokenManager.removeToken()
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
            action: PayloadAction<UserDto>
        ) => {
            console.log("Change Password Success")
            state.update = action.payload.update;
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
