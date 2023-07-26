import 'react-native-gesture-handler'
import { ApolloProvider } from '@apollo/client';
import client from './app/apolloClient';
import FilmList from './app/FIlmList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (

    <GestureHandlerRootView>
      <ApolloProvider client={client}>
        <FilmList />
      </ApolloProvider>
    </GestureHandlerRootView>
  );
}
