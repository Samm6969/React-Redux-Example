import { ApolloClient } from 'apollo-client'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'

// eslint-disable-next-line import/no-unresolved
import introspectionQueryResultData from '../fragmentTypes'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

const Client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        // TODO: Production quality logging
        // eslint-disable-next-line no-console
        console.group('[GraphQL Error(s)]')
        graphQLErrors.forEach(({ message, locations, path }) => {
          // eslint-disable-next-line no-console
          console.log(
            `Message: ${message}, Location: ${locations}, Path: ${path}`,
          )
        })
        // eslint-disable-next-line no-console
        console.groupEnd()
      }
      // eslint-disable-next-line no-console
      if (networkError) console.error(`[Network error]: ${networkError}`)
    }),
    createUploadLink({
      uri: process.env.API_ENDPOINT,
      credentials: 'same-origin',
    }),
    new HttpLink({
      uri: process.env.API_ENDPOINT,
      credentials: 'same-origin',
    }),
  ]),
  cache: new InMemoryCache({ fragmentMatcher }),
})

export default Client
