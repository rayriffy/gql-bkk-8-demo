  
// import _ from 'lodash'

import { IResolvers } from 'graphql-tools'

import { IMedia, IStudio } from './data/anilist'

import { schema } from './schema'

export const resolvers: IResolvers = {
  Query: {
    getMedia: async(_source, args, context, info) => {
      const {id} = args
    
      const raw = await context.dataSources.AniListAPI.getMedia(id) as IMedia
    
      return {
        ...raw,
        studios: raw.studios.nodes.map(o => ({
          id: o.id
        })),
      }
    },
    getStudio: async(_source, args, context, info) => {
      const {id} = args
    
      const raw = await context.dataSources.AniListAPI.getStudio(id) as IStudio
    
      return {
        ...raw,
        works: raw.media.nodes.map(o => ({
          id: o.id,
          type: o.type,
        })),
      }
    },
  },
  Media: {
    studios: async(source, args, context, info) => {
      console.log('studioMerge:source >>', source)
      console.log('studioMerge:info >>', info)
    
      return info.mergeInfo.delegateToSchema({
        schema,
        operation: 'query',
        fieldName: 'getStudio',
        args: {
          id: source.id,
        },
        context,
        info,
      })
    },
  },
  Studio: {
    works: async(source, args, context, info) => {
      console.log('mediaMerge:source >>', source)
      console.log('mediaMerge:info >>', info)
    
      return info.mergeInfo.delegateToSchema({
        schema,
        operation: 'query',
        fieldName: 'getMedia',
        args: {
          id: source.id,
        },
        context,
        info,
      })
    },
  },
}
