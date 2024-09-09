import { useEffect, useRef } from "react";

export default function useAddStyleHeaderWithScroll(
  className: string
): React.Ref<HTMLElement | undefined> {
  const ref = useRef<HTMLElement | undefined>(undefined);

  const styles: string[] = className.split(" ");

  useEffect(() => {
    function handleScroll() {
      if (ref.current === undefined) return;

      const header =
        ref.current.parentElement?.parentElement?.parentElement?.querySelector(
          "header"
        );

      if (header === null || header === undefined) return;

      const limit = header?.getBoundingClientRect().bottom / 2;

      if (ref.current?.getBoundingClientRect().top <= limit) {
        styles.forEach((style) => header.classList.add(style));
      } else {
        styles.forEach((style) => {
          header.classList.remove(style);
        });
      }
    }

    ref.current?.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return ref;
}
