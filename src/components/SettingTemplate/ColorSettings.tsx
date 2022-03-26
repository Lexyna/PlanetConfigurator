import { nanoid } from "nanoid";
import { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { planetActionCreators } from "../../store";
import { colorMappingIdSelector, colorMappingSelector } from "../../store/selectors/planetSelector";
import { ColorMapping } from "../../types/planetProp";
import { cover, popover } from "../css/planetColorPickerStyles";

export const ColorSetting = () => {

    const colorMappings = useSelector(colorMappingSelector);

    const dispatch = useDispatch();

    const { addColorMapping } = bindActionCreators(
        planetActionCreators,
        dispatch
    )

    const defaultColorMapping: ColorMapping = {
        id: "none",
        value: 0,
        color: { r: 0, g: 0, b: 0, a: 255 }
    }

    const onAddColorMapping = () => {
        const uniqueId = nanoid();
        defaultColorMapping.id = uniqueId;
        addColorMapping(defaultColorMapping);
    }

    return (
        <div className="overflow-y-auto max-h-screen h-screen pb-10 scroll-px-10 no-scrollbar">
            {colorMappings.map(mappings => {
                return <ColorElement id={mappings.id} key={mappings.id} />
            })}
            <button
                className="settingsButton"
                onClick={onAddColorMapping}>
                Add
            </button>
        </div>
    )
}

const ColorElement: React.FC<{ id: string }> = (props) => {

    const mappingColor = useSelector(colorMappingIdSelector(props.id));

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
        width: "100%",
        height: "40px",
        background: `rgb(${color.r}, ${color.g}, ${color.b}, ${color.a})`,

    } as React.CSSProperties

    return (
        <div className="flex-auto mb-10 flex relative">
            <input
                className="settingsInput mt-2 w-20"
                type="number"
                defaultValue={value}
                min={0}
                max={1}
                step={0.01}
                onChange={({ target: { value } }) => onChangeValue(parseFloat(value))}
            />
            <div className="w-96 mt-2 pl-2 pr-2" onClick={onClickMethod}>

                <div style={colorStyle} className="rounded-xl" />
            </div>
            {display ? <div style={popover}>
                <div style={cover} onClick={onCloseMethod} />
                <SketchPicker color={color} onChange={onChangeColorMethod} />
            </div> : null}
            <button
                className="settingsButton w-10 px-2"
                onClick={() => onRemoveColorMapping(props.id)}>
                X
            </button>
        </div>
    )
}