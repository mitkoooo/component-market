import Link from "next/link";
import Navigation from "./Navigation";

type BurgerOpenProps = {
  className: string;
};

const BurgerOpen = ({ className }: BurgerOpenProps): React.JSX.Element => {
  return (
    <div className={className}>
      <Navigation isBurgerMenu={true} />
    </div>
  );
};

export default BurgerOpen;
