import { gql } from '@apollo/client'

// Lightweight query for fetching posts (removed heavy SEO data for performance)
export const GET_POSTS = gql`
  query GetPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after, where: { status: PUBLISH }) {
      nodes {
        id
        slug
        title
        excerpt
        date
        uri
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

// Separate query for detailed SEO data when needed
export const GET_POST_SEO = gql`
  query GetPostSEO($slug: String!) {
    postBy(slug: $slug) {
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
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
          altText
        }
        schema {
          raw
        }
        fullHead
      }
    }
  }
`

// Query for fetching a single post by slug
export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      slug
      date
      excerpt
      content
      featuredImage {
        node {
          sourceUrl
          altText
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
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
          altText
        }
        breadcrumbs {
          text
          url
        }
        schema {
          raw
        }
        fullHead
      }
    }
  }
`

// Query for fetching categories
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories(where: { hideEmpty: true }) {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`

// Query for fetching posts by category
export const GET_POSTS_BY_CATEGORY = gql`
  query GetPostsByCategory($categorySlug: String!, $first: Int, $after: String) {
    posts(
      first: $first
      after: $after
      where: { 
        status: PUBLISH
        categoryName: $categorySlug
      }
    ) {
      nodes {
        id
        slug
        title
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
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
          opengraphTitle
          opengraphDescription
          opengraphImage {
            sourceUrl
            altText
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

// Query for site-wide SEO settings
export const GET_SITE_SEO = gql`
  query GetSiteSEO {
    generalSettings {
      title
      description
      url
    }
    seo {
      schema {
        companyName
        companyLogo {
          sourceUrl
          altText
        }
      }
      webmaster {
        googleVerify
        msVerify
        yandexVerify
      }
    }
  }
`

// Query for menu items (if you still need them)
export const GET_MENU_ITEMS = gql`
  query GetMenuItems($first: Int!, $after: String) {
    posts(first: $first, after: $after, where: { status: PUBLISH, categoryName: "menu-items" }) {
      nodes {
        id
        slug
        title
        excerpt
        content
        featuredImage {
          node {
            sourceUrl
            altText
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
          opengraphTitle
          opengraphDescription
          opengraphImage {
            sourceUrl
            altText
          }
          schema {
            raw
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`
