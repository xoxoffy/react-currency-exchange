import { Fragment } from 'react';
import './ConverterResult.css';

interface Props {
  currencyInput: string;
  currencyType: string;
  calculatedExchange: number;
  isCalculated: boolean;
}

const ConverterResults: React.FunctionComponent<Props> = ({
  currencyInput,
  currencyType,
  calculatedExchange,
  isCalculated,
}) => {
  return (
    <Fragment>
      {isCalculated ? (
        <span className="currencyResultSpan">{`${currencyInput} ${currencyType} = ${calculatedExchange.toFixed(
          2
        )} PLN`}</span>
      ) : null}
    </Fragment>
  );
};

export default ConverterResults;
