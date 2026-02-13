import {
  Tab as AriakitTab,
  TabList as AriakitTabList,
  TabPanel as AriakitTabPanel,
  useTabStore,
  type TabProps as AriakitTabProps,
  type TabListProps as AriakitTabListProps,
  type TabPanelProps as AriakitTabPanelProps,
  type TabStore,
} from "@ariakit/react";

export type TabStorePrimitive = TabStore;
export type TabPrimitiveProps = AriakitTabProps;
export type TabListPrimitiveProps = AriakitTabListProps;
export type TabPanelPrimitiveProps = AriakitTabPanelProps;

export const TabPrimitive = AriakitTab;
export const TabListPrimitive = AriakitTabList;
export const TabPanelPrimitive = AriakitTabPanel;
export const useTabStorePrimitive = useTabStore;
