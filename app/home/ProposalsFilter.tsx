import { TabGroup, TabList, Tab } from "@headlessui/react";
import { DivProps } from "react-html-props";
import { Select } from "~/components/Select/Select";

function ProposalsFilterDesktop() {
  return (
    <TabGroup className="hidden md:block border-b border-gray-line-2/50 pb-1.5">
      <TabList className="flex gap-10 font-semibold text-black/50 ">
        <Tab className="data-[selected]:text-teal outline-none">All Proposals (5)</Tab>
        <Tab className="data-[selected]:text-teal outline-none">Shortlisted</Tab>
        <Tab className="data-[selected]:text-teal outline-none">Messaged</Tab>
        <Tab className="data-[selected]:text-teal outline-none">Archived</Tab>
      </TabList>
    </TabGroup>
  );
}

function ProposalsFilterMobile() {
  return (
    <Select className="md:hidden">
      <option>All Proposals (5)</option>
      <option>Shortlisted</option>
      <option>Messaged</option>
      <option>Archived</option>
    </Select>
  );
}

export function ProposalsFilter(props: DivProps) {
  return (
    <div {...props}>
      <ProposalsFilterDesktop />
      <ProposalsFilterMobile />
    </div>
  );
}
