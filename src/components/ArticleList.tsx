import { List } from "@raycast/api";
import { Article } from "../api/interfaces";

import { getFavicon } from "@raycast/utils";
import { DefaultArticleActions } from "../utils/actions";

function ArticleListItemDetail(props: { article: Article }) {
  const { article } = props;
  return (
    <List.Item.Detail
      markdown={"![](" + article.image + ")\n\n" + article.description}
      metadata={
        <List.Item.Detail.Metadata>
          {article.labels && (
            <List.Item.Detail.Metadata.TagList title={"Tags"}>
              {article.labels?.map((label) => (
                <List.Item.Detail.Metadata.TagList.Item text={label.name} key={label.name} color={label.color} />
              ))}
            </List.Item.Detail.Metadata.TagList>
          )}
          {article.author && <List.Item.Detail.Metadata.Label title="Author" text={article.author} />}
          <List.Item.Detail.Metadata.Label title="Words" text={article.wordsCount + " words"} />
        </List.Item.Detail.Metadata>
      }
    />
  );
}

function ArticleListItem(props: { article: Article }) {
  const { article } = props;
  return (
    <List.Item
      title={article.title}
      key={article.id}
      icon={getFavicon(article.originalArticleUrl)}
      actions={<DefaultArticleActions article={article} />}
      detail={<ArticleListItemDetail article={article} />}
    />
  );
}

export default function ArticleList(props: { isLoading: boolean; articles: Article[] | undefined }) {
  const { isLoading, articles } = props;
  return (
    <List isLoading={isLoading} isShowingDetail={true}>
      {articles &&
        articles.map((article) => !article.isArchived && <ArticleListItem article={article} key={article.id} />)}
    </List>
  );
}
