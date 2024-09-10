import { useEffect, useRef } from "react";

export default function useAddStyleHeaderWithScroll(
  className: string
): React.RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null);

  const styles: string[] = className.split(" ");

  useEffect(() => {
    function handleScroll() {
      if (ref.current === null) return;

      const header = ref.current;

      const pageParent = header?.parentElement?.querySelector("main");

      if (pageParent === null || pageParent === undefined) return;

      const limit = header?.getBoundingClientRect().bottom / 2;

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
