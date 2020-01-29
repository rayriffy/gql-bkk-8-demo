import { GraphQLDataSource } from 'apollo-datasource-graphql'
import { gql } from 'apollo-server-express'

export enum MediaType {
  ANIME,
  MANGA
}

export interface IMedia {
  id: number
  type: MediaType
  title: {
    romaji: string
    english: string
    native: string
  }
  genres: string[]
  studios: {
    nodes: {
      id: number
    }[]
  }
}
export interface IStudio {
  id: number
  name: string
  isAnimationStudio: boolean
  siteUrl: string
  media: {
    nodes: {
      id: number
      type: MediaType
    }[]
  }
}
 
export class AniListAPI extends GraphQLDataSource {
  baseURL = 'https://graphql.anilist.co'
 
  async getMedia(id: number) {
    try {
      const response = await this.query(
        gql`
          query ($id: Int) {
            Media (id: $id) {
              id
              type
              title {
                romaji
                english
                native
              }
              genres
              studios {
                nodes {
                  id
                }
              }
            }
          }
        `, 
        {
          variables: {
            id
          },
        }
      )

      return response.data.Media
    } catch (err) {
      console.error(err)
    }
  }

  async getStudio(id: number) {
    try {
      const response = await this.query(
        gql`
          query ($id: Int) {
            Studio (id: $id) {
              id
              name
              isAnimationStudio
              siteUrl
              media {
                nodes {
                  id
                  type
                }
              }
            }
          }
        `, 
        {
          variables: {
            id,
          },
        }
      )

      return response.data.Studio
    } catch (err) {
      console.error(err)
    }
  }
}
