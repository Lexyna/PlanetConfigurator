import { observe, Observer } from "redux-observers";
import { State } from "../../types/storeType";
import { store } from "../store";
import { colorMappingsObserver, planetRadiusObserver, planetSeedObserver } from "./planetObserver";
import { animateObserver, fpsObserver, pixelSizeObserver } from "./renderSettingsObserver";

export const observers: Observer<State>[] = [
    planetRadiusObserver,
    planetSeedObserver,
    colorMappingsObserver,
    animateObserver,
    fpsObserver,
    pixelSizeObserver
]

export const initObservers = () => {
    observe(store, observers);
}