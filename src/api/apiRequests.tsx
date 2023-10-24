import { randomUUID } from "crypto";
import { QueryParams } from "./interfaces";

export const saveArticleBody = (url: string) => {
  return JSON.stringify({
    query: `
      mutation SaveArticle($input: SaveUrlInput!){
        saveUrl(input: $input) {
          ... on SaveSuccess {
            url
            clientRequestId
          }
          ... on SaveError {
            errorCodes
            message
          }
        }
      }
    `,
    variables: {
      input: {
        url: url,
        source: "raycast",
        clientRequestId: randomUUID(),
      },
    },
  });
};

export const requestBody = (params: QueryParams) => {
  const after = params.after;
  const first = params.first;
  const updatedAt = params.updatedAt;
  const includeContent = params.includeContent;
  const format = params.format;
  const query = params.query;

  return JSON.stringify({
    query: `
      query Search($after: String, $first: Int, $query: String, $includeContent: Boolean, $format: String) {
        search(first: $first, after: $after, query: $query, includeContent: $includeContent, format: $format) {
          ... on SearchSuccess {
            edges {
              node {
                id
                title
                slug
                siteName
                originalArticleUrl
                url
                author
                updatedAt
                description
                image
                savedAt
                pageType
                content
                publishedAt
                readAt
                wordsCount
                isArchived
                readingProgressPercent
                archivedAt
                highlights {
                  id
                  quote
                  annotation
                  patch
                  updatedAt
                  type
                  highlightPositionPercent
                  labels {
                    name
                    color
                  }
                }
                labels {
                  name
                  color
                }
              }
            }
            pageInfo {
              hasNextPage
            }
          }
          ... on SearchError {
            errorCodes
          }
        }
      }`,
    variables: {
      after: `${after}`,
      first,
      query: `${updatedAt ? "updated:" + updatedAt : ""} sort:saved-asc ${query}`,
      includeContent,
      format,
    },
  });
};
