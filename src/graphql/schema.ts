import { gql } from 'apollo-server-express'

export const schema = gql`
  type Query {
    anime(id: Int!): Anime!
    mangas(id: Int!): [Manga!]!
  }

  interface Publication {
    id: Int!
    name: LocaleText
  }

  interface LocaleText {
    english: String!
    japanese: String!
    romaji: String!
  }

  type Anime implements Publication {
    id: Int!
    name: LocaleText
    studios: [Studios!]!
    genres: [String!]!
  }

  type Manga implements Publication {
    id: Int!
    name: LocaleText
    publisher: Publisher!
    genres: [String!]!
  }

  type Studios {
    id: Int!
    name: String!
    works: [Int!]!
  }

  type Publisher {
    id: Int!
    name: String!
    works: [Manga!]!
  }
`
