"use client";

import Tabs from "./Tabs";
import useInjectInnerHTML from "../_hooks/useInjectInnerHTML";

type CodeViewProps = {
  preview: JSX.Element;
  codeShowcase: string;
};

const CodeView = ({
  codeShowcase,
  preview,
}: CodeViewProps): React.JSX.Element => {
  useInjectInnerHTML([{ html: codeShowcase, divId: "codeShowcase" }]);

  return (
    <Tabs defaultValue="preview" className="w-full">
      <Tabs.List className="mb-3">
        <Tabs.Trigger
          value="preview"
          className="text-sm data-[state=active]:bg-neutral-300 data-[state=active]:text-white"
        >
          Preview
        </Tabs.Trigger>
        <Tabs.Trigger
          value="tsx"
          className="text-sm data-[state=active]:bg-neutral-300 data-[state=active]:text-white"
        >
          Code
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="preview">
        <div className="w-full h-full border rouned-sm border-black border-opacity-5 flex items-end justify-end p-10">
          {preview}
        </div>
      </Tabs.Content>
      <Tabs.Content value="tsx">
        <div id="codeShowcase"></div>
      </Tabs.Content>
    </Tabs>
  );
};

export default CodeView;
