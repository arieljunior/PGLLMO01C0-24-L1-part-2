import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

const API_URL = 'https://mock.shop/api'//process.env.GRAPHQL_API_SHOP_URL;
console.log('API_URL',API_URL)
export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: API_URL }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: relayStylePagination(),
        },
      },
    },
  }),
});