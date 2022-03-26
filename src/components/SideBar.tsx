import React, { useState } from "react";
import { IoColorPalette, IoDice, IoPlanet, IoPlayCircle } from "react-icons/io5";
import { PropertieEditor } from "./PropertieEditor";
import { PlanetSettingsTemplate } from "./SettingTemplate/PlanetSettings";

export const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 text-white
            flex flex-col bg-gray-600 shadow">

            <SideBarIcon icon={<IoPlanet size="32" />} text="Planet settings" settingsTemplate={<PlanetSettingsTemplate />} />
            <SideBarIcon icon={<IoColorPalette size="32" />} text="Color settings" settingsTemplate={null} />
            <SideBarIcon icon={<IoDice size="32" />} text="Random settings" settingsTemplate={null} />
            <SideBarIcon icon={<IoPlayCircle size="32" />} text="Render settings" settingsTemplate={null} />

        </div>
    )
}

const SideBarIcon = ({ icon, text = "tooltip", settingsTemplate }: any) => {

    const [displaySettings, setDisplaySettings] = useState(false);

    return <div><div className="sidebar-icon group" onClick={() => { setDisplaySettings(!displaySettings) }}>
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>
    </div>
        {displaySettings ? <PropertieEditor template={settingsTemplate} /> : null}
    </div>
}