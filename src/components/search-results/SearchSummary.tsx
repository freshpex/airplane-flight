interface SearchSummaryProps {
  from: string;
  to: string;
  departDate: string;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  cabinClass: string;
}

const SearchSummary = ({
  from,
  to,
  departDate,
  passengers,
  cabinClass,
}: SearchSummaryProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <h2 className="text-xl font-bold mb-2">
        {from} to {to}
      </h2>
      <div className="text-gray-600">
        {departDate} • {passengers.adults} Adult
        {passengers.adults !== 1 ? "s" : ""}
        {passengers.children > 0 &&
          `, ${passengers.children} Child${passengers.children !== 1 ? "ren" : ""}`}
        {passengers.infants > 0 &&
          `, ${passengers.infants} Infant${passengers.infants !== 1 ? "s" : ""}`}
        • {cabinClass}
      </div>
    </div>
  );
};

export default SearchSummary;
