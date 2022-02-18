import { RenderProps } from "../../types/storeType";
import { renderActionType } from "../action-types/renderActionType";
import { updateAnimate, updateFps } from "./functions/renderReducerFunctions";
import reducerFactory, { IHandler } from "./reducerFactory";

const initialState: RenderProps = {
    animate: true,
    fps: 30,
    pixelSize: 5
}

const handlers: IHandler = {};

handlers[renderActionType.UPDATE_ANIMATE] = updateAnimate;
handlers[renderActionType.UPDATE_FPS] = updateFps;

const renderReducers = reducerFactory(initialState, handlers);

export default renderReducers;