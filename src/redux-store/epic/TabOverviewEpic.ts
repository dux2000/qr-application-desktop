import { ofType } from "redux-observable"
import { mergeMap, of } from "rxjs"
import {changeTabValue} from '../reducer/tabOverviewSlice'
const CHANGE_VALUE = 'CHANGE_VALUE';

export const TabOverviewEpic = (action$: any, state$: any) => {
    return action$.pipe(
        ofType(CHANGE_VALUE),
        mergeMap((action: any) => {
                if(action.type === CHANGE_VALUE) {
                    return of(changeTabValue(action.payload))
                }
                return of({ type: 'IGNORE_ACTION' });
            }
        )
    )
}