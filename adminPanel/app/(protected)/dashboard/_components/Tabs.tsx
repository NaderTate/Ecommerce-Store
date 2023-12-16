"use client";
import { Tabs as NUITabs, Tab } from "@nextui-org/react";

type Props = {};

const Tabs = ({}: Props) => {
  return (
    <NUITabs aria-label="Options">
      <Tab key="Overview" title="Overview"></Tab>
      <Tab isDisabled key="Analytics" title="Analytics"></Tab>
      <Tab isDisabled key="Reports" title="Reports"></Tab>
      <Tab isDisabled key="Notifications" title="Notifications"></Tab>
    </NUITabs>
  );
};

export default Tabs;
