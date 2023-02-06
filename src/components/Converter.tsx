import './Converter.css';
import { useState } from 'react';

const Converter: React.FunctionComponent = () => {
  const [currencyInput, setCurrencyInput] = useState<string>('');
  const [currencyType, setCurrencyType] = useState<string>('');
  return (
    <div className="container">
      <input
        type="number"
        placeholder="currency"
        value={currencyInput}
        onChange={(event) => setCurrencyInput(event.target.value)}
      />
      <select onChange={(event) => setCurrencyType(event.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CHF">CHF</option>
      </select>

      <p>{`1 ${currencyType} to `}</p>
    </div>
  );
};

export default Converter;
