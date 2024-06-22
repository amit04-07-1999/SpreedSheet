import React from 'react';
import CellTable from './components/CellTable';

function App() {
  return (
    <div className="App">
      <header className="bg-blue-500 p-4 text-white text-center">
        <h1 className="text-2xl">Spreadsheet Application</h1>
      </header>
      <main className="p-4">
        <CellTable />
      </main>
    </div>
  );
}

export default App;
