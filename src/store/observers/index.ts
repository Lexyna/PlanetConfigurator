import { observe, Observer } from "redux-observers";
import { State } from "../../types/storeType";
import { store } from "../store";
import { cloudObserver } from "./cloudObserver";
import { colorMappingsObserver, planetRadiusObserver, planetSeedObserver } from "./planetObserver";
import { animateObserver, fpsObserver, pixelSizeObserver } from "./renderSettingsObserver";

/**
 * Observers watch the redux store and trigger if they notice a change to the previous state 
 * https://github.com/xuoe/redux-observers
 */
export const observers: Observer<State>[] = [
    planetRadiusObserver,
    planetSeedObserver,
    colorMappingsObserver,
    animateObserver,
    fpsObserver,
    pixelSizeObserver,
    cloudObserver,
]

export const initObservers = () => {
    observe(store, observers);
}