import { FC, useState, useRef, useEffect } from 'react';
import { CustomCellEditorProps } from '@ag-grid-community/react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import styled from 'styled-components';

const ColorPickerWrapper = styled.div`
  position: fixed;
  z-index: 2;
`;

const ColorCellEditor: FC<CustomCellEditorProps> = ({ value, onValueChange, stopEditing }) => {
  const [color, setColor] = useState(value || '#ffffff');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    onValueChange(newColor);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        stopEditing();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [stopEditing]);

  return (
    <div ref={wrapperRef}>
      <ColorPickerWrapper>
        <HexColorPicker
          color={color}
          onChange={handleColorChange}
        />
        <HexColorInput
          style={{
            display: 'block',
            boxSizing: 'border-box',
            width: '90px',
            margin: '12px 55px 0',
            padding: '6px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: '#eee',
            outline: 'none',
            font: 'inherit',
            textTransform: 'uppercase',
            textAlign: 'center'
          }}
          color={color}
          onChange={handleColorChange}
        />
      </ColorPickerWrapper>
    </div>
  );
};

export default ColorCellEditor;
