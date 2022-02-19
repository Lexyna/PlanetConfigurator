import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Animator } from "../Logic/renderer/Animator";
import { renderSettingsCreator } from "../store";
import { keyframeSelector } from "../store/selectors/renderSelector";

export const Keyframe = () => {

    const dispatch = useDispatch();

    const frame = useSelector(keyframeSelector);

    const { updateRenderSettingAnimate } = bindActionCreators(
        renderSettingsCreator,
        dispatch
    );

    const keyFrameStyle = {
        position: "absolute",
        bottom: "4rem",
        //width: "80%",
        left: "3rem",
        right: "3rem",
        //border: "1px solid white"
    } as React.CSSProperties

    const slider = {
        width: "100%"
    } as React.CSSProperties

    return (
        <div style={keyFrameStyle}>
            <input style={slider}
                type="range"
                min={0}
                max={256}
                value={frame}
                onChange={({ target: { value } }) => {
                    Animator.setAnimationFrame(parseInt(value))
                    updateRenderSettingAnimate(false)
                }}
            />
        </div>
    )
}