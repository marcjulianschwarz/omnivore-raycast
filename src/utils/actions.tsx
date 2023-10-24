import { Action, ActionPanel, Detail, Icon } from "@raycast/api";
import { Article } from "../api/interfaces";
import HighlightList from "../components/HighlightList";
import { useAI } from "@raycast/utils";
import { useState } from "react";

export function ShowHighlightsAction(props: { article: Article }) {
  const { article } = props;
  return <Action.Push title="Highlights" target={<HighlightList article={article} />}></Action.Push>;
}

function AIHighlightSummary(props: { article: Article }) {
  const { article } = props;
  const highlights = article.highlights;

  const highlightText = highlights
    ?.map((highlight) => "Quote:\n" + highlight.quote + "\n\nAnnotation:\n" + highlight.annotation)
    .join(" ");
  const prompt =
    "The following are selected highlights from the article '" +
    article.title +
    "'. Each highlight consists of a quote and an annotation. Summarize these highlights in a short but detailed text. Don't use your own knowledge. Highlights:\n\n" +
    highlightText +
    "\n\nYour summary:";

  const { data, isLoading } = useAI(prompt);
  return (
    <Detail
      markdown={"# AI Highlight Summary\n" + data}
      actions={
        <ActionPanel>
          <Action.CopyToClipboard title="Copy Summary" content={data} />
        </ActionPanel>
      }
    />
  );
}

function AIArticleSummary(props: { article: Article }) {
  const { article } = props;
  const prompt =
    "The following is an article titled '" +
    article.title +
    "'. Summarize the article in a short but detailed text. Don't use your own knowledge. Article:\n\n" +
    article.content
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\n{3,}/g, "\n\n") +
    "\n\nYour summary:";

  const [error, setError] = useState(false);

  const { data, isLoading } = useAI(prompt, {
    onError: (error) => {
      setError(true);
    },
  });

  return (
    <Detail
      markdown={
        error
          ? "The AI can not summarize the article. Maybe the article is too long? \n\n Try the highlights summary instead."
          : "# AI Article Summary\n" + data
      }
      actions={
        <ActionPanel>
          <Action.CopyToClipboard title="Copy Summary" content={data} />
        </ActionPanel>
      }
    />
  );
}

export function AIHighlightSummaryAction(props: { article: Article }) {
  const { article } = props;

  return (
    <Action.Push
      title="AI Highlight Summary"
      target={<AIHighlightSummary article={article}></AIHighlightSummary>}
      icon={{ source: Icon.ComputerChip }}
    />
  );
}

export function AIArticleSummaryAction(props: { article: Article }) {
  const { article } = props;

  return (
    <Action.Push
      title="AI Article Summary"
      target={<AIArticleSummary article={article}></AIArticleSummary>}
      icon={{ source: Icon.ComputerChip }}
    />
  );
}

export function DefaultArticleActions(props: { article: Article }) {
  const { article } = props;
  return (
    <ActionPanel>
      <ShowHighlightsAction article={article} />
      <AIHighlightSummaryAction article={article} />
      <AIArticleSummaryAction article={article} />
      <Action.OpenInBrowser title="Open Original Article" icon={Icon.Globe} url={article.originalArticleUrl} />
      <Action.OpenInBrowser title="Read Article" icon={Icon.Globe} url={article.url} />
    </ActionPanel>
  );
}
