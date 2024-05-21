import { FC } from 'react';
import { CustomCellRendererProps } from '@ag-grid-community/react';
import styled from 'styled-components';

interface BadgeColor {
  background: string
  text: string
}

const AVAILABLE_COLORS: Array<BadgeColor> = [
  { background: "#aed6f1", text: "#2c3e50" },
  { background: "#a9dfbf", text: "#34495e" },
  { background: "#f9e79f", text: "#2c3e50" },
  { background: "#f5cba7", text: "#2c3e50" },
  { background: "#d2b4de", text: "#2c3e50" },
  { background: "#a2d9ce", text: "#2c3e50" },
  { background: "#f5b7b1", text: "#2c3e50" },
  { background: "#d7bde2", text: "#2c3e50" },
  { background: "#abebc6", text: "#2c3e50" },
  { background: "#fadbd8", text: "#2c3e50" },
  { background: "#c39bd3", text: "#34495e" },
  { background: "#52be80", text: "#2c3e50" },
  { background: "#f4d03f", text: "#2c3e50" },
  { background: "#e59866", text: "#2c3e50" },
  { background: "#bb8fce", text: "#2c3e50" },
  { background: "#73c6b6", text: "#2c3e50" },
  { background: "#e57373", text: "#2c3e50" },
  { background: "#d2e4fc", text: "#2c3e50" },
  { background: "#d0e8eb", text: "#2c3e50" },
  { background: "#ffe4e1", text: "#2c3e50" }
]

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
`

const CategoryCellRenderer: FC<CustomCellRendererProps> = ({ value, colDef }) => {
  if (!value) return <span></span>

  const params = colDef?.cellRendererParams;

  const { values, multiple, separator = ',' } = params

  const badgeStyles = (badgeColor: BadgeColor) => ({
    backgroundColor: badgeColor.background ,
    color: badgeColor.text,
  })

  if (multiple) {
    const valueList: Array<string> = value.split(separator)
    const valueIndexes: Record<string, number> = valueList.reduce((result, value) => ({...result, [value]: values.indexOf(value)}), {})

    return (
      <Badges>
        {valueList.map((value) => (
          <Badge
            style={badgeStyles(AVAILABLE_COLORS[(valueIndexes[value]) % AVAILABLE_COLORS.length])}
            key={value}
          >
            {value}
          </Badge>
        ))}
      </Badges>
    )
  }

  const badgeColor = AVAILABLE_COLORS[values.indexOf(value) % AVAILABLE_COLORS.length]

  return <Badge style={badgeStyles(badgeColor)}>{value}</Badge>
}

export default CategoryCellRenderer
