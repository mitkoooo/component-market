import { createHighlighter } from "shiki";

const highlighterPromise = createHighlighter({
  themes: ["material-theme-palenight"],
  langs: ["javascript", "typescript"],
});

export async function highlight(code: string, language: string) {
  const highlighter = await highlighterPromise;
  const output = highlighter.codeToHtml(code, {
    lang: language,
    theme: "material-theme-palenight",
  });
  return output;
}
