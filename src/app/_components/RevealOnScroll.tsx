"use client";

import useRevealOnScroll from "../_hooks/useRevealOnScroll";

type RevealOnScrollProps = {
  children: React.JSX.Element;
}; /* use `interface` if exporting so that consumers can extend */

const RevealOnScroll = ({
  children,
}: RevealOnScrollProps): React.JSX.Element => {
  const { ref, isRevealed } = useRevealOnScroll();

  const styles = `${
    isRevealed ? "opacity-100" : "translate-y-10 opacity-0"
  } transition-all duration-500 ease-in-out delay-75`;

  return (
    <div ref={ref} className={styles}>
      {children}
    </div>
  );
};

export default RevealOnScroll;
