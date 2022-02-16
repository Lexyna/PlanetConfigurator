import { RenderProps } from "../../types/storeType";
import { renderActionType } from "../action-types/renderActionType";
import { updateAnimate } from "./functions/renderReducerFunctions";
import reducerFactory, { IHandler } from "./reducerFactory";

const initialState: RenderProps = {
    animate: true,
    fps: 30,
    pixelSize: 5
}

const handlers: IHandler = {};

handlers[renderActionType.UPDATE_ANIMATE] = updateAnimate;

const renderReducers = reducerFactory(initialState, handlers);

export default renderReducers;