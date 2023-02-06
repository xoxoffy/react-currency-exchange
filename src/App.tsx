import { useState } from 'react';
import './App.css';
import Converter from './components/Converter';

function App() {
  return (
    <div>
      <h1>Currency Converter</h1>
      <Converter />
    </div>
  );
}

export default App;
