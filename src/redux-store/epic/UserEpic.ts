import { ofType } from "redux-observable"
import { catchError, from, map, mergeMap, of } from "rxjs"
import api from "../../service/api"
import { changePasswordFailedAction, changePasswordSuccessAction, clearMessageError, loginFailedAction, loginSuccessAction, registerFailedAction, registerSuccessAction, signOutAction } from "../reducer/userSlice"

const LOGIN_USER = 'LOGIN_USER';
const SIGN_OUT = 'SIGN_OUT';
const REGISTER = 'REGISTER';
const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
const CLEAR_ERROR = 'CLEAR_ERROR';

export const UserEpic = (action$: any, state$: any) => {
    return action$.pipe(
        ofType(LOGIN_USER, SIGN_OUT, REGISTER, CHANGE_PASSWORD, CLEAR_ERROR),
        mergeMap((action: any) => {
                if(action.type === LOGIN_USER) {
                    return from(
                        api.user.loginUser(action.payload.username, action.payload.password)
                    ).pipe(
                        map((response: any) => {
                            if (response) {
                                return loginSuccessAction(response);
                            }
                        }),
                        catchError((err) => {
                            return of(loginFailedAction(err));
                        })
                    )
                } else if(action.type === SIGN_OUT) {
                    return of(signOutAction());
                } else if(action.type === CLEAR_ERROR){
                    return of(clearMessageError());
                }
                return of({ type: 'IGNORE_ACTION' });
            }
        )
    )
}