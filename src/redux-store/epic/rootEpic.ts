import {combineEpics} from "redux-observable";
import { UserEpic } from "./UserEpic";
import {TabOverviewEpic} from "./TabOverviewEpic";

export const rootEpic = combineEpics(
    UserEpic,
    TabOverviewEpic
);