import userSlice from "./userSlice";
import tabOverviewSlice from "./tabOverviewSlice";
import commonSlice from "./commonSlice";

const rootReducer = () => {
    return {
        user: userSlice,
        tabOverview: tabOverviewSlice,
        common: commonSlice
    }
}

export default rootReducer;