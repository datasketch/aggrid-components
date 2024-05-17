import { CustomCellRendererProps } from '@ag-grid-community/react';
import { FC } from 'react';
import isURL from 'validator/es/lib/isURL';
import styled from 'styled-components';

const CellContent = styled.a`
  text-decoration: underline;
  color: #2563eb;
`

const URLCellRenderer: FC<CustomCellRendererProps> = ({ value }) => {
  if (!value) return

  if (!isURL(value)) {
    return <span>{value}</span>
  }

  return (
    <CellContent href={value} target='_blank' rel="noreferrer">
      {value}
    </CellContent>
  )
}

export default URLCellRenderer
