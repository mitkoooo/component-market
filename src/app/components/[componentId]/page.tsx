import Card from "@/app/_components/Card";
import CodeView from "@/app/_components/CodeView";
import GithubLogo from "@/app/_components/GithubLogo";
import { getComponent, getComponentPreview } from "@/app/_lib/data-service";
import { highlight } from "@/app/_lib/shiki";
import Link from "next/link";
import { ArrowDownLeft } from "lucide-react";
import { convertNameToTitle } from "@/app/_lib/helper";

type componentIdProps = {
  params: { componentId: number };
};

const Page = async ({
  params,
}: componentIdProps): Promise<React.JSX.Element> => {
  const component = await getComponent(params.componentId);

  if (!component) return <></>;

  const html = await highlight(component?.code_tsx, "ts");

  const title = convertNameToTitle(component.name);

  return (
    <div className="p-3 sm:p-2 md:p-0 min-h-screen font-roboto text-opacity-85 bg-white">
      <div className="container mx-auto py-8 relative ">
        <h1 className="text-2xl  mb-4 text-left relative font-semibold">
          {title}
        </h1>
        <p className="text-xl text-neutral-7">{component.description}</p>
        <Link
          className="flex gap-1 items-center my-4"
          href={`https://github.com/mitkoooo/component-market/blob/main/src/app/_components/${title.replaceAll(
            " ",
            ""
          )}.tsx`}
        >
          <GithubLogo height="20" width="20" />
          <span className="underline text-center text-black text-opacity-50 ">
            Source
          </span>
          <ArrowDownLeft
            size={20}
            className="text-black text-opacity-50 -rotate-180"
          />
        </Link>

        <div className=" flex flex-col gap-8 relative max-h-96">
          <Card id="code" className="mt-6 lg:row-span-2 bg-white">
            <Card.Content>
              <CodeView
                preview={getComponentPreview(component?.name)}
                codeShowcase={html}
              />
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
