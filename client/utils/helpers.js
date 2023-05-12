// data { currency: '', amount: ''}
export const currencyFormatter = (data) => {
  return ((data.amount * 100) / 100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};

export const stripeCurrencyFormatter = (data) => {
  const { amount, currency } = data;
  const currencyCode = currency || "eur"; // Set a default currency code if not provided
  return (amount / 100).toLocaleString(undefined, {
    style: "currency",
    currency: currencyCode,
  });
};

export const formatAmount = (amount, currency) => {
  const currencyCode = currency || "eur"; // Set a default currency code if not provided

  const parsedAmount =
    typeof amount === "string" ? parseInt(amount, 10) : amount;

  return (parsedAmount / 100).toLocaleString(undefined, {
    style: "currency",
    currency: currencyCode,
  });
};
