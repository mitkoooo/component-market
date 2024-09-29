import { getComponentCategories, getComponents } from "../_lib/data-service";
import ComponentLayout from "../_components/ComponentLayout";

const Page = async (): Promise<React.JSX.Element> => {
  const components = await getComponents();
  const componentCategories = await getComponentCategories();

  return (
    <div className="font-sans">
      <ComponentLayout
        components={components}
        componentCategories={componentCategories}
      />
    </div>
  );
};

export default Page;
