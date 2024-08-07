import React from 'react';
import './App.css';
import GrapeJSEditor from './components/GrapesJSEditor';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>TEKSTRUCTERS Drag-and-Drop Editor</h1>
      </header>
      <main>
        <GrapeJSEditor />
      </main>
    </div>
  );
}

export default App;