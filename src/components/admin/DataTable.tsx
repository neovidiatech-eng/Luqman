import React from 'react'

interface Column<T> {
  header: string
  accessor?: keyof T
  render?: (item: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyExtractor: (item: T) => string
}

export default function DataTable<T>({ data, columns, keyExtractor }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
      <table className="w-full text-sm text-right">
        <thead className="bg-gray-50 border-b border-gray-100 text-gray-600 font-medium">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="px-6 py-4 whitespace-nowrap">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                لا توجد بيانات للعرض
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => (
              <tr 
                key={keyExtractor(item)} 
                className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    {col.render ? col.render(item) : String(item[col.accessor as keyof T] || '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
