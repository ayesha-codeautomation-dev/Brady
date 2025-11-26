type FormatCurrencyProps = {
  amount: number | string;
  currencyCode?: string;
  locale?: string;
};

const formatCurrency = (props: FormatCurrencyProps) => {
  const { amount, currencyCode = 'USD', locale = 'en-US' } = props;
  let amountValue: number = 0;

  if (typeof amount === 'string') {
    amountValue = parseFloat(amount);
  } else {
    amountValue = amount;
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode
  });

  return formatter.format(amountValue);
};

export default formatCurrency;
