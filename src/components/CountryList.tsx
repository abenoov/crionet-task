import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_COUNTRIES } from "../graphql/queries";
import { CountriesData } from "../types";

const CountryList: React.FC = () => {
  const { loading, error, data } = useQuery<CountriesData>(GET_ALL_COUNTRIES);

  if (loading) return <p>Loading countries...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Countries</h1>
      <ul className="list-disc pl-5">
        {data?.countries.map((country) => (
          <li key={country.name} className="mb-2">
            <div className="flex flex-col">
              <span>Capital: {country.capital}</span>
              <span>Country: {country.name}</span>
              <span>Continent: ({country.continent?.name})</span>
              <span className="ml-2">{country.emoji}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
