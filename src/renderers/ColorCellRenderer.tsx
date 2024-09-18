import { CustomCellRendererProps } from '@ag-grid-community/react';
import { FC } from 'react';
import styled from 'styled-components'


const ColorContainer = styled.div`
      display: flex;
      align-items: center;
      gap: 8px;
    `;

const ColorSwatch = styled.div`
      background-color: ${props => props.color};
      width: 15px;
      height: 15px;
    `;


const ColorCellRenderer: FC<CustomCellRendererProps> = ({ value }) => {
  if (!value) return null

  const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(value);

  if (!isValidHex) {
    return <span>[Invalid] {value}</span>;
  }

  return (
    <ColorContainer>
      <ColorSwatch color={value} />
      <span>{value}</span>
    </ColorContainer>
  )
}

export default ColorCellRenderer
