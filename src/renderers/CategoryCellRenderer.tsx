import { FC } from 'react';
import { CustomCellRendererProps } from '@ag-grid-community/react';
import styled from 'styled-components';

const Badges = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  overflow: auto;
  gap: 4px;
`

const Badge = styled.span`
  padding: 2px 8px;
  border-radius: 12px;
  display: inline-flex;
  line-height: normal;
  flex-shrink: 0;
  background-color: #e5e9f0;
  color: #1d1f25;
`

const CategoryCellRenderer: FC<CustomCellRendererProps> = ({ value, colDef }) => {
  if (!value) return <span></span>

  const params = colDef?.cellRendererParams;

  const { multiple, separator = ',' } = params

  if (multiple) {
    const valueList: Array<string> = value.split(separator)

    return (
      <Badges>
        {valueList.map((value) => (
          <Badge
            key={value}
          >
            {value}
          </Badge>
        ))}
      </Badges>
    )
  }

  return <Badge>{value}</Badge>
}

export default CategoryCellRenderer
