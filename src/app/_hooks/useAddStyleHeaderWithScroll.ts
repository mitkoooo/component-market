import { useEffect, useRef } from "react";

export default function useAddStyleHeaderWithScroll(
  className: string,
  options?: {
    threshold?: number;
  }
): React.RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null);

  const styles: string[] = className.split(" ");

  useEffect(() => {
    function handleScroll() {
      if (ref.current === null) return;
      const header = ref.current;

      const mainEl = header?.parentElement?.querySelector("main");

      if (mainEl === null || mainEl === undefined) return;

      // Standard threshold is 0.1 (10% of the intersection)

      const limit = options?.threshold
        ? header?.getBoundingClientRect().bottom * (1 - options.threshold)
        : header?.getBoundingClientRect().bottom * 0.9;

      if (mainEl?.getBoundingClientRect().top < limit) {
        styles.forEach((style) => header.classList.add(style));
      } else {
        styles.forEach((style) => {
          header.classList.remove(style);
        });
      }
    }

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [options?.threshold, styles]);

  return ref;
}
