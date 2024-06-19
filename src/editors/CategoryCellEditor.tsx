import { ColDef, SuppressKeyboardEventParams } from "@ag-grid-community/core";
import { CustomCellEditorProps } from "@ag-grid-community/react";
import { FC, useState } from "react";
import { MultiValue, SingleValue } from "react-select";
import CreatableSelect from 'react-select/creatable'

interface Option {
  readonly label: string
  readonly value: string
}

const createOption = (label: string): Option => ({
  label: label ?? '',
  value: label ?? '',
})

const CategoryCellEditor: FC<CustomCellEditorProps> = ({
  api,
  value,
  stopEditing,
  colDef,
  onValueChange,
}) => {
  const { values, multiple, separator = ',' } = colDef.cellRendererParams
  const options: Array<Option> = values.map((value: string) =>
    createOption(value)
  )
  const isMulti = !!multiple
  const valueList = value?.split(separator)

  const initialState: MultiValue<Option> | SingleValue<Option> = !isMulti
    ? options.find((option) => option.value === value) || null
    : options.filter((option) => valueList?.includes(option.value))

  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState(initialState)

  const handleChange = (selected: MultiValue<Option> | SingleValue<Option>) => {
    setInputValue(selected)
    if (!isMulti) {
      onValueChange((selected as SingleValue<Option>)?.label || '')
      stopEditing()
    } else {
      onValueChange(
        (selected as MultiValue<Option>)
          .map((option) => option.label)
          .join(separator)
      )
    }
  }

  const handleCreate = (newValue: string) => {
    setIsLoading(true)
    const columnDefs = api.getColumnDefs()
    const option = createOption(newValue)
    if (!columnDefs) return

    const currentColumnDefIndex = columnDefs.findIndex(
      ({ field }: ColDef) => field === colDef.field
    )

      ; (
        columnDefs[currentColumnDefIndex] as ColDef
      ).cellRendererParams.values.push(newValue)

    api.setGridOption('columnDefs', columnDefs)

    setInputValue((prevState) => {
      if (isMulti) return [...(prevState as MultiValue<Option>), option]
      return option
    })

    if (!isMulti) {
      onValueChange(newValue)
    } else {
      onValueChange(
        (inputValue as MultiValue<Option>)
          .concat(option)
          .map((option) => option.label)
          .join(separator)
      )
    }

    setIsLoading(false)
    stopEditing()
  }

  return (
    <CreatableSelect
      name={colDef.field}
      tabIndex={1}
      options={options}
      value={inputValue}
      onChange={handleChange}
      onCreateOption={handleCreate}
      isLoading={isLoading}
      isMulti={isMulti}
      closeMenuOnSelect={!isMulti}
      onBlur={() => stopEditing()}
      isClearable
      autoFocus
      openMenuOnFocus
    />
  )
}

export const suppressKeyboardEvent = (params: SuppressKeyboardEventParams) => {
  return params.event.key === 'Enter'
}

export default CategoryCellEditor
