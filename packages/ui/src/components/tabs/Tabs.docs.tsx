import type { ComponentDoc } from "../../types/docs";
import { Tabs, TabList, Tab, TabPanel } from "./Tabs";

export const tabsDocs: ComponentDoc = {
  name: "Tabs",
  description:
    "Tabbed interface component for organizing content into separate views. Built with Ariakit.",
  category: "Navigation",
  installation: `npx @component-labs/cli add tabs

This will:
- Install required dependencies
- Copy the Tabs component to your project
- Add utility functions (cn helper)

Make sure you've initialized Component Labs first:
\`\`\`bash
npx @component-labs/cli init
\`\`\``,
  usage: `import { Tabs, TabList, Tab, TabPanel } from "@component-labs/ui";

<Tabs defaultSelectedId="tab1">
  <TabList>
    <Tab id="tab1">Account</Tab>
    <Tab id="tab2">Password</Tab>
    <Tab id="tab3">Settings</Tab>
  </TabList>

  <TabPanel tabId="tab1">
    <p>Account settings content</p>
  </TabPanel>

  <TabPanel tabId="tab2">
    <p>Password settings content</p>
  </TabPanel>

  <TabPanel tabId="tab3">
    <p>General settings content</p>
  </TabPanel>
</Tabs>`,
  props: [
    {
      name: "Tabs.variant",
      type: '"default" | "outline" | "underline"',
      default: '"default"',
      description: "Visual style variant applied to all tabs",
    },
    {
      name: "Tabs.defaultSelectedId",
      type: "string",
      description: "Default selected tab ID (uncontrolled)",
    },
    {
      name: "Tabs.selectedId",
      type: "string",
      description: "Controlled selected tab ID",
    },
    {
      name: "Tabs.onSelectIdChange",
      type: "(id: string | null) => void",
      description: "Callback when selected tab changes",
    },
    {
      name: "TabList",
      type: "Component",
      description: "Container for Tab components",
    },
    {
      name: "Tab.id",
      type: "string",
      required: true,
      description: "Unique identifier for the tab",
    },
    {
      name: "Tab.disabled",
      type: "boolean",
      description: "Whether the tab is disabled",
    },
    {
      name: "TabPanel.tabId",
      type: "string",
      required: true,
      description: "ID of the tab this panel belongs to",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes (applies to all components)",
    },
  ],
  examples: [
    {
      title: "Basic",
      description: "Simple tabs with default style",
      code: `<Tabs defaultSelectedId="tab1">
  <TabList>
    <Tab id="tab1">Account</Tab>
    <Tab id="tab2">Password</Tab>
    <Tab id="tab3">Settings</Tab>
  </TabList>

  <TabPanel tabId="tab1">
    <p>Account settings content</p>
  </TabPanel>

  <TabPanel tabId="tab2">
    <p>Password settings content</p>
  </TabPanel>

  <TabPanel tabId="tab3">
    <p>General settings content</p>
  </TabPanel>
</Tabs>`,
    },
    {
      title: "Outline Variant",
      description: "Tabs with outline style",
      code: `<Tabs variant="outline" defaultSelectedId="overview">
  <TabList>
    <Tab id="overview">Overview</Tab>
    <Tab id="analytics">Analytics</Tab>
    <Tab id="reports">Reports</Tab>
  </TabList>

  <TabPanel tabId="overview">Overview content</TabPanel>
  <TabPanel tabId="analytics">Analytics content</TabPanel>
  <TabPanel tabId="reports">Reports content</TabPanel>
</Tabs>`,
    },
    {
      title: "Underline Variant",
      description: "Tabs with underline style",
      code: `<Tabs variant="underline" defaultSelectedId="posts">
  <TabList>
    <Tab id="posts">Posts</Tab>
    <Tab id="comments">Comments</Tab>
    <Tab id="likes">Likes</Tab>
  </TabList>

  <TabPanel tabId="posts">Posts content</TabPanel>
  <TabPanel tabId="comments">Comments content</TabPanel>
  <TabPanel tabId="likes">Likes content</TabPanel>
</Tabs>`,
    },
    {
      title: "Controlled",
      description: "Controlled tabs with state",
      code: `const [activeTab, setActiveTab] = useState("tab1");

<Tabs selectedId={activeTab} onSelectIdChange={setActiveTab}>
  <TabList>
    <Tab id="tab1">Tab 1</Tab>
    <Tab id="tab2">Tab 2</Tab>
  </TabList>

  <TabPanel tabId="tab1">Content 1</TabPanel>
  <TabPanel tabId="tab2">Content 2</TabPanel>
</Tabs>`,
    },
    {
      title: "With Disabled Tab",
      description: "Tabs with disabled option",
      code: `<Tabs defaultSelectedId="available">
  <TabList>
    <Tab id="available">Available</Tab>
    <Tab id="upcoming" disabled>Upcoming</Tab>
    <Tab id="archived">Archived</Tab>
  </TabList>

  <TabPanel tabId="available">Available content</TabPanel>
  <TabPanel tabId="upcoming">Upcoming content</TabPanel>
  <TabPanel tabId="archived">Archived content</TabPanel>
</Tabs>`,
    },
  ],
  accessibility: [
    "Full keyboard navigation support (Arrow keys, Home, End)",
    "Proper ARIA attributes for tabs pattern",
    "Screen reader friendly",
    "Focus management and visual indicators",
  ],
  performance: {
    bundleSize: "~3KB gzipped",
    dependencies: ["@ariakit/react", "class-variance-authority", "clsx", "tailwind-merge"],
  },
  status: "stable",
  version: "1.0.0",
  preview: () => (
    <div className="space-y-6 max-w-2xl">
      <Tabs defaultSelectedId="account">
        <TabList>
          <Tab id="account">Account</Tab>
          <Tab id="password">Password</Tab>
          <Tab id="settings">Settings</Tab>
        </TabList>

        <TabPanel tabId="account">
          <p className="text-sm">Account settings content goes here.</p>
        </TabPanel>

        <TabPanel tabId="password">
          <p className="text-sm">Password settings content goes here.</p>
        </TabPanel>

        <TabPanel tabId="settings">
          <p className="text-sm">General settings content goes here.</p>
        </TabPanel>
      </Tabs>

      <Tabs variant="underline" defaultSelectedId="posts">
        <TabList>
          <Tab id="posts">Posts</Tab>
          <Tab id="comments">Comments</Tab>
          <Tab id="likes">Likes</Tab>
        </TabList>

        <TabPanel tabId="posts">
          <p className="text-sm">Posts content</p>
        </TabPanel>

        <TabPanel tabId="comments">
          <p className="text-sm">Comments content</p>
        </TabPanel>

        <TabPanel tabId="likes">
          <p className="text-sm">Likes content</p>
        </TabPanel>
      </Tabs>
    </div>
  ),
};
