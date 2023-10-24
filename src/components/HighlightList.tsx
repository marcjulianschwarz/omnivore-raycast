import { Action, ActionPanel, List } from "@raycast/api";
import { Article, Highlight } from "../api/interfaces";
import { highlightIcons } from "../utils/utils";

function generateHighlightMarkdown(highlight: Highlight) {
  return `
> ${highlight.quote}
  
${highlight.annotation}
`;
}

function HighlightListItem(props: { highlight: Highlight }) {
  const { highlight } = props;

  const title = highlight.annotation || "No annotation";
  const icon = highlightIcons[highlight.type];
  const markdown = generateHighlightMarkdown(highlight);

  return (
    <List.Item
      title={title}
      icon={icon}
      actions={
        <ActionPanel>
          <Action.CopyToClipboard title="Copy Highlight" content={markdown} />
          <Action.CopyToClipboard title="Copy Quote" content={highlight.quote || ""} />
          <Action.CopyToClipboard title="Copy Annotation" content={highlight.annotation || ""} />
        </ActionPanel>
      }
      detail={<List.Item.Detail markdown={markdown} />}
    />
  );
}

export default function HighlightList(props: { article: Article }) {
  const { article } = props;

  return (
    <List isShowingDetail={true}>
      {article.highlights?.map((highlight) => (
        <HighlightListItem highlight={highlight} key={highlight.id} />
      ))}
    </List>
  );
}
