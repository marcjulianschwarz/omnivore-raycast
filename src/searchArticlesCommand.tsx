import { useArticles } from "./api/api";
import { useState } from "react";
import ArticleList from "./components/ArticleList";
import ArticleGrid from "./components/ArticleGrid";
import { getPreferenceValues } from "@raycast/api";

export default function Command() {
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, articles] = useArticles();
  const pref = getPreferenceValues();

  if (pref.useGridView) {
    return <ArticleGrid isLoading={isLoading} articles={articles} />;
  } else {
    return <ArticleList isLoading={isLoading} articles={articles} />;
  }
}
