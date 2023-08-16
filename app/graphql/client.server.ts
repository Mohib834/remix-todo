import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  ssrMode: true,
  uri: "https://graphqlzero.almansi.me/api",
});
