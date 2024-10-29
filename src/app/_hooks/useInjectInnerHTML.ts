import { useEffect } from "react";

type useInjectInnerHTMLProps = {
  html: string;
  divId: string;
}[];

export default function useInjectInnerHTML(
  args: useInjectInnerHTMLProps
): void {
  useEffect(() => {
    function handleAddHTML(divId: string, html: string) {
      const divEl = document.getElementById(divId);

      if (divEl === null) return;

      // Standard threshold is 0.1 (10% of the intersection)

      divEl.innerHTML = html;
    }

    return () => {
      args.forEach((arg) => handleAddHTML(arg.divId, arg.html));
    };
  }, [args]);
}
