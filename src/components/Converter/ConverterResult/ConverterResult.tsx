import { Fragment } from 'react';
import './ConverterResult.css';

interface Props {
  enteredInput: string;
  selectedCurrencyType: string;
  calculatedExchange: number;
  isCalculated: boolean;
}

const ConverterResults: React.FunctionComponent<Props> = ({
  enteredInput,
  selectedCurrencyType,
  calculatedExchange,
  isCalculated,
}) => {
  return (
    <Fragment>
      {isCalculated ? (
        <span className="currencyResultSpan">{`${enteredInput} ${selectedCurrencyType} = ${calculatedExchange.toFixed(
          2
        )} PLN`}</span>
      ) : null}
    </Fragment>
  );
};

export default ConverterResults;
