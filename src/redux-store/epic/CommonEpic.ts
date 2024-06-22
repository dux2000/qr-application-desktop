import { ofType } from "redux-observable"
import { from, map, mergeMap, of } from "rxjs"
import api from "../../service/api"
import { saveCommonData } from "../reducer/commonSlice"

const GET_COMMON_DATA = 'GET_COMMON_DATA';

export const CommonEpic = (action$: any, state$: any) => {
    return action$.pipe(
        ofType(GET_COMMON_DATA),
        mergeMap((action: any) => {
                if(action.type === GET_COMMON_DATA) {
                    return from(
                        api.common.getCommonData()
                    ).pipe(
                        map((response: any) => {
                            if (response) {
                                return saveCommonData(response);
                            }
                        })
                    )
                }
                return of({ type: 'IGNORE_ACTION' });
            }
        )
    )
}