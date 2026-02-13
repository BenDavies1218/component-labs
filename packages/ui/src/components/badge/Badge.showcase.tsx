import { useState } from "react";
import { Check, Star, Tag, TrendingUp, Zap } from "lucide-react";
import { Badge } from "./Badge";

export function BadgeShowcase() {
  const [tags, setTags] = useState(["React", "TypeScript", "Tailwind", "Vite"]);

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Basic</h3>
        <Badge>New</Badge>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Sizes</h3>
        <div className="flex items-center gap-2">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Icons</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success" icon={<Check className="h-3 w-3" />}>
            Verified
          </Badge>
          <Badge variant="warning" icon={<Star className="h-3 w-3" />}>
            Featured
          </Badge>
          <Badge variant="primary" icon={<Zap className="h-3 w-3" />}>
            Pro
          </Badge>
          <Badge variant="info" icon={<TrendingUp className="h-3 w-3" />}>
            Trending
          </Badge>
          <Badge variant="outline" icon={<Tag className="h-3 w-3" />}>
            Tagged
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Removable Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="primary"
              removable
              onRemove={() => removeTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
        {tags.length === 0 && (
          <p className="text-sm text-black/60 mt-2">All tags removed</p>
        )}
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Status Indicators</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm w-24">User Status:</span>
            <Badge variant="success">Active</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm w-24">Server:</span>
            <Badge variant="error">Offline</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm w-24">Payment:</span>
            <Badge variant="warning">Pending</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm w-24">Draft:</span>
            <Badge variant="info">In Progress</Badge>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Notification Counts</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span>Messages</span>
            <Badge variant="error" size="sm">
              12
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span>Notifications</span>
            <Badge variant="warning" size="sm">
              5
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span>Updates</span>
            <Badge variant="info" size="sm">
              3
            </Badge>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Combined with Other Components</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">New Feature Release</h4>
              <p className="text-sm text-black/60">Check out our latest updates</p>
            </div>
            <Badge variant="success">New</Badge>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Premium Plan</h4>
              <p className="text-sm text-black/60">Unlock advanced features</p>
            </div>
            <Badge variant="primary" icon={<Star className="h-3 w-3" />}>
              Pro
            </Badge>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Beta Testing</h4>
              <p className="text-sm text-black/60">Join our beta program</p>
            </div>
            <Badge variant="warning">Beta</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
