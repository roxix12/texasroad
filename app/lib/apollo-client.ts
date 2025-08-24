import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client'
import { WORDPRESS_CONFIG } from './config'

// Create HTTP link to GraphQL endpoint
const httpLink = createHttpLink({
  uri: WORDPRESS_CONFIG.API_URL,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Texas-Roadhouse-Menu-App/2.0',
  }
})

// Create Apollo Client instance
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            // Cache posts with cursor-based pagination
            keyArgs: ['where'],
            merge(existing = { nodes: [], pageInfo: {} }, incoming) {
              return {
                ...incoming,
                nodes: [...(existing.nodes || []), ...incoming.nodes],
                pageInfo: incoming.pageInfo,
              }
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-and-network',
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    },
  },
})

// Export a function to get client for server-side usage
export function getApolloClient() {
  return apolloClient
}
