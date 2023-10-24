import { Action, ActionPanel, Form, Toast, popToRoot, showHUD, showToast } from "@raycast/api";
import { saveArticle } from "./api/api";
import { useEffect, useState } from "react";
import { runAppleScript } from "@raycast/utils";

interface FormValues {
  url: string;
}

export default function AddArticle() {
  const [currentURL, setCurrentURL] = useState<string>("");

  useEffect(() => {
    async function getCurrentURL() {
      try {
        const res = await runAppleScript(
          `tell application "Safari"
      return URL of current tab of window 1
  end tell`
        );
        if (res === "favorites://") {
          setCurrentURL("");
        } else {
          setCurrentURL(res);
        }
      } catch (e) {
        console.log(e);
        setCurrentURL("");
      }
    }
    getCurrentURL();
  }, []);

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Submit"
            onSubmit={async (values: FormValues) => {
              const res = await saveArticle(values.url);
              if (res === "Success") {
                showToast(Toast.Style.Success, "Success", "Article saved");
              } else {
                showToast(Toast.Style.Failure, "Error", res);
              }
            }}
          />
        </ActionPanel>
      }
    >
      <Form.TextField id="url" title="URL" value={currentURL} onChange={setCurrentURL} />
    </Form>
  );
}
