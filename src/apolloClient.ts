import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/", // URL GraphQL API
  cache: new InMemoryCache(),
});

export default client;
