import React from "react";
import { IoPlay, IoStopCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Animator } from "../Logic/renderer/Animator";
import { renderSettingsCreator } from "../store";
import { animateSelector, keyframeSelector } from "../store/selectors/renderSelector";

export const Keyframe = () => {

    const dispatch = useDispatch();

    const animate = useSelector(animateSelector);

    const frame = useSelector(keyframeSelector);

    const { updateRenderSettingAnimate } = bindActionCreators(
        renderSettingsCreator,
        dispatch
    );

    return (
        <div className="absolute bottom-5 left-20 right-20 text-gray-500 flex">
            {animate ?
                <IoStopCircle className="pb-0" size="30" onClick={() => updateRenderSettingAnimate(false)} /> :
                <IoPlay className="pb-0" size="30" onClick={() => updateRenderSettingAnimate(true)} />
            }
            <input
                className="w-full bg-gray-600 rounded-xl h-6 p-0 mt-1
                focus:outline-none focus:ring-0 focus:shadow-none appearance-none ml-2"
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