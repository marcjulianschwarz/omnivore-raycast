import { Grid } from "@raycast/api";
import { Article } from "../api/interfaces";
import { getFavicon } from "@raycast/utils";
import { DefaultArticleActions } from "../utils/actions";

function ArticleGridItem(props: { article: Article }) {
  const { article } = props;
  const icon = article.image ? { source: article.image } : getFavicon(article.originalArticleUrl, { size: 256 });

  return <Grid.Item title={article.title} content={icon} actions={<DefaultArticleActions article={article} />} />;
}

export default function ArticleGrid(props: { isLoading: boolean; articles: Article[] | undefined }) {
  const { isLoading, articles } = props;
  return (
    <Grid isLoading={isLoading}>
      {articles &&
        articles.map((article) => !article.isArchived && <ArticleGridItem article={article} key={article.id} />)}
    </Grid>
  );
}
