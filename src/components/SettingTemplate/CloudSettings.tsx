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

    const onPositionXChanged = (positionX: number) => {
        cloud.positionX = positionX;
        updateCloud(cloud);
    }

    const onPositionYChanged = (positionY: number) => {
        cloud.positionY = positionY;
        updateCloud(cloud);
    }

    const onStartFrameChanged = (startFrame: number) => {
        cloud.startFrame = startFrame;
        updateCloud(cloud);
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
                onChange={({ target: { value } }) => console.log("")}
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
                onChange={({ target: { value } }) => console.log("")}
            />

            <label className="settingsLabel">Height</label>
            <input
                className="settingsInput"
                type="number"
                min={1}
                max={10}
                value={cloud.height}
                onChange={({ target: { value } }) => console.log("")}
            />

            <label className="settingsLabel">Depth</label>
            <input
                className="settingsInput"
                type="number"
                min={1}
                max={10}
                value={cloud.depth}
                onChange={({ target: { value } }) => console.log("")}
            />

            <label className="settingsLabel">positionX</label>
            <input
                className="settingsInput"
                type="number"
                min={0}
                max={10}
                value={cloud.positionX}
                onChange={({ target: { value } }) => onPositionXChanged(parseInt(value))}
            />

            <label className="settingsLabel">PositionY</label>
            <input
                className="settingsInput"
                type="number"
                min={0}
                max={10}
                value={cloud.positionY}
                onChange={({ target: { value } }) => onPositionYChanged(parseInt(value))}
            />

            <label className="settingsLabel">StartFrame</label>
            <input
                className="settingsInput"
                type="number"
                min={1}
                max={255}
                value={cloud.startFrame}
                onChange={({ target: { value } }) => onStartFrameChanged(parseInt(value))}
            />

            <label className="settingsLabel">Transition: </label>
            <input
                type="checkbox"
                checked={cloud.transition}
                onChange={() => console.log("")}
            />

            <br />
            <label className="settingsLabel">transitionFrames</label>
            <input
                className="settingsInput"
                type="number"
                min={0}
                max={10}
                value={cloud.transitionFrames}
                onChange={({ target: { value } }) => console.log("")}
            />

            <button
                className="settingsButton"
                onClick={() => onRemoveCloud(props.id)}
            >Remove Cloud</button>
        </div>
    )
}
