import { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux";
import { createCloud } from "../../Logic/clouds/cloud";
import { cloudActionCreators } from "../../store";
import { cloudSelector, cloudsSelector } from "../../store/selectors/cloudSelector"
import { radiusSelector } from "../../store/selectors/planetSelector";
import { cover, popover } from "../css/planetColorPickerStyles";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";
import planet from "../../Logic/planet/planet";

export const CloudsSettings = () => {

    const clouds = useSelector(cloudsSelector);

    const dispatch = useDispatch();

    const { addCloud } = bindActionCreators(
        cloudActionCreators,
        dispatch
    )

    return (
        <div className="overflow-y-auto max-h-screen h-screen pb-10 scroll-px-10 no-scrollbar">
            <button
                className="settingsButton"
                onClick={() => addCloud(createCloud())}
            >
                Add Cloud
            </button>
            {clouds.map(cloud => {
                return <CloudSettings id={cloud.id} key={cloud.id} />
            })}
        </div>
    )
}

const CloudSettings: React.FC<{ id: string }> = (props) => {

    const cloud = useSelector(cloudSelector(props.id));

    const [display, setDisplay] = useState(false);

    const [collapsed, setCollapsed] = useState(true);

    const [color, setColor] = useState(cloud.color);

    const dispatch = useDispatch();

    const radius = useSelector(radiusSelector);

    const { removeCloud, updateCloud } = bindActionCreators(
        cloudActionCreators,
        dispatch
    )

    const onRemoveCloud = (id: string) => {
        removeCloud(id);
    }

    const onSeedChanged = (seed: string) => {
        cloud.seed = seed;
        updateCloud(cloud);
    }

    const onAnimationLengthChanged = (length: number) => {
        cloud.depth = length;
        updateCloud(cloud);
    }

    const onMaskRadiusChanged = (maskRadius: number) => {
        cloud.maskRadius = maskRadius;
        updateCloud(cloud);
    }

    const onChangeColorMethod = (color: ColorResult) => {
        cloud.color = color.rgb;
        if (cloud.color.a)
            cloud.color.a = Math.floor(cloud.color.a * 255);
        updateCloud(cloud);
        setColor({ ...color.rgb })
    }

    const onPositionXChanged = (positionX: number) => {
        cloud.pixelPositionX = positionX;
        updateCloud(cloud);
    }

    const onPositionYChanged = (positionY: number) => {
        cloud.pixelPositionY = positionY;
        updateCloud(cloud);
    }

    const onStartFrameChanged = (startFrame: number) => {
        cloud.startFrame = startFrame;
        updateCloud(cloud);
    }

    const onStaticChanged = (staticCloud: boolean) => {
        cloud.static = staticCloud;
        updateCloud(cloud);
    }

    const onLoopingChanged = (looping: boolean) => {
        cloud.looping = looping;
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
            <label className="settingsLabel w-full inline-block" onClick={() => setCollapsed(!collapsed)}>
                Cloud - [{cloud.startFrame}, {(cloud.startFrame + cloud.depth) % planet.noiseMap.length}]
                <IoCloseCircle className="mt-1 float-right" size="20" onClick={() => onRemoveCloud(props.id)} />
                {collapsed ? <BsChevronDown className=" pt-2 float-right" size="20" /> : <BsChevronUp className="pt-2 float-right" size="20" />}
            </label>
            {collapsed ? null : <div>
                <label className="settingsLabel">Seed:</label>
                <input
                    className="settingsInput"
                    type="text"
                    value={cloud.seed}
                    onChange={({ target: { value } }) => onSeedChanged(value)}
                />

                <label className="settingsLabel">Color:</label>
                <div onClick={onClickMethod}>
                    <div style={colorStyle} className="rounded-xl"></div>
                </div>
                {display ? <div style={popover}>
                    <div style={cover} onClick={onCloseMethod} />
                    <SketchPicker color={color} onChange={onChangeColorMethod} />
                </div> : null}

                <label className="settingsLabel">Animation Length:</label>
                <input
                    className="settingsInput"
                    type="number"
                    min={1}
                    max={planet.noiseMap.length}
                    value={cloud.depth}
                    onChange={({ target: { value } }) => onAnimationLengthChanged(parseInt(value))}
                />

                <label className="settingsLabel">MaskRadius:</label>
                <input
                    className="settingsInput"
                    type="number"
                    min={1}
                    max={planet.radius * 2}
                    value={cloud.maskRadius}
                    onChange={({ target: { value } }) => onMaskRadiusChanged(parseInt(value))}
                />

                <label className="settingsLabel">positionX:</label>
                <input
                    className="settingsInput"
                    type="number"
                    min={-radius}
                    max={radius}
                    value={cloud.pixelPositionX}
                    onChange={({ target: { value } }) => onPositionXChanged(parseInt(value))}
                />

                <label className="settingsLabel">PositionY:</label>
                <input
                    className="settingsInput"
                    type="number"
                    min={-radius * 2}
                    max={radius}
                    value={cloud.pixelPositionY}
                    onChange={({ target: { value } }) => onPositionYChanged(parseInt(value))}
                />

                <label className="settingsLabel">StartFrame:</label>
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

                <label className="settingsLabel">Static: </label>
                <input
                    type="checkbox"
                    checked={cloud.static}
                    onChange={() => onStaticChanged(!cloud.static)}
                />

                <label className="settingsLabel">Looping: </label>
                <input
                    type="checkbox"
                    checked={cloud.looping}
                    onChange={() => onLoopingChanged(!cloud.looping)}
                />

                <br />
                <label className="settingsLabel">transitionFrames:</label>
                <input
                    className="settingsInput"
                    type="number"
                    min={0}
                    max={10}
                    value={cloud.transitionFrames}
                    onChange={({ target: { value } }) => console.log("")}
                />
            </div>}
        </div>
    )
}
