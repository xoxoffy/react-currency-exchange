import { Fragment, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Converter from './components/Converter/Converter';

const App = () => {
  const api_URL = 'https://api.nbp.pl/api/exchangerates/tables/a/?format=json';

  const [usdRate, setUsdRate] = useState<string>('');
  const [eurRate, setEurRate] = useState<string>('');
  const [chfRate, setChfRate] = useState<string>('');

  const [currencyRates, setCurrencyRates] = useState([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(api_URL)
      .then((response) => {
        const prices = response.data[0].rates;
        const usd = prices.filter((rate) => rate.code === 'USD')[0].mid;
        const eur = prices.filter((rate) => rate.code === 'EUR')[0].mid;
        const chf = prices.filter((rate) => rate.code === 'CHF')[0].mid;

        setUsdRate(usd);
        setEurRate(eur);
        setChfRate(chf);

        setIsLoading(false);
      })
      .catch((error) => {
        window.alert(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <Fragment>
      <h1>Currency Converter</h1>
      <div className="App">
        <Converter
          usdRate={usdRate}
          eurRate={eurRate}
          chfRate={chfRate}
          isLoading={isLoading}
        />
      </div>
    </Fragment>
  );
};

export default App;
