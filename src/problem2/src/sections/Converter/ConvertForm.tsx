import { useEffect, useState } from "react";
import { Token, fetchCurrencies } from "../../api/currency";
import {
  CurrencyConvertFormSchema,
  CurrencyConvertInput,
} from "../../schema/currencyConvertForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Dropdown from "../../components/dropdown";
import { convertCurrency } from "../../tools";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const CurrencyConvertForm: React.FC = () => {
  const [currencyList, setCurrencyList] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");

  const initialInput: CurrencyConvertInput = {
    tokenFrom: "{}",
    amount: "",
    tokenTo: "{}",
  };

  const [formData, setFormData] = useState<CurrencyConvertInput>(initialInput);

  useEffect(() => {
    fetchCurrencies().then((data) => setCurrencyList(data));
  }, []);

  //NOTE: Perform the currency conversion when the formData changes its values
  useEffect(() => {
    const convertedAmount = convertCurrency(formData);
    setResult(convertedAmount);
  }, [formData]);

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<CurrencyConvertInput>({
    mode: "all",
    reValidateMode: "onSubmit",
    resolver: zodResolver(CurrencyConvertFormSchema),
    defaultValues: initialInput,
  });

  const handleResetData = () => {
    reset();
    setFormData(initialInput);
    setResult("");
  };

  //NOTE: Currently the resolver can't control entirely the value of formData so this is only a submit demonstration
  const mockSubmit = () => {
    if (isValid && result != "") {
      setLoading(true);
      setTimeout(() => {
        handleResetData();
        alert("Converted Successfully");
        setLoading(false);
      }, 2000);
    }
  };

  //NOTE: Submit the data
  const onSubmitHandler: SubmitHandler<CurrencyConvertInput> = (values, e) => {
    e?.preventDefault();
  };

  return (
    <form
      id="currencyConvertForm"
      onSubmit={handleSubmit(onSubmitHandler)}
      className="w-[50%] my-8"
    >
      <div className="w-full rounded-xl flex flex-col divide-y border-[2px] bg-[#262629] divide-[#37373a] border-[#37373a]">
        <div className="p-4 w-full">
          <h3 className="text-[#868688] font-bold text-xl">
            Currency Converter
          </h3>
        </div>

        <div className="p-4">
          <div className="flex flex-col gap-2 relative">
            <div
              id="currencyFromTextField"
              className="p-2  border rounded-3xl flex bg-[#1e1e21] items-center gap-4 border-[#37373a]"
            >
              <input
                className="w-full bg-inherit text-lg ml-4  text-white font-bold outline-none"
                type="text"
                placeholder="From"
                {...register("amount", {
                  value: formData.amount,
                  onChange: (e) => {
                    setFormData((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }));
                  },
                })}
              />

              <Dropdown
                className="min-w-[30%]"
                currenciesList={currencyList}
                activeToken={formData.tokenFrom}
                onChange={(token) =>
                  setFormData((prev) => ({ ...prev, tokenFrom: token }))
                }
              />
            </div>

            <SwapTokenPositionButton
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  tokenFrom: prev.tokenTo,
                  tokenTo: prev.tokenFrom,
                }));
              }}
            />

            <div
              id="currencyToTextField"
              className="p-2 border rounded-3xl flex bg-[#1e1e21] items-center gap-4 border-[#37373a]"
            >
              <input
                className="w-full ml-4 bg-inherit text-lg text-white pointer-events-none cursor-default font-bold outline-none"
                type="text"
                placeholder="To"
                value={result}
              />
              <Dropdown
                className="min-w-[30%]"
                currenciesList={currencyList}
                activeToken={formData.tokenTo}
                onChange={(token) =>
                  setFormData((prev) => ({ ...prev, tokenTo: token }))
                }
              />
            </div>
          </div>
          {errors.amount && (
            <ErrorMessage>{errors.amount.message}</ErrorMessage>
          )}
        </div>

        <div className="p-4 w-full">
          <button
            onClick={mockSubmit}
            disabled={loading || !isValid || result === ""}
            className="bg-lime-200 disabled:bg-gray-500 disabled:text-gray-800 text-lg w-full py-3 rounded-[100px] font-semibold"
          >
            {loading ? "Converting..." : "Continue to Convert"}
          </button>
        </div>
      </div>
    </form>
  );
};

const ErrorMessage = ({ children }: { children: string | undefined }) => {
  return (
    <div className="px-4 mt-4 flex text-red-500 gap-2 items-center">
      <ExclamationTriangleIcon className="h-6 aspect-square" />
      <span className="capitalize font-semibold">{children}</span>
    </div>
  );
};

const SwapTokenPositionButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="rounded-[100%] hover:border-white transition bg-[#1e1e21] p-2 border absolute top-[50%] translate-x-[-50%] translate-y-[-50%] left-[50%] border-[#37373a]"
    >
      <img src="/swap.svg" alt="" className="text-white w-7 aspect-square" />
    </button>
  );
};

export default CurrencyConvertForm;
