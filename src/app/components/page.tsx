import { getComponents } from "../_lib/data-service";
import ComponentLayout from "../_components/ComponentLayout";

const Page = async (): Promise<React.JSX.Element> => {
  const components = await getComponents();
  return (
    <div className="font-sans bg-white">
      <ComponentLayout components={components} />
    </div>
  );
};

export default Page;
