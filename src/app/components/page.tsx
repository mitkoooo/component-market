import { Search, SlidersHorizontal } from "lucide-react";
import ComponentCard from "../_components/ComponentCard";
import { getComponents } from "../_lib/data-service";
import EmptyPage from "../_components/EmptyPage";

const Page = async (): Promise<React.JSX.Element> => {
  const components = await getComponents();

  const hasItems = components?.length !== 0;

  return (
    <div className="font-sans">
      <div className="mx-2 flex gap-2 my-4 sm:mx-12 md:mx-32 lg:mx-48">
        <button className="border-2 rounded-lg border-gray-300 p-1">
          <SlidersHorizontal />
        </button>
        <div className="rounded-lg w-full">
          <Search
            className="absolute pt-1 text-gray-400"
            width="35"
            height="30"
          />
          <input
            className="transition-all border-2 border-gray-300 rounded-lg w-full p-1 pl-10 focus:font-semibold outline-none text-black duration-150 "
            placeholder="Search for components..."
          ></input>
        </div>
      </div>

      {!hasItems && <EmptyPage />}

      {hasItems && (
        <div className="m-12 justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
          {components?.map((component) => (
            <ComponentCard component={component} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
