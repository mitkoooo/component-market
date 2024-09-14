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

      const pageParent = header?.parentElement?.querySelector("main");

      if (pageParent === null || pageParent === undefined) return;

      // Standard threshold is 0.1 (10% of the intersection)

      const limit = options?.threshold
        ? header?.getBoundingClientRect().bottom * (1 - options.threshold)
        : header?.getBoundingClientRect().bottom * 0.9;

      if (pageParent?.getBoundingClientRect().top <= limit) {
        styles.forEach((style) => header.classList.add(style));
      } else {
        styles.forEach((style) => {
          header.classList.remove(style);
        });
      }
    }

    ref.current?.parentElement
      ?.querySelector("main")
      ?.addEventListener("wheel", handleScroll);

    return () => {
      ref.current?.parentElement
        ?.querySelector("main")
        ?.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return ref;
}
