import { nanoid } from "nanoid";
import React, { useState } from "react";
import { SketchPicker } from "react-color";

export const Colorator = () => {

    const [pickers, setPickers] = useState([
        { id: nanoid() },
        { id: nanoid() },
        { id: nanoid() }
    ]);

    const addPicker = () => {
        const picker = { id: nanoid() };
        setPickers(pickers.concat(picker));
    }

    return (
        <div style={{ display: "inline" }}>
            <p>Color Settings:</p>
            {pickers.map(picker => {
                return <PlanetColorPicker key={picker.id} />
            })}
            <button onClick={addPicker}>Add</button>
        </div>
    )
}

const PlanetColorPickers = (length: number) => {

    const pickers: any[] = [];
    let id: number = 0;

    for (var i = 0; i < length; i++) {
        pickers.push(PlanetColorPicker())
    }
    return pickers;
}

const PlanetColorPicker = () => {

    const [display, setDisplay] = useState(false);

    const [color, setColor] = useState({
        r: 241,
        g: 112,
        b: 19,
        a: 1
    });

    const onClickMethod = () => {
        setDisplay(!display);
    }

    const onCloseMethod = () => {
        setDisplay(false);
    }

    const onChangeMethod = (color: any) => {
        setColor({ ...color.rgb });
    }

    const colorStyle = {
        marginTop: "3px",
        marginLeft: "3px",
        padding: "0px",
        width: "36px",
        height: "18px",
        borderRadius: "2px",
        background: `rgb(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
    } as React.CSSProperties

    const swatch = {
        padding: "5px",
        background: "000",
        borderRadius: "5px",
        boyShadow: "0 0 0 1px rgba(0,0,0,1",
        display: "flex",
        cursor: "pointer",
        marginLeft: "-50%"
    } as React.CSSProperties

    const popover = {
        position: "absolute",
        zIndex: "3"
    } as React.CSSProperties

    const cover = {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px"
    } as React.CSSProperties

    const inputDivStyle = {
        width: "50%",
        display: "flex"
    } as React.CSSProperties

    const inputStyle = {
        width: "inherit",
        display: "flex"
    } as React.CSSProperties

    return (
        <div style={{ display: "flex", border: "1px solid black", width: "inherit" }}>
            <div style={inputDivStyle}>
                <input
                    type="number"
                    defaultValue={0}
                    min={0}
                    max={1}
                    step={0.01}
                    style={inputStyle}
                />
            </div>
            <div>
                <div style={swatch} onClick={onClickMethod}>
                    <label>Color: </label> <div style={colorStyle} />
                </div>
                {display ? <div style={popover}>
                    <div style={cover} onClick={onCloseMethod} />
                    <SketchPicker color={color} onChange={onChangeMethod} />
                </div> : null}
            </div>
        </div>
    );
}

/**
 * <div style={swatch} onClick={onClickMethod}>
                    <label>Color: </label> <div style={colorStyle} />
                </div>
                {display ? <div style={popover}>
                    <div style={cover} onClick={onCloseMethod} />
                    <ChromePicker color={color} onChange={onChangeMethod} />
                </div> : null}
 */