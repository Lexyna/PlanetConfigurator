import React from "react"

export const PropertiesEditor = ({ template }: any) => {
    return (
        <div className="fixed top-0 left-16 w-96 h-screen
           pt-2 pl-2 pr-2 justify-center mx-auto 
             bg-gray-500 
             text-black">
            {template}
        </div>
    )
}