import { State } from "../../types/storeType";

export const planetSelector = (state: State) => state.planet;

export const radiusSelector = (state: State): number => planetSelector(state).radius;