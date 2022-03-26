import React from "react"

export const PropertieEditor = ({ template }: any) => {
    return (
        <div className="fixed top-0 left-16 w-96 h-screen
           pt-2 pl-2 pr-2 justify-center 
            mx-auto 
             bg-gray-500 -z-10
             text-black">
            {template}
        </div>
    )
}