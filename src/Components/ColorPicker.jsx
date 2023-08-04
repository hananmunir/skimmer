import React from "react";
import { SketchPicker } from "react-color";

export default function ColorPicker({ color, onChange }) {
  return (
    <SketchPicker
      color={color}
      onChange={(selectedColor) => onChange(selectedColor.hex)}
    />
  );
}
