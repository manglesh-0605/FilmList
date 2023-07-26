import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
});

const authLink = setContext((_, { headers }) => {
  // Add any authorization headers here if required by your API
  return {
    headers: {
      ...headers,
      // Example for adding an authorization token
      // Authorization: `Bearer YOUR_ACCESS_TOKEN`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
