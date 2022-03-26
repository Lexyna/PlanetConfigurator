import React from "react";
import { IoColorPalette, IoDice, IoPlanet, IoPlayCircle } from "react-icons/io5";

export const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 text-white
            flex flex-col bg-gray-600 shadow">

            <SideBarIcon icon={<IoPlanet size="32" />} text="Planet properties" />
            <SideBarIcon icon={<IoColorPalette size="32" />} text="Color properties" />
            <SideBarIcon icon={<IoDice size="32" />} text="Random properties" />
            <SideBarIcon icon={<IoPlayCircle size="32" />} text="Render properties" />

        </div>
    )
}

const SideBarIcon = ({ icon, text = "tooltip" }: any) => {
    return <div className="sidebar-icon group" onClick={() => console.log(`Clicked me: ${text}`)}>
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>
    </div>
}