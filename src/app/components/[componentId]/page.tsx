import Card from "@/app/_components/Card";
import CodeView from "@/app/_components/CodeView";
import { getComponent } from "@/app/_lib/data-service";
import { Code, Info, Play } from "lucide-react";

type componentIdProps = {
  params: { componentId: number };
};

const Page = async ({
  params,
}: componentIdProps): Promise<React.JSX.Element> => {
  const component = await getComponent(params.componentId);

  if (!component) return <></>;

  return (
    <div className="min-h-screen font-roboto text-opacity-85">
      <div className="container mx-auto px-4 py-8 relative">
        <h1 className="text-4xl font-bold mb-12 text-center text-blue-900 relative z-10">
          {component.name}
          <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-blue-300"></span>
        </h1>

        <div className=" flex flex-col gap-8 relative">
          <Card
            id="description"
            className="lg:col-span-2 bg-white shadow-xl z-10 transform hover:-translate-y-2 transition-all duration-300"
          >
            <Card.Header>
              <Card.Title className="text-2xl text-blue-800 flex items-center">
                <Info className="mr-2 h-6 w-6" />
                Description
              </Card.Title>
              <Card.Description className="text-blue-600 text-lg">
                {component.description}
              </Card.Description>
            </Card.Header>
          </Card>

          <Card
            id="code"
            className="lg:row-span-2 bg-white shadow-xl z-20 transform hover:-translate-y-2 transition-all duration-300"
          >
            <Card.Header>
              <Card.Title className="text-2xl text-blue-800 flex items-center">
                <Code className="mr-2 h-6 w-6" />
                Code View
              </Card.Title>
            </Card.Header>
            <Card.Content>
              <CodeView
                tsxCode={component.code_tsx}
                jsxCode={component.code_jsx}
              />
            </Card.Content>
          </Card>

          <Card
            id="demo"
            className="lg:col-span-2 bg-white shadow-xl z-30 transform hover:-translate-y-2 transition-all duration-300"
          >
            <Card.Header>
              <Card.Title className="text-2xl text-blue-800 flex items-center">
                <Play className="mr-2 h-6 w-6" />
                Interactive Demo
              </Card.Title>
              <Card.Description className="text-blue-600">
                Interactive demo is unavailable at the moment
              </Card.Description>
            </Card.Header>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
