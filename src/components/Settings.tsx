import { nanoid } from "nanoid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { planetActionCreators, renderSettingsCreator } from "../store";
import { radiusSelector, seedSelector } from "../store/selectors/planetSelector";
import { animateSelector } from "../store/selectors/renderSelector";
import { Colorator } from "./Colorator";

export const Setting = () => {

    const dispatch = useDispatch();

    const radius = useSelector(radiusSelector);
    const animate = useSelector(animateSelector);
    const seed = useSelector(seedSelector);

    const { updatePlanetRadius, updateSeed } = bindActionCreators(
        planetActionCreators,
        dispatch
    );

    const { updateRenderSettingAnimate } = bindActionCreators(
        renderSettingsCreator,
        dispatch
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
            <br />
            <label>
                seed:
            </label>
            <input
                type="text"
                value={seed}
                onChange={({ target: { value } }) => { updateSeed(value) }}
            />
            <button onClick={() => updateSeed(nanoid())}>Generate</button>
            <br />
            < Colorator />
            <br />
            <label>
                animate:
                <input
                    type="checkbox"
                    defaultChecked={animate}
                    onChange={() => updateRenderSettingAnimate(!animate)}
                />
            </label>
        </div>
    )

} 