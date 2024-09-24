import ComponentCard from "../_components/ComponentCard";
import { getComponentCategories, getComponents } from "../_lib/data-service";
import EmptyPage from "../_components/EmptyPage";
import ComponentSearch from "../_components/ComponentSearch";

const Page = async (): Promise<React.JSX.Element> => {
  const components = await getComponents();
  const componentCategories = await getComponentCategories();
  console.log(componentCategories);

  const hasItems = components?.length !== 0;

  return (
    <div className="font-sans">
      <div className="mx-2 my-4 sm:mx-12 md:mx-32 lg:mx-48">
        <ComponentSearch componentCategories={componentCategories} />
      </div>

      {!hasItems && <EmptyPage />}

      {hasItems && (
        <div className="m-12 justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
          {components?.map((component) => (
            <ComponentCard key={component.id} component={component} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
