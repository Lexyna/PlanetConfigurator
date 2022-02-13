import { planetActionType } from "../action-types/planetActionType";


export interface UpdateRadiusAction {
    type: planetActionType.UPDATE_RADIUS,
    payload: number
}