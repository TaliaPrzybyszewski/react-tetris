import React from 'react';
import Tetris from './components/Tetris';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tetris</h1>
        <Tetris />
      </header>
    </div>
  );
}

export default App;
