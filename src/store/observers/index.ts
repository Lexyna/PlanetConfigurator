import { observe, Observer } from "redux-observers";
import { State } from "../../types/storeType";
import { store } from "../store";
import { colorMappingsObserver, planetRadiusObserver } from "./planetObserver";
import { animateObserver } from "./renderSettingsObserver";

export const observers: Observer<State>[] = [
    planetRadiusObserver,
    colorMappingsObserver,
    animateObserver
]

export const initObservers = () => {
    observe(store, observers);
}