import { observe, Observer } from "redux-observers";
import { State } from "../../types/storeType";
import { store } from "../store";
import { colorMappingsObserver, planetRadiusObserver, planetSeedObserver } from "./planetObserver";
import { animateObserver } from "./renderSettingsObserver";

export const observers: Observer<State>[] = [
    planetRadiusObserver,
    planetSeedObserver,
    colorMappingsObserver,
    animateObserver
]

export const initObservers = () => {
    observe(store, observers);
}