import React, { useState } from "react";
import { IoColorPalette, IoDice, IoPlanet, IoPlayCircle, IoCloud } from "react-icons/io5";
import { PropertiesEditor } from "./PropertieEditor";
import { CloudsSettings } from "./SettingTemplate/CloudSettings";
import { ColorSetting } from "./SettingTemplate/ColorSettings";
import { PlanetSettingsTemplate } from "./SettingTemplate/PlanetSettings";
import { RandomSetting } from "./SettingTemplate/RandomSettings";
import { RenderSetting } from "./SettingTemplate/RenderSettings";

export const SideBar = () => {

    const [displayState, setDisplayState] = useState([
        false,
        false,
        false,
        false,
        false
    ])

    const updateEditor = (index: number) => {

        const newDisplayState: boolean[] = [false, false, false, false];

        newDisplayState[index] = !displayState[index];

        setDisplayState(newDisplayState);

    }

    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 text-white
            flex flex-col bg-gray-600 shadow z-10">

            <SideBarIcon icon={<IoPlanet size="32" />} text="Planet settings" settingsTemplate={<PlanetSettingsTemplate />} display={displayState[0]} toggleDisplay={() => updateEditor(0)} />
            <SideBarIcon icon={<IoColorPalette size="32" />} text="Color settings" settingsTemplate={<ColorSetting />} display={displayState[1]} toggleDisplay={() => updateEditor(1)} />
            <SideBarIcon icon={<IoCloud size="32" />} text="Render settings" settingsTemplate={<CloudsSettings />} display={displayState[2]} toggleDisplay={() => updateEditor(2)} />
            <SideBarIcon icon={<IoDice size="32" />} text="Random settings" settingsTemplate={<RandomSetting />} display={displayState[3]} toggleDisplay={() => updateEditor(3)} />
            <SideBarIcon icon={<IoPlayCircle size="32" />} text="Render settings" settingsTemplate={<RenderSetting />} display={displayState[4]} toggleDisplay={() => updateEditor(4)} />

        </div>
    )
}

const SideBarIcon = ({ icon, text = "tooltip", settingsTemplate, display, toggleDisplay }: any) => {



    return <div><div className="sidebar-icon group" onClick={toggleDisplay}>
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>
    </div>
        {display ? <PropertiesEditor template={settingsTemplate} /> : null}
    </div>
}