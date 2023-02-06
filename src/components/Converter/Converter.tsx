import './Converter.css';
import { useState, useEffect } from 'react';
import Loader from './../Loader';
import ConverterResults from './ConverterResult/ConverterResult';

interface Props {
  usdRate: string;
  eurRate: string;
  chfRate: string;
  isLoading: boolean;
}

const Converter: React.FunctionComponent<Props> = ({
  usdRate,
  eurRate,
  chfRate,
  isLoading,
}) => {
  const [currencyInput, setCurrencyInput] = useState<string>('');
  const [currencyType, setCurrencyType] = useState<string>('USD');
  const [calculatedExchange, setCalculatedExchange] = useState<number>(0);

  const calculateExchange = () => {
    if (!currencyInput || Number(currencyInput) < 0) return;

    if (currencyType === 'USD') {
      setCalculatedExchange(Number(currencyInput) * Number(usdRate));
    } else if (currencyType === 'EUR') {
      setCalculatedExchange(Number(currencyInput) * Number(eurRate));
    } else if (currencyType === 'CHF') {
      setCalculatedExchange(Number(currencyInput) * Number(chfRate));
    }
  };

  useEffect(() => {
    calculateExchange();
  }, [currencyInput, currencyType]);

  return (
    <div className="formContainer">
      <input
        type="number"
        placeholder={currencyType}
        value={currencyInput}
        onChange={(event) => setCurrencyInput(event.target.value)}
        min={0}
      />
      <select
        onChange={(event) => {
          setCurrencyType(event.target.value);
        }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CHF">CHF</option>
      </select>

      {isLoading ? <Loader /> : null}

      {Number(currencyInput) < 0 ? (
        <p>Please enter an amount greater than 0 </p>
      ) : (
        <ConverterResults
          currencyInput={currencyInput}
          currencyType={currencyType}
          calculatedExchange={calculatedExchange}
        />
      )}
    </div>
  );
};

export default Converter;
