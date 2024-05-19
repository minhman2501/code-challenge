interface WalletBalance {
  currency: string;
  amount: number;
  //add container property to WalletBalanceInterface since this property will be use in the getPriority() function 
  blockchain: string
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}

  // Move the function outside of the component for better reading
  // Set the blockchain parameter data type to be the same type of the WalletBalance 'blockchain' property
	const getPriority = (blockchain: WalletBalance["blockchain"]): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	    case 'Neo': //Since Neo and Zilliqa return the same value, I can combine their cases to return the same value
	      return 20
	    default:
	      return -99
	  }
	}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Things I have done
  // . Sorten the return condition by using tenary operator
  // . Change the parameter names to be more readable 

  const sortedBalances = useMemo(() => {
    return balances
    .filter((balance: WalletBalance) => balance.amount <= 0 && getPriority(balance.blockchain) > -99)
    .sort((leftHandBalance: WalletBalance, rightHandBalance: WalletBalance) => getPriority(rightHandBalance.blockchain) - getPriority(leftHandBalance.blockchain) > 0 ? 1 : -1 );
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  // Call the correct function
  const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}

// Export the component
export default WalletPage
