import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_COUNTRIES } from "../graphql/queries";
import { CountriesData } from "../types";

const CountryList: React.FC = () => {
  const [selectedContinent, setSelectedContinent] = useState<string | null>(
    null
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const { loading, error, data } = useQuery<CountriesData>(GET_ALL_COUNTRIES);

  if (loading) return <p>Loading countries...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const allLanguages = data?.countries.reduce((acc, country) => {
    country.languages.forEach((language) => {
      acc.push(language.name);
    });
    return acc;
  }, [] as string[]);

  const uniqueLanguages = Array.from(new Set(allLanguages));

  const filteredCountries = data?.countries.filter((country) => {
    if (selectedContinent && country.continent?.name !== selectedContinent) {
      return false;
    }
    if (
      selectedLanguage &&
      !country.languages.some((lang) => lang.name === selectedLanguage)
    ) {
      return false;
    }
    return true;
  });

  const sortedCountries = [...(filteredCountries || [])].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Countries</h1>

      <select
        onChange={(e) => setSelectedContinent(e.target.value || null)}
        className="p-2 border border-gray-300 rounded mb-4"
      >
        <option value="">All Continents</option>
        {data?.countries
          .map((country) => country.continent?.name)
          .filter((v, i, a) => a.indexOf(v) === i)
          .map((continent) => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
      </select>

      <select
        onChange={(e) => setSelectedLanguage(e.target.value || null)}
        className="p-2 border border-gray-300 rounded mb-4"
      >
        <option value="">All Languages</option>
        {uniqueLanguages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>

      <ul className="list-disc pl-5">
        {sortedCountries.map((country) => (
          <li key={country.name} className="mb-2">
            <div className="flex flex-col">
              <span>Capital: {country.capital}</span>
              <span>Country: {country.name}</span>
              <span>Continent: ({country.continent?.name})</span>
              <span>
                Languages:{" "}
                {country.languages.map((lang) => lang.name).join(", ")}
              </span>
              <span className="ml-2">{country.emoji}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
