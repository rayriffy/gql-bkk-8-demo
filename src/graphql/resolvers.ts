  
// import _ from 'lodash'

import { IResolvers, IFieldResolver } from 'apollo-server-express'

import { IGetAnimeResponse } from './data/anilist'

const anime: IFieldResolver<undefined, any, {id: number}> = async(_source, args, context) => {
  const {id} = args

  const raw = await context.dataSources.AniListAPI.getAnime(id) as IGetAnimeResponse

  return {
    id: raw.id,
    name: {
      romaji: raw.title.romaji,
      english: raw.title.english,
      japanese: raw.title.native,
    },
    studios: raw.studios.nodes.map(o => {
      console.log(o)
      return {
        id: o.id,
        name: o.name,
        works: o.media.edges.map(o => o.id),
      }
    }),
  }
}

export const resolvers: IResolvers = {
  Query: {
		anime,
  },
}
