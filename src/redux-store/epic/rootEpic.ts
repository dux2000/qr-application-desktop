import {combineEpics} from "redux-observable";
import { UserEpic } from "./UserEpic";
import {TabOverviewEpic} from "./TabOverviewEpic";
import {CommonEpic} from "./CommonEpic";

export const rootEpic = combineEpics(
    UserEpic,
    TabOverviewEpic,
    CommonEpic
);