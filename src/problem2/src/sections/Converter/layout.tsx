import CurrencyConvertForm from "./ConvertForm";

const ConverterSection: React.FC = () => {
  return (
    <section
      id="convertSection"
      className="bg-black h-screen flex items-center"
    >
      <div className="container flex flex-col items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold uppercase">Exchange</h1>
          <p className="text-xl mt-2">
            Fill in the information below to convert your currency
          </p>
        </div>
        <CurrencyConvertForm />
      </div>
    </section>
  );
};

export default ConverterSection;
