import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card/Card";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { Tabs, TabList, Tab, TabPanel } from "./Tabs";

export function TabsShowcase() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Basic (Default Variant)</h3>
        <Tabs defaultSelectedId="tab1">
          <TabList>
            <Tab id="tab1">Account</Tab>
            <Tab id="tab2">Password</Tab>
            <Tab id="tab3">Settings</Tab>
          </TabList>

          <TabPanel tabId="tab1">
            <p>Account settings and profile information.</p>
          </TabPanel>

          <TabPanel tabId="tab2">
            <p>Password and security settings.</p>
          </TabPanel>

          <TabPanel tabId="tab3">
            <p>General application settings.</p>
          </TabPanel>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Outline Variant</h3>
        <Tabs variant="outline" defaultSelectedId="overview">
          <TabList>
            <Tab id="overview">Overview</Tab>
            <Tab id="analytics">Analytics</Tab>
            <Tab id="reports">Reports</Tab>
          </TabList>

          <TabPanel tabId="overview">
            <p>Overview dashboard with key metrics.</p>
          </TabPanel>

          <TabPanel tabId="analytics">
            <p>Detailed analytics and insights.</p>
          </TabPanel>

          <TabPanel tabId="reports">
            <p>Generated reports and exports.</p>
          </TabPanel>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Underline Variant</h3>
        <Tabs variant="underline" defaultSelectedId="posts">
          <TabList>
            <Tab id="posts">Posts</Tab>
            <Tab id="comments">Comments</Tab>
            <Tab id="likes">Likes</Tab>
            <Tab id="shares">Shares</Tab>
          </TabList>

          <TabPanel tabId="posts">
            <p>All your posts and publications.</p>
          </TabPanel>

          <TabPanel tabId="comments">
            <p>Comments on your content.</p>
          </TabPanel>

          <TabPanel tabId="likes">
            <p>Content you've liked.</p>
          </TabPanel>

          <TabPanel tabId="shares">
            <p>Shared content and statistics.</p>
          </TabPanel>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Controlled Tabs</h3>
        <Tabs
          selectedId={activeTab}
          onSelectIdChange={(id) => setActiveTab(id || "account")}
        >
          <TabList>
            <Tab id="account">Account</Tab>
            <Tab id="billing">Billing</Tab>
            <Tab id="notifications">Notifications</Tab>
          </TabList>

          <TabPanel tabId="account">
            <p>Active tab: {activeTab}</p>
          </TabPanel>

          <TabPanel tabId="billing">
            <p>Active tab: {activeTab}</p>
          </TabPanel>

          <TabPanel tabId="notifications">
            <p>Active tab: {activeTab}</p>
          </TabPanel>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Disabled Tab</h3>
        <Tabs defaultSelectedId="available">
          <TabList>
            <Tab id="available">Available</Tab>
            <Tab id="upcoming" disabled>
              Upcoming (Disabled)
            </Tab>
            <Tab id="archived">Archived</Tab>
          </TabList>

          <TabPanel tabId="available">
            <p>Currently available items.</p>
          </TabPanel>

          <TabPanel tabId="upcoming">
            <p>This content is not yet available.</p>
          </TabPanel>

          <TabPanel tabId="archived">
            <p>Archived and historical items.</p>
          </TabPanel>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Card Content</h3>
        <Tabs defaultSelectedId="profile" variant="underline">
          <TabList>
            <Tab id="profile">Profile</Tab>
            <Tab id="security">Security</Tab>
            <Tab id="preferences">Preferences</Tab>
          </TabList>

          <TabPanel tabId="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Update your profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input placeholder="Full name" defaultValue="John Doe" />
                  <Input
                    type="email"
                    placeholder="Email"
                    defaultValue="john@example.com"
                  />
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabPanel>

          <TabPanel tabId="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your security preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input type="password" placeholder="Current password" />
                  <Input type="password" placeholder="New password" />
                  <Button>Update Password</Button>
                </div>
              </CardContent>
            </Card>
          </TabPanel>

          <TabPanel tabId="preferences">
            <Card>
              <CardHeader>
                <CardTitle>User Preferences</CardTitle>
                <CardDescription>
                  Customize your experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-black/60">
                  Preference settings go here...
                </p>
              </CardContent>
            </Card>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
