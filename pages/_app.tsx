import '@/styles/globals.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import type { AppProps } from 'next/app'

import React from 'react'

const App = ({ Component, pageProps }: AppProps) => {
  const client = new ApolloClient({
    uri: 'https://replaceme.com/',
    cache: new InMemoryCache(),
  });

  return(
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App