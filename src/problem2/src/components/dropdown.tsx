import { useEffect, useState } from "react";
import { Token } from "../api/currency";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

type DropdownProps = {
  currenciesList: Token[];
  activeToken: string;
  className?: string;
  onChange: (token: string) => void;
};

type DropdownButtonProps = {
  activeItem: Token;
  className?: string;
  onClick?: () => void;
};

type DropdownMenuProps = {
  currenciesList: Token[];
  activeItem: Token;
  className?: string;
  itemOnClick: (token: Token) => void;
};

type CurrencyItemProps = {
  token: Token;
  useFor: "list" | "button";
  className?: string;
};

const Dropdown = ({
  currenciesList,
  className,
  onChange,
  activeToken,
}: DropdownProps) => {
  const tokenObj: Token = JSON.parse(activeToken);
  const [activeItem, setActiveItem] = useState<Token>(tokenObj);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleOnChange = (selectedToken: Token) => {
    onChange(JSON.stringify(selectedToken));
    setActiveItem(selectedToken);
  };

  useEffect(() => {
    showMenu ? setShowMenu(!showMenu) : null;
  }, [activeItem]);

  return (
    <div className={clsx("relative", className)}>
      <DropdownButton
        activeItem={activeItem}
        onClick={() => setShowMenu(!showMenu)}
      />
      {showMenu && (
        <DropdownMenu
          currenciesList={currenciesList}
          activeItem={activeItem}
          itemOnClick={handleOnChange}
        />
      )}
    </div>
  );
};

const DropdownButton = ({
  activeItem,
  className,
  onClick,
}: DropdownButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "border-[#37373a] bg-black min-w-full px-4 border-[2px] py-2 gap-4  transition group hover:border-white/80  flex justify-between items-center rounded-3xl",
        className,
      )}
    >
      {activeItem && JSON.stringify(activeItem) !== "{}" ? (
        <TokenItem useFor="button" token={activeItem} className="flex-1" />
      ) : (
        <span className={"text-white/60 font-semibold text-lg"}>
          Select a token
        </span>
      )}
      <ChevronDownIcon className="aspect-square text-white/70 h-4 group-hover:animate-pulse group-hover:text-white" />
    </button>
  );
};

const DropdownMenu = ({
  className,
  currenciesList,
  activeItem,
  itemOnClick,
}: DropdownMenuProps) => {
  return (
    <ul
      className={clsx(
        "p-2 overflow-auto shadow max-h-[200px] absolute top-full z-50 mt-1 flex flex-col gap-2 pr-2 rounded-xl right-0 min-w-[100%] bg-white",
        className,
      )}
    >
      {currenciesList.map((token) => (
        <li
          key={token.currency}
          onClick={() => itemOnClick(token)}
          className={clsx(
            "group w-full p-2 hover:bg-gray-200 rounded-xl cursor-pointer",
            {
              "pointer-events-none bg-lime-400/50":
                activeItem?.currency === token.currency,
            },
          )}
        >
          <TokenItem useFor="list" token={token} />
        </li>
      ))}
    </ul>
  );
};

const TokenItem = ({ token, useFor, className }: CurrencyItemProps) => {
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <img
        src={
          token.currency
            ? `/tokens/${token.currency}.svg`
            : "/tokens/default.svg"
        }
        alt=""
        className="aspect-square w-7"
      />
      <span
        className={clsx("font-semibold text-lg", {
          "text-white": useFor === "button",
          "text-black": useFor === "list",
        })}
      >
        {token.currency}
      </span>
    </div>
  );
};

export default Dropdown;
