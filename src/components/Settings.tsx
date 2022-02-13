import React from "react";

export const Setting = () => {

    return (
        <div>
            <label>
                radius:
            </label>
            <input
                type="number"
                min={4}
                max={64}
                defaultValue={20}
            />
        </div>
    )

} 