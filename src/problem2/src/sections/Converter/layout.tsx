import CurrencyConvertForm from "./ConvertForm";

const ConverterSection: React.FC = () => {
  return (
    <section
      id="convertSection"
      className="bg-black h-screen flex items-center"
    >
      <div className="container">
        <div className="text-white">
          <h2 className="text-4xl font-bold">Exchange</h2>
          <p className="text-xl mt-2">
            based on the current market condition with zero fees. You can
            instantly convert your crypto anytime with a live price
          </p>
        </div>
        <CurrencyConvertForm />
      </div>
    </section>
  );
};

export default ConverterSection;
