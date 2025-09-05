import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })
  }

  if (networkError) {
    console.error(`Network error: ${networkError}`)
    
    // Retry logic for network errors
    if (networkError.statusCode === 500) {
      console.log('Retrying GraphQL request...')
      return forward(operation)
    }
  }
})

// HTTP link to WordPress GraphQL endpoint
const httpLink = createHttpLink({
  uri: 'https://admin.texasroadhouse-menus.us/graphql',
  fetch: (uri, options) => {
    return fetch(uri, {
      ...options,
      headers: {
        ...options?.headers,
        'User-Agent': 'Texas-Roadhouse-Menu-App/1.0',
      },
    })
  },
})

// Create Apollo Client instance
const client = new ApolloClient({
  ssrMode: typeof window === 'undefined', // Enable SSR mode on server
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Post: {
        keyFields: ['id'],
      },
      MediaItem: {
        keyFields: ['id'],
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    },
  },
})

// Export a function to get the client (SSR-friendly)
export function getClient(): ApolloClient<any> {
  return client
}

// Export the client instance for direct use
export default client
