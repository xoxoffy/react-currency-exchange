import { Fragment, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Converter from './components/Converter/Converter';

function App() {
  const api_URL = 'https://api.nbp.pl/api/exchangerates/tables/a/?format=json';

  const [usdRate, setUsdRate] = useState('');
  const [eurRate, setEurRate] = useState('');
  const [chfRate, setChfRate] = useState('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(api_URL)
      .then((response) => {
        const prices = response.data[0].rates;
        const usd = prices.filter((rate: any) => rate.code === 'USD')[0].mid;
        const eur = prices.filter((rate: any) => rate.code === 'EUR')[0].mid;
        const chf = prices.filter((rate: any) => rate.code === 'CHF')[0].mid;

        setUsdRate(usd);
        setEurRate(eur);
        setChfRate(chf);

        setIsLoading(false);
      })
      .catch((error) => {
        window.alert(error);
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
}

export default App;
