import { IResolvers } from 'graphql-tools'

import { IMedia, IStudio } from './data/anilist'

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
        })),
      }
    },
  },
  Media: {
    studios: async(source: any, args, context, info) => {
      const { studios } = source

      const res = await studios.map(async (studio: { id: number }) => {
        const { id } = studio

        const resStudio = await context.dataSources.AniListAPI.getStudio(id) as IStudio

        return {
          ...resStudio,
          works: resStudio.media.nodes.map(o => ({
            id: o.id,
          })),
        }
      })

      return res
    },
  },
  Studio: {
    works: async(source: any, args, context, info) => {
      const { works } = source

      const res = await works.map(async (work: { id: number }) => {
        const { id } = work

        const resMedia = await context.dataSources.AniListAPI.getMedia(id) as IMedia

        return {
          ...resMedia,
          studios: resMedia.studios.nodes.map(o => ({
            id: o.id
          })),
        }
      })

      return res
    },
  },
}
