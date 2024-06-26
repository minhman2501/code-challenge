import { Token } from "../api/currency";
import { CurrencyConvertInput } from "../schema/currencyConvertForm";

const calculateConversion = (from: number, to: number, amount: number) => {
  const result = (from * amount) / to;
  return result;
};

export const validateAmount = (amount: string) => {
  return /^\d+$/.test(amount) && parseFloat(amount) > 0;
};

//NOTE: Filter out the replicated tokens
export const formatList = (tokenList: Token[]) => {
  let formattedList = tokenList.reduce((acc: Token[], obj) => {
    let isTokenExist = acc.find(({ currency }) => obj.currency === currency);
    if (!isTokenExist) {
      acc.push(obj);
    }
    return acc;
  }, []);

  return formattedList;
};

export const convertCurrency = (data: CurrencyConvertInput) => {
  const tokenFrom: Token = JSON.parse(data.tokenFrom);
  const tokenTo: Token = JSON.parse(data.tokenTo);
  const amount = parseFloat(data.amount);

  if (!isObjectEmpty(tokenFrom) && !isObjectEmpty(tokenTo) && !isNaN(amount)) {
    const convertedAmount = calculateConversion(
      tokenFrom.price,
      tokenTo.price,
      amount,
    );
    return convertedAmount.toString();
  } else return "";
};

export const isObjectEmpty = (obj: Object) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
