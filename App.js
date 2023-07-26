import 'react-native-gesture-handler';
import { ApolloProvider } from '@apollo/client';
import { StyleSheet, Text, View } from 'react-native';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
