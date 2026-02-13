import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { Badge } from "../badge/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";

export function CardShowcase() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Basic</h3>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>
              This is a basic card with header and content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              This is the main content area of the card. You can put any content
              here.
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Footer</h3>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Create Project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input placeholder="Project name" />
          </CardContent>
          <CardFooter>
            <Button>Create</Button>
            <Button variant="ghost">Cancel</Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Variants</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <Card variant="default">
            <CardHeader>
              <CardTitle>Default</CardTitle>
              <CardDescription>Standard card style</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Default variant with subtle border</p>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Elevated</CardTitle>
              <CardDescription>Card with shadow</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Elevated variant with drop shadow</p>
            </CardContent>
          </Card>

          <Card variant="outline">
            <CardHeader>
              <CardTitle>Outline</CardTitle>
              <CardDescription>Prominent border</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Outline variant with bold border</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Hoverable (Interactive)</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} hoverable onClick={() => alert(`Card ${i} clicked`)}>
              <CardHeader>
                <CardTitle>Product {i}</CardTitle>
                <CardDescription>Click to view details</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  This card has hover effects and is clickable.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Badge</h3>
        <Card className="max-w-md">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Premium Feature</CardTitle>
                <CardDescription>Unlock advanced capabilities</CardDescription>
              </div>
              <Badge variant="primary">Pro</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              This feature is only available for premium users.
            </p>
          </CardContent>
          <CardFooter>
            <Button>Upgrade Now</Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Complex Layout</h3>
        <Card className="max-w-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle as="h2">User Profile</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" defaultValue="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <Input defaultValue="Software Developer" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
            <Button variant="ghost">Cancel</Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Card Grid</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} variant="elevated">
              <CardHeader>
                <CardTitle>Item {i + 1}</CardTitle>
                <CardDescription>Card description</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Sample content for card number {i + 1}.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm" fullWidth>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
