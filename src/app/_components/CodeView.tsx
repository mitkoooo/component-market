"use client";

import Tabs from "./Tabs";

type CodeViewProps = {
  jsxCode: string;
  tsxCode: string;
};

const CodeView = ({ jsxCode, tsxCode }: CodeViewProps): React.JSX.Element => (
  <Tabs defaultValue="jsx" className="w-full">
    <Tabs.List className="mb-4 bg-blue-100">
      <Tabs.Trigger
        value="jsx"
        className="text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white"
      >
        JSX
      </Tabs.Trigger>
      <Tabs.Trigger
        value="tsx"
        className="text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white"
      >
        TSX
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="jsx">
      <pre className="bg-blue-900 p-4 rounded-md overflow-x-auto text-sm">
        <code className="text-blue-100">{`${jsxCode}`}</code>
      </pre>
    </Tabs.Content>
    <Tabs.Content value="tsx">
      <pre className="bg-blue-900 p-4 rounded-md overflow-x-auto text-sm">
        <code className="text-blue-100">{`${tsxCode}`}</code>
      </pre>
    </Tabs.Content>
  </Tabs>
);

export default CodeView;
