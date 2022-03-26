import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { renderSettingsCreator } from "../../store";
import { animateSelector, fpsSelector, pixelSizeSelector } from "../../store/selectors/renderSelector";

export const RenderSetting = () => {

    const dispatch = useDispatch();

    const animate = useSelector(animateSelector);
    const fps = useSelector(fpsSelector);
    const pixelSize = useSelector(pixelSizeSelector);

    const { updateRenderSettingAnimate, updateRenderSettingsFps, updateRenderSettingPixelSize } = bindActionCreators(
        renderSettingsCreator,
        dispatch
    );

    return (
        <div>
            <label className="settingsLabel">
                animate:
            </label>
            <input
                type="checkbox"
                checked={animate}
                onChange={() => updateRenderSettingAnimate(!animate)}
            />
            <br />
            <label className="settingsLabel">fps:</label>
            <input
                className="settingsInput"
                type="number"
                defaultValue={fps}
                min={1}
                max={60}
                onChange={({ target: { value } }) => { updateRenderSettingsFps(parseInt(value)) }}
            />
            <br />
            <label className="settingsLabel">
                pixelSize:
            </label>
            <input
                className="settingsInput"
                type="number"
                defaultValue={pixelSize}
                min={1}
                max={20}
                onChange={({ target: { value } }) => { updateRenderSettingPixelSize(parseInt(value)) }}
            />
        </div>
    )
}