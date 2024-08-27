export interface ICountry {
  id: Number | null;
  name: String;
  internetCountryCode: String;
  countryCallingCode: String;
  nationality?: String;
  flag?: String;
}
