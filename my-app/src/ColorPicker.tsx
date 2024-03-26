import React from 'react';

interface ColorPickerProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onSelectColor }) => {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectColor(e.target.value);
  };

  return (
    <div className="color-picker">
      <input type="color" value={selectedColor} onChange={handleColorChange} />
    </div>
  );
};

export default ColorPicker;
