export const countries = [
  { name: "United States", code: "US", phoneCode: "+1", currency: "USD" },
  { name: "Canada", code: "CA", phoneCode: "+1", currency: "CAD" },
  { name: "United Kingdom", code: "GB", phoneCode: "+44", currency: "GBP" },
  { name: "Australia", code: "AU", phoneCode: "+61", currency: "AUD" },
  { name: "Germany", code: "DE", phoneCode: "+49", currency: "EUR" },
  { name: "France", code: "FR", phoneCode: "+33", currency: "EUR" },
  { name: "Italy", code: "IT", phoneCode: "+39", currency: "EUR" },
  { name: "Spain", code: "ES", phoneCode: "+34", currency: "EUR" },
  { name: "Japan", code: "JP", phoneCode: "+81", currency: "JPY" },
  { name: "China", code: "CN", phoneCode: "+86", currency: "CNY" },
  { name: "India", code: "IN", phoneCode: "+91", currency: "INR" },
  { name: "Brazil", code: "BR", phoneCode: "+55", currency: "BRL" },
  { name: "Mexico", code: "MX", phoneCode: "+52", currency: "MXN" },
  { name: "South Korea", code: "KR", phoneCode: "+82", currency: "KRW" },
  { name: "Russia", code: "RU", phoneCode: "+7", currency: "RUB" },
  { name: "South Africa", code: "ZA", phoneCode: "+27", currency: "ZAR" },
  { name: "Singapore", code: "SG", phoneCode: "+65", currency: "SGD" },
  { name: "New Zealand", code: "NZ", phoneCode: "+64", currency: "NZD" },
  { name: "Switzerland", code: "CH", phoneCode: "+41", currency: "CHF" },
  { name: "Sweden", code: "SE", phoneCode: "+46", currency: "SEK" },
  { name: "Norway", code: "NO", phoneCode: "+47", currency: "NOK" },
  { name: "Denmark", code: "DK", phoneCode: "+45", currency: "DKK" },
  { name: "Finland", code: "FI", phoneCode: "+358", currency: "EUR" },
  { name: "Ireland", code: "IE", phoneCode: "+353", currency: "EUR" },
  { name: "Netherlands", code: "NL", phoneCode: "+31", currency: "EUR" },
  { name: "Belgium", code: "BE", phoneCode: "+32", currency: "EUR" },
  { name: "Austria", code: "AT", phoneCode: "+43", currency: "EUR" },
  { name: "Portugal", code: "PT", phoneCode: "+351", currency: "EUR" },
  { name: "Greece", code: "GR", phoneCode: "+30", currency: "EUR" },
  { name: "Israel", code: "IL", phoneCode: "+972", currency: "ILS" },
  {
    name: "United Arab Emirates",
    code: "AE",
    phoneCode: "+971",
    currency: "AED",
  },
  { name: "Saudi Arabia", code: "SA", phoneCode: "+966", currency: "SAR" },
  { name: "Qatar", code: "QA", phoneCode: "+974", currency: "QAR" },
  { name: "Turkey", code: "TR", phoneCode: "+90", currency: "TRY" },
  { name: "Egypt", code: "EG", phoneCode: "+20", currency: "EGP" },
  { name: "Morocco", code: "MA", phoneCode: "+212", currency: "MAD" },
  { name: "Kenya", code: "KE", phoneCode: "+254", currency: "KES" },
  { name: "Nigeria", code: "NG", phoneCode: "+234", currency: "NGN" },
  { name: "Ghana", code: "GH", phoneCode: "+233", currency: "GHS" },
  { name: "Argentina", code: "AR", phoneCode: "+54", currency: "ARS" },
  { name: "Colombia", code: "CO", phoneCode: "+57", currency: "COP" },
  { name: "Chile", code: "CL", phoneCode: "+56", currency: "CLP" },
  { name: "Peru", code: "PE", phoneCode: "+51", currency: "PEN" },
  { name: "Indonesia", code: "ID", phoneCode: "+62", currency: "IDR" },
  { name: "Malaysia", code: "MY", phoneCode: "+60", currency: "MYR" },
  { name: "Thailand", code: "TH", phoneCode: "+66", currency: "THB" },
  { name: "Vietnam", code: "VN", phoneCode: "+84", currency: "VND" },
  { name: "Philippines", code: "PH", phoneCode: "+63", currency: "PHP" },
  { name: "Taiwan", code: "TW", phoneCode: "+886", currency: "TWD" },
  { name: "Hong Kong", code: "HK", phoneCode: "+852", currency: "HKD" },
];

export const getCurrencySymbol = (currencyCode: string): string => {
  const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CNY: "¥",
    INR: "₹",
    AUD: "A$",
    CAD: "C$",
    CHF: "CHF",
    HKD: "HK$",
    NZD: "NZ$",
    SEK: "kr",
    KRW: "₩",
    SGD: "S$",
    NOK: "kr",
    MXN: "$",
    BRL: "R$",
    RUB: "₽",
    ZAR: "R",
    TRY: "₺",
    NGN: "₦",
    AED: "د.إ",
  };

  return currencySymbols[currencyCode] || currencyCode;
};

export const getCountryByCode = (code: string) => {
  return countries.find((country) => country.code === code);
};

export const getCountryByName = (name: string) => {
  return countries.find((country) => country.name === name);
};

export default countries;
