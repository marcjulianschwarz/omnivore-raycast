import { useFetch } from "@raycast/utils";
import { requestBody, saveArticleBody } from "./apiRequests";
import { Article, SaveResponse, SearchResponse } from "./interfaces";
import fetch from "node-fetch";
import { getPreferenceValues } from "@raycast/api";

const API_KEY = getPreferenceValues().omnivoreApiKey;

const requestHeaders = (apiKey: string) => ({
  "Content-Type": "application/json",
  authorization: apiKey,
  "X-OmnivoreClient": "raycast-extension",
});

export async function saveArticle(url: string) {
  const res = await fetch("https://api-prod.omnivore.app/api/graphql", {
    headers: requestHeaders(API_KEY),
    body: saveArticleBody(url),
    method: "POST",
  });
  const resJson = await res.json();
  const saveRes = resJson as SaveResponse;
  if ("errorCodes" in saveRes.data.saveUrl) {
    return saveRes.data.saveUrl.message;
  } else {
    return "Success";
  }
}

export function useArticles() {
  const params = {
    after: "",
    first: 50,
    endpoint: "https://api-prod.omnivore.app/api/graphql",
    apiKey: API_KEY,
    format: "html",
    includeContent: true,
    updatedAt: "",
    query: "",
  };

  const { isLoading, data, revalidate } = useFetch<Article[]>(params.endpoint, {
    headers: requestHeaders(params.apiKey),
    body: requestBody(params),
    method: "POST",
    parseResponse: async (res) => {
      const resJson = await res.json();
      const searchRes = resJson as SearchResponse;
      return searchRes.data.search.edges.map((e) => e.node);
    },
    onError: (error) => {
      console.log("API Error:");
      console.log(error);
    },
  });

  return [isLoading, data] as const;
}
