import React, { useMemo, useEffect, useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';

const CellTable = () => {
  const [data, setData] = useState([]);
  const [newCell, setNewCell] = useState({ row: '', column: '', value: '' });
  const [editCell, setEditCell] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3000/api/cells')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: ' Discharge Port',
        accessor: 'value',
      },
      {
        Header: 'Seven Islands total',
        accessor: 'row',
      },
      {
        Header: 'Seven Islands IFO',
        accessor: 'column',
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => setEditCell(row.original)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => deleteCell(row.original.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCell(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCell(prevState => ({ ...prevState, [name]: value }));
  };

  const createCell = () => {
    axios.post('http://localhost:3000/api/cells', newCell)
      .then(response => {
        setNewCell({ row: '', column: '', value: '' });
        fetchData();
      })
      .catch(error => {
        console.error('Error creating cell:', error);
      });
  };

  const updateCell = () => {
    axios.put(`http://localhost:3000/api/cells/${editCell.id}`, editCell)
      .then(response => {
        setEditCell(null);
        fetchData();
      })
      .catch(error => {
        console.error('Error updating cell:', error);
      });
  };

  const deleteCell = (id) => {
    axios.delete(`http://localhost:3000/api/cells/${id}`)
      .then(response => {
        fetchData();
      })
      .catch(error => {
        console.error('Error deleting cell:', error);
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="mb-4">
        <h2 className="text-2xl mb-2">Create New Cell</h2>
        <div className="flex space-x-2 mb-4">
          <input
            type="number"
            name="row"
            placeholder="Row"
            value={newCell.row}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="number"
            name="column"
            placeholder="Column"
            value={newCell.column}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="text"
            name="value"
            placeholder="Value"
            value={newCell.value}
            onChange={handleChange}
            className="border p-2"
          />
          <button onClick={createCell} className="bg-green-500 text-white px-4 py-2 rounded">
            Create
          </button>
        </div>
      </div>

      {editCell && (
        <div className="mb-4">
          <h2 className="text-2xl mb-2">Edit Cell</h2>
          <div className="flex space-x-2 mb-4">
            <input
              type="number"
              name="row"
              placeholder="Row"
              value={editCell.row}
              onChange={handleEditChange}
              className="border p-2"
            />
            <input
              type="number"
              name="column"
              placeholder="Column"
              value={editCell.column}
              onChange={handleEditChange}
              className="border p-2"
            />
            <input
              type="text"
              name="value"
              placeholder="Value"
              value={editCell.value}
              onChange={handleEditChange}
              className="border p-2"
            />
            <button onClick={updateCell} className="bg-blue-500 text-white px-4 py-2 rounded">
              Update
            </button>
            <button onClick={() => setEditCell(null)} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}

      <table {...getTableProps()} className="min-w-full bg-white border">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="w-full border-b">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="px-4 py-2 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-b">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="px-4 py-2 whitespace-no-wrap text-sm leading-5 text-gray-900">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CellTable;
