import { useState, useEffect } from 'react';
import Loader from './../Loader';
import ConverterResults from './ConverterResult/ConverterResult';
import axios from 'axios';
import './Converter.css';

interface Rate {
  code: string;
}

const Converter: React.FunctionComponent = () => {
  const api_URL = 'https://api.nbp.pl/api/exchangerates/tables/a/?format=json';

  const [currencyInput, setCurrencyInput] = useState<string>('');
  const [currencyType, setCurrencyType] = useState<string>('USD');
  const [calculatedExchange, setCalculatedExchange] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const calculateExchange = () => {
    if (!currencyInput || Number(currencyInput) < 0) return;

    axios
      .get(api_URL)
      .then((response) => {
        const prices = response.data[0].rates;
        const usd = prices.filter((rate: Rate) => rate.code === 'USD')[0].mid;
        const eur = prices.filter((rate: Rate) => rate.code === 'EUR')[0].mid;
        const chf = prices.filter((rate: Rate) => rate.code === 'CHF')[0].mid;

        if (currencyType === 'USD') {
          setCalculatedExchange(Number(currencyInput) * usd);
        } else if (currencyType === 'EUR') {
          setCalculatedExchange(Number(currencyInput) * eur);
        } else if (currencyType === 'CHF') {
          setCalculatedExchange(Number(currencyInput) * chf);
        }
        setIsCalculated(true);
        setIsLoading(false);
      })
      .catch((error) => {
        window.alert(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    calculateExchange();
  }, [currencyType]);

  useEffect(() => {
    setIsCalculated(false);
  }, [currencyInput]);

  return (
    <div className="formContainer">
      <input
        type="number"
        placeholder="Value to calculate"
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

      <button onClick={calculateExchange}>Calculate</button>

      {isLoading ? <Loader /> : null}

      {Number(currencyInput) < 0 ? (
        <p>Please enter an amount greater than 0 </p>
      ) : (
        <ConverterResults
          currencyInput={currencyInput}
          currencyType={currencyType}
          calculatedExchange={calculatedExchange}
          isCalculated={isCalculated}
        />
      )}
    </div>
  );
};

export default Converter;
