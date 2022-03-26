import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Renderer } from "../../Logic/renderer/Renderer";
import { planetActionCreators } from "../../store";
import { radiusSelector, seedSelector } from "../../store/selectors/planetSelector";

export const PlanetSettingsTemplate = () => {

    const dispatch = useDispatch();

    const radius = useSelector(radiusSelector);
    const seed = useSelector(seedSelector);

    const { updatePlanetRadius, updateSeed } = bindActionCreators(
        planetActionCreators,
        dispatch
    )

    return (
        <div>
            <label className="settingsLabel">
                radius:
            </label>
            <input
                className="settingsInput"
                type="number"
                min={4}
                max={64}
                defaultValue={radius}
                onChange={
                    ({ target: { value } }) => updatePlanetRadius(parseInt(value))
                }
            />
            <br />
            <label className="settingsLabel">
                seed:
            </label>
            <input
                className="settingsInput"
                type="text"
                value={seed}
                onChange={({ target: { value } }) => updateSeed(value)}
            />
            <button
                className="settingsButton"
                onClick={() => updateSeed(nanoid())}>
                New Seed
            </button>
            <button
                className="settingsButton"
                onClick={() => { Renderer.downloadPlanetImg(); }}
            >
                Download frame
            </button>
            <button
                className="settingsButton"
                onClick={() => { Renderer.downloadPlanetAnimation(); }}
            >
                Download Animation
            </button>
        </div>
    )
}