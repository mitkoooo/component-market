import { getComponentCategories, getComponents } from "../_lib/data-service";
import ComponentSearch from "../_components/ComponentSearch";
import ComponentsDisplay from "../_components/ComponentsDisplay";

const Page = async (): Promise<React.JSX.Element> => {
  const components = await getComponents();
  const componentCategories = await getComponentCategories();
  console.log(componentCategories);

  return (
    <div className="font-sans">
      <div className="mx-2 my-4 sm:mx-12 md:mx-32 lg:mx-48">
        <ComponentSearch
          componentCategories={componentCategories}
          components={components}
        />
      </div>

      <ComponentsDisplay components={components} />
    </div>
  );
};

export default Page;
