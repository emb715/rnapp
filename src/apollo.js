import { ApolloClient } from 'apollo-client';
import { toIdValue } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:4000/graphql/' }),
  // cache: new InMemoryCache(),
  cache: new InMemoryCache({
    cacheRedirects: {
      Query: {
        Posts: (_, args) => toIdValue(cache.config.dataIdFromObject({ __typename: 'Posts', id: args.id })),
      },
    },
  }),
});

export default client;
