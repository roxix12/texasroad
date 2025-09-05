import { gql } from '@apollo/client'

export const GET_POST_SEO = gql`
  query GetPostSEO($id: ID!, $idType: PostIdType!) {
    post(id: $id, idType: $idType) {
      id
      title
      content
      date
      slug
      excerpt
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      seo {
        title
        metaDesc
        canonical
        metaKeywords
        metaRobotsNoindex
        metaRobotsNofollow
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
        schema {
          raw
        }
        breadcrumbs {
          text
          url
        }
        fullHead
      }
    }
  }
`

export const GET_ALL_POSTS_SLUGS = gql`
  query GetAllPostsSlugs {
    posts(first: 100, where: { status: PUBLISH }) {
      nodes {
        slug
        date
      }
    }
  }
`
