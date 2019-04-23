import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import NavigatorService from './src/services/navigator';
import apolloClient from './src/apollo';
import store from './src/store';
import theme from './src/theme';
import Routes from './src/routes';

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
          <PaperProvider theme={theme}>
            <Routes
              ref={(navigatorRef) => {
                NavigatorService.initialize(navigatorRef);
              }}
              onNavigationStateChange={(prevState, newState, action) => NavigatorService.stateChange(prevState, newState, action)}
              uriPrefix={''}
            />
          </PaperProvider>
      </Provider>
    </ApolloProvider>
  );
}
