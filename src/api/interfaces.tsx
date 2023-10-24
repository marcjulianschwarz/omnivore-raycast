export interface QueryParams {
  endpoint: string;
  apiKey: string;
  after: string;
  first: number;
  updatedAt: string;
  query: string;
  includeContent: boolean;
  format: string;
}

export interface SearchResponse {
  data: {
    search: {
      edges: { node: Article }[];
      pageInfo: {
        hasNextPage: boolean;
      };
    };
  };
}

export interface DeleteArticleResponse {
  data: {
    setBookmarkArticle: {
      bookmarkedArticle: {
        id: string;
      };
    };
  };
}

export enum PageType {
  Article = "ARTICLE",
  Book = "BOOK",
  File = "FILE",
  Profile = "PROFILE",
  Unknown = "UNKNOWN",
  Website = "WEBSITE",
  Tweet = "TWEET",
  Video = "VIDEO",
  Image = "IMAGE",
}

export interface Article {
  id: string;
  title: string;
  siteName: string;
  originalArticleUrl: string;
  author?: string;
  description?: string;
  slug: string;
  labels?: Label[];
  highlights?: Highlight[];
  updatedAt: string;
  savedAt: string;
  pageType: PageType;
  content: string;
  publishedAt?: string;
  url: string;
  readAt?: string;
  wordsCount?: number;
  readingProgressPercent: number;
  isArchived: boolean;
  archivedAt?: string;
  siteIcon: string;
  image?: string;
}

export interface Label {
  name: string;
  color: string;
}

export enum HighlightType {
  Highlight = "HIGHLIGHT",
  Note = "NOTE",
  Redaction = "REDACTION",
}

export interface Highlight {
  id: string;
  quote: string | null;
  annotation: string | null;
  patch: string | null;
  updatedAt: string;
  labels?: Label[];
  type: HighlightType;
  highlightPositionPercent?: number;
}

export interface CreateLabelInput {
  name?: string;
  color?: string; // hex color code with #
  description?: string;
}

export interface SaveUrlInput {
  url: string;
  source: string;
  clientRequestId: string;
  labels: [CreateLabelInput];
}

export interface SaveSuccess {
  url: string;
  clientRequestId: string;
}

export enum SaveErrorCode {
  UNKNOWN,
  UNAUTHORIZED,
  EMBEDDED_HIGHLIGHT_FAILED,
}

export interface SaveError {
  errorCodes: [SaveErrorCode];
  message: string;
}

export type SaveResult = SaveSuccess | SaveError;
export interface SaveResponse {
  data: {
    saveUrl: SaveResult;
  };
}
