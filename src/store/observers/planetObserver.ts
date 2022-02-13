import { observer } from "redux-observers";
import { updatePlanet } from "../../Logic/planet/planet";
import { radiusSelector } from "../selectors/planetSelector";

export const planetRadiusObserver = observer(
    radiusSelector,
    (dispatch, current, previous) => {
        updatePlanet();
    }
)