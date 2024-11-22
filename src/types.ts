export interface Continent {
  name: string;
}

export interface ContinentsData {
  continents: Continent[];
}
export interface Language {
  name: string;
}

export interface Country {
  name: string;
  capital: string;
  emoji: string;
  continent?: {
    name: string;
  };
  languages: Language[];
}

export interface CountriesData {
  countries: Country[];
}
