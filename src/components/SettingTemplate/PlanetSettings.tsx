import { nanoid } from "nanoid";
import { BsArrowRepeat } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Renderer } from "../../Logic/renderer/Renderer";
import { planetActionCreators } from "../../store";
import { radiusSelector, seedSelector, sim3DTerrainSelector } from "../../store/selectors/planetSelector";

export const PlanetSettingsTemplate = () => {

    const dispatch = useDispatch();

    const radius = useSelector(radiusSelector);
    const seed = useSelector(seedSelector);
    const sim3D = useSelector(sim3DTerrainSelector);

    const { updatePlanetRadius, updateSeed, updateTerrain } = bindActionCreators(
        planetActionCreators,
        dispatch
    )

    return (
        <div>
            <div className="flex">
                <div className="w-full mr-1">
                    <label className="settingsLabel">
                        seed:
                    </label>
                    <input
                        className="settingsInput"
                        type="text"
                        value={seed}
                        onChange={({ target: { value } }) => updateSeed(value)}
                    />
                </div>

                <div className="pt-6">
                    <button
                        className="settingsButton text-black group"
                        onClick={() => updateSeed(nanoid())}>
                        <BsArrowRepeat size="20" className="group-hover:animate-spin" />
                    </button>
                </div>
            </div>

            <label className="settingsLabel">
                radius:
            </label>
            <input
                className="settingsInput"
                type="number"
                min={4}
                max={64}
                defaultValue={radius}
                disabled={sim3D}
                onChange={
                    ({ target: { value } }) => updatePlanetRadius(parseInt(value))
                }
            />

            <label className="settingsLabel">3D: </label>
            <input
                type="checkbox"
                checked={sim3D}
                onChange={() => updateTerrain(!sim3D)}
            />

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