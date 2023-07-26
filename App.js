import { ApolloProvider } from '@apollo/client';
import client from './app/apolloClient';
import FilmList from './app/FIlmList';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <FilmList />
    </ApolloProvider>
  );
}
