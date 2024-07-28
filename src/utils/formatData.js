// formatData.js
const formattedDate = (date) => {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();

  return `${day}.${month}.${year}`;
};

const formattedCurrency = (currency) => {
  if (isNaN(currency)) {
    return '';
  }

  const formattedNumber = Number(currency).toFixed(2);
  const [integerPart, decimalPart] = formattedNumber.split('.');
  const integerPartWithSeparators = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${integerPartWithSeparators},${decimalPart}`;
};

const formatData = (data, type) => {
  if (type === 'date') {
    return formattedDate(data);
  } else if (type === 'currency') {
    return formattedCurrency(data);
  } else {
    return data;
  }
};

export { formattedDate, formattedCurrency, formatData };
