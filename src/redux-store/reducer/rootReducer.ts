import userSlice from "./userSlice";

const rootReducer = () => {
    return {
        user: userSlice
    }
}

export default rootReducer;