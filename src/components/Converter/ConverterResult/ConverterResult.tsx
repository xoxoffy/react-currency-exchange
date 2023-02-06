import { Fragment } from 'react';

interface Props {
  currencyInput: string;
  currencyType: string;
  calculatedExchange: number;
}

const ConverterResults: React.FunctionComponent<Props> = ({
  currencyInput,
  currencyType,
  calculatedExchange,
}) => {
  return (
    <Fragment>
      {currencyInput ? (
        <h2>{`${currencyInput} ${currencyType} = ${Number(
          calculatedExchange
        ).toFixed(2)} PLN`}</h2>
      ) : null}
    </Fragment>
  );
};

export default ConverterResults;
