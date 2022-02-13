import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { planetActionCreators } from "../store";
import { radiusSelector } from "../store/selectors/planetSelector";

export const Setting = () => {

    const dispatch = useDispatch();

    const radius = useSelector(radiusSelector);

    const { updatePlanetRadius } = bindActionCreators(
        planetActionCreators, dispatch
    );

    return (
        <div>
            <label>
                radius:
            </label>
            <input
                type="number"
                min={4}
                max={64}
                defaultValue={radius}
                onChange={
                    ({ target: { value } }) => updatePlanetRadius(parseInt(value))
                }
            />
        </div>
    )

} 