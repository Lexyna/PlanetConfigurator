import { State } from "../../types/storeType";

export const renderSettingsSelector = (state: State) => state.renderSettings;

export const animateSelector = (state: State) => renderSettingsSelector(state).animate;