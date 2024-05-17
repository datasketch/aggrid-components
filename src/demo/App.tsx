import { AgGridReact } from "@ag-grid-community/react"
import { ColDef } from "@ag-grid-community/core"

import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

import { useMemo } from "react"
import { EmailCellRenderer, ImageCellRenderer, URLCellRenderer } from "../main"
import data from './data/nyt-10-best-books-2022.json'

import '@ag-grid-community/styles/ag-grid.min.css'
import '@ag-grid-community/styles/ag-theme-quartz.css'

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
        headerName: 'Author'
        // cellRenderer: CompanyRenderer,
      },
      {
        headerName: "Cover",
        field: "cover",
        cellRenderer: ImageCellRenderer,
        minWidth: 100,
      },
      {
        field: "summary",
        headerName: "Summary"
        // cellRenderer: PriceRenderer,
      },
      {
        field: 'reviews',
        headerName: "Reviews",
        cellRenderer: URLCellRenderer
      },
      {
        field: 'genres',
        headerName: 'Genres'
      },
      {
        field: 'email',
        headerName: 'Support Email',
        cellRenderer: EmailCellRenderer
      }
    ] as ColDef[]
  }, [])

  return (
    <div className="ag-theme-quartz" style={{ height: '500px' }}>
      <AgGridReact rowData={data} columnDefs={columnDefs} defaultColDef={{
        editable: true
      }} />
    </div>
  )
}

export default App
