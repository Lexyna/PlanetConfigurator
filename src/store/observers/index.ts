import { observe, Observer } from "redux-observers";
import { State } from "../../types/storeType";
import { store } from "../store";
import { majorCloudObserver, minorCloudObserver } from "./cloudObserver";
import { colorMappingsObserver, planetAnimateObserver, planetRadiusObserver, planetSeedObserver } from "./planetObserver";
import { animateObserver, fpsObserver, pixelSizeObserver } from "./renderSettingsObserver";

/**
 * Observers watch the redux store and trigger if they notice a change to the previous state 
 * https://github.com/xuoe/redux-observers
 */
export const observers: Observer<State>[] = [
    planetRadiusObserver,
    planetSeedObserver,
    planetAnimateObserver,
    colorMappingsObserver,
    animateObserver,
    fpsObserver,
    pixelSizeObserver,
    minorCloudObserver,
    majorCloudObserver
]

export const initObservers = () => {
    observe(store, observers);
}