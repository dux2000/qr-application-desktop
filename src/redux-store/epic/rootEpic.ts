import {combineEpics} from "redux-observable";
import { UserEpic } from "./UserEpic";

export const rootEpic = combineEpics(
    UserEpic
);