import { AgGridReact } from "@ag-grid-community/react"
import { ColDef } from "@ag-grid-community/core"

import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

import { useMemo } from "react"
import { CategoryCellEditor, CategoryCellRenderer, EmailCellRenderer, ImageCellRenderer, URLCellRenderer, suppressKeyboardEvent } from "../main"
import data from './data/nyt-10-best-books-2022.json'

import '@ag-grid-community/styles/ag-grid.min.css'
import '@ag-grid-community/styles/ag-theme-quartz.css'
import ColorCellRenderer from "../renderers/ColorCellRenderer";
import ColorCellEditor from "../editors/ColorCellEditor";

ModuleRegistry.registerModules([ ClientSideRowModelModule ])


function App() {
  const columnDefs = useMemo(() => {
    return [
      {
        field: "title",
        headerName: 'Title'
      },
      {
        field: "author",
        headerName: 'Author',
        cellRenderer: CategoryCellRenderer,
        cellRendererParams: {
          values: [...new Set(data.map(record => record.author))].sort(),
          // multiple: true
        },
        cellEditor: CategoryCellEditor,
        cellEditorPopup: true,
        suppressKeyboardEvent
      },
      {
        headerName: "Cover",
        field: "cover",
        cellRenderer: ImageCellRenderer,
        minWidth: 100,
      },
      {
        field: "summary",
        headerName: "Summary",
        cellEditor: 'agLargeTextCellEditor',
        cellEditorPopup: true,
      },
      {
        field: 'reviews',
        headerName: "Reviews",
        cellRenderer: URLCellRenderer
      },
      {
        field: 'genres',
        headerName: 'Genres',
        cellRenderer: CategoryCellRenderer,
        cellRendererParams: {
          values: [...new Set(data.map(record => record.genres.split(",")).flat())].sort(),
          multiple: true,
          separator: ','
        },
        cellEditor: CategoryCellEditor,
        cellEditorPopup: true,
        suppressKeyboardEvent
      },
      {
        field: 'email',
        headerName: 'Support Email',
        cellRenderer: EmailCellRenderer
      },
      {
        field:'color',
        headerName:'Colors',
        cellRenderer:ColorCellRenderer,
        cellEditor: ColorCellEditor,
        cellEditorPopup: true,
      }
    ] as ColDef[]
  }, [])

  return (
    <div className="ag-theme-quartz" style={{ height: '500px' }}>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={{
          editable: true
        }}
        reactiveCustomComponents
      />
    </div>
  )
}

export default App
