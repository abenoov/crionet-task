export interface Country {
  name: string;
  capital: string;
  emoji: string;
  continent?: {
    name: string;
  };
}

export interface CountriesData {
  countries: Country[];
}
