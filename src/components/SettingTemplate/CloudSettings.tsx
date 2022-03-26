import { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux";
import { createCloud } from "../../Logic/clouds/cloud";
import { cloudActionCreators } from "../../store";
import { cloudSelector, cloudsSelector } from "../../store/selectors/cloudSelector"
import { cover, popover } from "../css/planetColorPickerStyles";

export const CloudsSettings = () => {

    const clouds = useSelector(cloudsSelector);

    const dispatch = useDispatch();

    const { addCloud } = bindActionCreators(
        cloudActionCreators,
        dispatch
    )

    return (
        <div className="overflow-y-auto max-h-screen h-screen pb-10 scroll-px-10 no-scrollbar">
            {clouds.map(cloud => {
                return <CloudSettings id={cloud.id} key={cloud.id} />
            })}
            <button
                className="settingsButton"
                onClick={() => addCloud(createCloud())}
            >
                Add Cloud
            </button>
        </div>
    )
}

const CloudSettings: React.FC<{ id: string }> = (props) => {

    const cloud = useSelector(cloudSelector(props.id));

    const [display, setDisplay] = useState(false);

    const [color, setColor] = useState(cloud.color);

    const dispatch = useDispatch();

    const { removeCloud, updateCloud } = bindActionCreators(
        cloudActionCreators,
        dispatch
    )

    const onRemoveCloud = (id: string) => {
        removeCloud(id);
    }

    const onChangeColorMethod = (color: ColorResult) => {
        cloud.color = color.rgb;
        if (cloud.color.a)
            cloud.color.a = Math.floor(cloud.color.a * 255);
        updateCloud(cloud);
        setColor({ ...color.rgb })
    }

    const onCloseMethod = () => {
        setDisplay(false);
    }

    const onClickMethod = () => {
        setDisplay(!display);
    }

    const colorStyle = {
        width: "100%",
        height: "40px",
        background: `rgb(${cloud.color.r}, ${cloud.color.g}, ${cloud.color.b}, ${cloud.color.a})`,

    } as React.CSSProperties

    return (
        <div className="mt-4 bg-gray-300 rounded-xl p-2 relative">
            <label className="settingsLabel">Seed:</label>
            <input
                className="settingsInput"
                type="text"
                value={cloud.seed}
            />

            <label className="settingsLabel">Color:</label>
            <div onClick={onClickMethod}>
                <div style={colorStyle} className="rounded-xl"></div>
            </div>
            {display ? <div style={popover}>
                <div style={cover} onClick={onCloseMethod} />
                <SketchPicker color={color} onChange={onChangeColorMethod} />
            </div> : null}

            <label className="settingsLabel">Width</label>
            <input
                className="settingsInput"
                type="number"
                min={1}
                max={10}
                value={cloud.width}
            />

            <label className="settingsLabel">Height</label>
            <input
                className="settingsInput"
                type="number"
                min={1}
                max={10}
                value={cloud.height}
            />

            <label className="settingsLabel">Depth</label>
            <input
                className="settingsInput"
                type="number"
                min={1}
                max={10}
                value={cloud.depth}
            />

            <label className="settingsLabel">positionX</label>
            <input
                className="settingsInput"
                type="number"
                min={1}
                max={10}
                value={cloud.positionX}
            />

            <label className="settingsLabel">PositionY</label>
            <input
                className="settingsInput"
                type="number"
                min={1}
                max={10}
                value={cloud.positionY}
            />

            <label className="settingsLabel">StartFrame</label>
            <input
                className="settingsInput"
                type="number"
                min={1}
                max={10}
                value={cloud.startFrame}
            />

            <label className="settingsLabel">StartFrame</label>
            <input
                type="checkbox"
                checked={cloud.transition}
            />

            <br />
            <label className="settingsLabel">transitionFrames</label>
            <input
                className="settingsInput"
                type="number"
                min={1}
                max={10}
                value={cloud.transitionFrames}
            />

            <button
                className="settingsButton"
                onClick={() => onRemoveCloud(props.id)}
            >Remove Cloud</button>
        </div>
    )
}
