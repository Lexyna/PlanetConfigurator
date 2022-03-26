import { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { planetActionCreators } from "../store";
import { colorMappingIdSelector } from "../store/selectors/planetSelector";
import { cover, inputDivStyle, inputStyle, planetColorPickerStyle, popover, swatch } from "./css/planetColorPickerStyles";

export const PlanetColorPicker: React.FC<{ id: string }> = (props) => {

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
        if (mappingColor.color.a)
            mappingColor.color.a = Math.floor(mappingColor.color.a * 255);
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
        width: "130px",
        height: "35px",
        borderRadius: "2px",
        background: `rgb(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
    } as React.CSSProperties

    return (
        <div style={planetColorPickerStyle}>
            <div style={inputDivStyle}>
                <input
                    className="settingsInput"
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
                    <div style={colorStyle} />
                </div>
                {display ? <div style={popover}>
                    <div style={cover} onClick={onCloseMethod} />
                    <SketchPicker color={color} onChange={onChangeColorMethod} />
                </div> : null}
            </div>
            <div>
                <button
                    className="settingsButton"
                    onClick={() => onRemoveColorMapping(props.id)}>X</button>
            </div>
        </div>
    );
}