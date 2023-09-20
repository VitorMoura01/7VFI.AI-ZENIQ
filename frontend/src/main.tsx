import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.scss'
import Router from './routes/router'

import {
  ApolloClient,
  InMemoryCache,
  HttpLink
  // NormalizedCacheObject,
} from '@apollo/client'
// import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
    
  }),
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  </React.StrictMode>,
)
