import 'graphql-import-node'
import * as typeDefs from './schema.gql'

import { GraphQLSchema } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'

import { resolvers } from './resolvers'

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
