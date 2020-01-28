/* Apollo */
import { MemcachedCache } from 'apollo-server-cache-memcached'
import { ApolloServer } from 'apollo-server-express'
import { DataSources } from 'apollo-server-core/src/graphqlOptions'

/* Server */
import cors from 'cors'
import express from 'express'

/* Apollo config */
import { schema } from './graphql/schema'

import { AniListAPI } from './graphql/data/anilist'

const server = express()
// const {ENGINE_API_KEY} = process.env

const API = new AniListAPI() as DataSources<{}>

/**
 * Summon Apollo GraphQL
 */
const apollo = new ApolloServer({
  schema,
  dataSources: () => ({
    AniListAPI: API,
  }),
  persistedQueries: {
    cache: new MemcachedCache(
      ['memcached-server-1', 'memcached-server-2', 'memcached-server-3'],
      { retries: 10, retry: 10000 }
    ),
  },
  engine: {
    apiKey: 'x',
  },
  introspection: true,
  playground: true,
  tracing: true,
  cacheControl: true,
})

/**
 * Server initialization
 */

server.use(cors())

apollo.applyMiddleware({
  app: server,
  path: '/',
  cors: false,
})

server.listen(4000)

export default server
