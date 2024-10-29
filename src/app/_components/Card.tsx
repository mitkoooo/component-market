type CardProps = {
  children: React.ReactNode;
  id: string;
  className?: string;
}; /* use `interface` if exporting so that consumers can extend */

const Card = ({ children, className }: CardProps): React.JSX.Element => {
  return <div className={`${className ?? ""}`}>{children}</div>;
};

export default Card;

function Title({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <h1 className={`${className ?? ""} mb-4`}>{children}</h1>;
}

function Header({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={className ?? ""}>{children}</div>;
}

function Description({
  className,
  children,
}: {
  className?: string;
  children: string;
}) {
  return <p className={`${className ?? ""}`}>{children}</p>;
}

function Content({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={className ?? ""}>{children}</div>;
}

Card.Title = Title;
Card.Header = Header;
Card.Description = Description;
Card.Content = Content;
