import { observe } from "redux-observers";
import { store } from "../store";
import { planetRadiusObserver } from "./planetObserver";

export const initObservers = () => {
    observe(store,
        [
            planetRadiusObserver
        ]);
}