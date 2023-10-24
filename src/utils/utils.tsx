import { Icon } from "@raycast/api";
import { HighlightType } from "../api/interfaces";

export const highlightIcons = {
  [HighlightType.Highlight]: Icon.Highlight,
  [HighlightType.Note]: Icon.NewDocument,
  [HighlightType.Redaction]: Icon.StrikeThrough,
};
