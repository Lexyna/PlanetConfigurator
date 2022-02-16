import { observe } from "redux-observers";
import { store } from "../store";
import { planetRadiusObserver } from "./planetObserver";
import { animateObserver } from "./renderSettingsObserver";

export const initObservers = () => {
    observe(store,
        [
            planetRadiusObserver,
            animateObserver
        ]);
}