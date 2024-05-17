import { CustomCellRendererProps } from "@ag-grid-community/react";
import { FC } from "react";
import styled from 'styled-components'

const CellContainer = styled.span`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
`

const CellContent = styled.img`
  width: 100%;
  max-height: 100%;
  object-fit: contain;
`

const ImageCellRenderer: FC<CustomCellRendererProps> = ({ value }) => {
  if (!value) return null

  return (
    <CellContainer>
      <CellContent src={value} alt={`${value} image`} />
    </CellContainer>
  )
}

export default ImageCellRenderer
