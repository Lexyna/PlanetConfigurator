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

    return (
        <div className="absolute bottom-5 left-20 right-20 -z-10">
            <input
                className="w-full bg-gray-600 rounded-xl h-6 p-0
                focus:outline-none focus:ring-0 focus:shadow-none appearance-none"
                type="range"
                min={0}
                max={255}
                value={frame}
                onChange={({ target: { value } }) => {
                    Animator.setAnimationFrame(parseInt(value))
                    updateRenderSettingAnimate(false)
                }}
            />
        </div>
    )
}