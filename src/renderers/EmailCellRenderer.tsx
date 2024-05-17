import { CustomCellRendererProps } from '@ag-grid-community/react';
import { FC } from 'react';
import isEmail from 'validator/es/lib/isEmail';
import styled from 'styled-components'

const CellContent = styled.a`
  text-decoration: underline;
  color: #2563eb;
`

const EmailCellRenderer: FC<CustomCellRendererProps> = ({ value }) => {
  if (!value) return null

  if (!isEmail(value)) {
    return <span>{value}</span>
  }

  return (
    <CellContent href={`mailto:${value}`}>{value}</CellContent>
  )
}

export default EmailCellRenderer
