import axios from "axios";
import { formatList } from "../tools";

export type Currency = {
  currency: string;
  date: string;
  price: number;
};

const CURRENCY_URL = "https://interview.switcheo.com/prices.json";
export const fetchCurrencies = async () => {
  return await axios.get<Currency[]>(CURRENCY_URL).then((res) => {
    return formatList(res.data);
  });
};
