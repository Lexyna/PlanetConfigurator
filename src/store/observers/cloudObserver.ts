import { observer } from "redux-observers";
import { updateClouds } from "../../Logic/clouds/cloud";
import { cloudsSelector } from "../selectors/cloudSelector";
import { compareClouds } from "./observerUtils";

export const cloudObserver = observer(
    cloudsSelector,
    (dispatch, current, previous) => {
        console.log("change detected")
        //updateClouds();
    },
    {
        equals: compareClouds
    }
)