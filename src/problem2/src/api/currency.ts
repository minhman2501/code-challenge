import axios from "axios";
import { formatList } from "../tools";

export type Token = {
  currency: string;
  date: string;
  price: number;
};

const CURRENCY_URL = "https://interview.switcheo.com/prices.json";
export const fetchCurrencies = async () => {
  return await axios.get<Token[]>(CURRENCY_URL).then((res) => {
    return formatList(res.data);
  });
};
