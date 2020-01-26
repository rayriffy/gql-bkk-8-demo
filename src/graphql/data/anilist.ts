import { GraphQLDataSource } from 'apollo-datasource-graphql'
import { gql } from 'apollo-server-express'

export interface IGetAnimeResponse {
  id: number
  title: {
    romaji: string
    english: string
    native: string
  }
  coverImage: {
    large: string
  }
  genres: string[]
  studios: {
    nodes: {
      id: number
      name: string
      media: {
        edges: {
          id: number
        }[]
      }
    }[]
  }
}
 
export class AniListAPI extends GraphQLDataSource {
  baseURL = 'https://graphql.anilist.co'
 
  async getAnime(id: number) {
    try {
      const response = await this.query(gql`
        query ($id: Int) {
          Media (id: $id, type: ANIME) {
            id
            title {
              romaji
              english
              native
            }
            coverImage {
              large
            }
            genres
            studios {
              nodes {
                id
                name
                media {
                  edges {
                    id
                  }
                }
              }
            }
          }
        }
      `, {
      variables: {
        id,
      },
      })
 
      return response.data.Media;
    } catch (error) {
      console.error(error);
    }
  }
}
