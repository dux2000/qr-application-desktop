import userSlice from "./userSlice";
import tabOverviewSlice from "./tabOverviewSlice";

const rootReducer = () => {
    return {
        user: userSlice,
        tabOverview: tabOverviewSlice
    }
}

export default rootReducer;