import { nanoid } from "nanoid";
import React, { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { planetActionCreators } from "../store";
import { colorMappingIdSelector, colorMappingSelector } from "../store/selectors/planetSelector";
import { ColorMapping } from "../types/planetProp";

export const Colorator = () => {

    const colorMappings = useSelector(colorMappingSelector);

    const dispatch = useDispatch();

    const { addColorMapping } = bindActionCreators(
        planetActionCreators,
        dispatch
    )

    const defaultColorMapping: ColorMapping = {
        id: "none",
        value: 0,
        color: { r: 0, g: 0, b: 0, a: 1 }
    }

    const onAddColorMapping = () => {
        const uniqueId = nanoid();
        defaultColorMapping.id = uniqueId;
        addColorMapping(defaultColorMapping);
    }

    return (
        <div style={{ display: "inline" }}>
            <p>Color Settings:</p>
            {colorMappings.map(mappings => {
                return <PlanetColorPicker id={mappings.id} key={mappings.id} />
            })}
            <button onClick={onAddColorMapping}>Add</button>
        </div>
    )
}

const PlanetColorPicker: React.FC<{ id: string }> = (props) => {

    const mappingColor = useSelector(colorMappingIdSelector(props.id))

    const [color, setColor] = useState(mappingColor.color);

    const [value, setValue] = useState(mappingColor.value);

    const [display, setDisplay] = useState(false);

    const dispatch = useDispatch();

    const { updateColorMapping, removeColorMapping } = bindActionCreators(
        planetActionCreators,
        dispatch
    );

    const onChangeColorMethod = (color: ColorResult) => {
        mappingColor.color = color.rgb;
        updateColorMapping(mappingColor);
        setColor({ ...color.rgb })
    }

    const onChangeValue = (value: number) => {
        mappingColor.value = value;
        updateColorMapping(mappingColor);
        setValue(value)
    }

    const onClickMethod = () => {
        setDisplay(!display);
    }

    const onCloseMethod = () => {
        setDisplay(false);
    }

    const onRemoveColorMapping = (id: string) => {
        removeColorMapping(id);
    }

    const colorStyle = {
        marginTop: "3px",
        marginLeft: "7px",
        padding: "0px",
        width: "45px",
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
        <div style={{ display: "flex", border: "1px solid black", width: "inherit", paddingInline: "5px", paddingTop: "2px", marginTop: "3px", paddingBottom: "2px" }}>
            <div style={inputDivStyle}>
                <input
                    type="number"
                    defaultValue={value}
                    min={0}
                    max={1}
                    step={0.01}
                    style={inputStyle}
                    onChange={
                        ({ target: { value } }) => onChangeValue(parseFloat(value))}
                />
            </div>
            <div>
                <div style={swatch} onClick={onClickMethod}>
                    <label>Color: </label> <div style={colorStyle} />
                </div>
                {display ? <div style={popover}>
                    <div style={cover} onClick={onCloseMethod} />
                    <SketchPicker color={color} onChange={onChangeColorMethod} />
                </div> : null}
            </div>
            <div>
                <button style={{ marginLeft: "0%", marginTop: "30%" }} onClick={() => onRemoveColorMapping(props.id)}>X</button>
            </div>
        </div>
    );
}