import { nanoid } from "nanoid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { planetActionCreators } from "../store";
import { colorMappingSelector } from "../store/selectors/planetSelector";
import { ColorMapping } from "../types/planetProp";
import { PlanetColorPicker } from "./PlanetColorPicker";

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
        color: { r: 0, g: 0, b: 0, a: 255 }
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