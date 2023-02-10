import { Fragment } from 'react';
import './App.css';

import Converter from './components/Converter/Converter';

const App = () => {
  return (
    <Fragment>
      <h1>Currency Converter</h1>
      <div className="App">
        <Converter />
      </div>
    </Fragment>
  );
};

export default App;
