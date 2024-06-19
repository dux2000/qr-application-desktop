import { ofType } from "redux-observable"
import { catchError, from, map, mergeMap, of } from "rxjs"
import api from "../../service/api"
import { changePasswordFailedAction, changePasswordSuccessAction, clearMessageError, loginFailedAction, loginSuccessAction, registerFailedAction, registerSuccessAction, signOutAction } from "../reducer/userSlice"
import {saveProductTypes} from "../reducer/commonSlice";
import {UserDto, UserInterface} from "../../interface/Interfaces";

const LOGIN_USER = 'LOGIN_USER';
const SIGN_OUT = 'SIGN_OUT';
const REGISTER = 'REGISTER';
const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
const CLEAR_ERROR = 'CLEAR_ERROR';

export const UserEpic = (action$: any, state$: any) => {
    return action$.pipe(
        ofType(LOGIN_USER, SIGN_OUT, REGISTER, CHANGE_PASSWORD, CLEAR_ERROR),
        mergeMap((action: any) => {
            if (action.type === LOGIN_USER) {
                return from(
                    api.user.loginUser(action.payload.username, action.payload.password)
                ).pipe(
                    mergeMap((response) => {
                        if (response) {
                            return from(api.products.getTypes())
                                .pipe(
                                    mergeMap((productTypes) => [
                                        loginSuccessAction(response),
                                        saveProductTypes(productTypes)
                                    ]),
                                    catchError(err => of(loginFailedAction(err)))
                                )
                        } else {
                            return of(loginFailedAction(new Error("No response from login")));
                        }
                    }),
                    catchError((err) => {
                        return of(loginFailedAction(err));
                    })
                )
            } else if (action.type === SIGN_OUT) {
                return of(signOutAction());
            } else if (action.type === CLEAR_ERROR) {
                return of(clearMessageError());
            } else if (action.type === CHANGE_PASSWORD) {
                return from(api.user.changePassword(action.payload.id, action.payload.oldPassword, action.payload.newPassword))
                    .pipe(
                        map((response) => {
                            if (response) {
                                return changePasswordSuccessAction(response);
                            } else {
                                throw new Error("No response from change password");
                            }
                        }),
                        catchError((err) => {
                            return of(changePasswordFailedAction(err));
                        })
                    );
                }
                return of({ type: 'IGNORE_ACTION' });
            }
        )
    )
}