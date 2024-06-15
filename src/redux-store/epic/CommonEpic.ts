import { ofType } from "redux-observable"
import { from, map, mergeMap, of } from "rxjs"
import api from "../../service/api"
import { saveProductTypes } from "../reducer/commonSlice"

const GET_PRODUCT_TYPES = 'GET_PRODUCT_TYPES';

export const CommonEpic = (action$: any, state$: any) => {
    return action$.pipe(
        ofType(GET_PRODUCT_TYPES),
        mergeMap((action: any) => {
                if(action.type === GET_PRODUCT_TYPES) {
                    return from(
                        api.products.getTypes()
                    ).pipe(
                        map((response: any) => {
                            if (response) {
                                return saveProductTypes(response);
                            }
                        })
                    )
                }
                return of({ type: 'IGNORE_ACTION' });
            }
        )
    )
}