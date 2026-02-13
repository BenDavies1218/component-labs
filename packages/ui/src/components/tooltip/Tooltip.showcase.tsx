import { HelpCircle, Info, Settings, User } from "lucide-react";
import { Button } from "../button/Button";
import { Badge } from "../badge/Badge";
import { Tooltip } from "./Tooltip";

export function TooltipShowcase() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Basic</h3>
        <Tooltip content="This is a helpful tooltip">
          <Button>Hover me</Button>
        </Tooltip>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">On Text</h3>
        <p>
          This is some text with a{" "}
          <Tooltip content="Additional information here">
            <span className="underline cursor-help">tooltip</span>
          </Tooltip>{" "}
          in the middle.
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Placements</h3>
        <div className="flex flex-wrap gap-4">
          <Tooltip content="Top tooltip" placement="top">
            <Button variant="outline">Top</Button>
          </Tooltip>

          <Tooltip content="Bottom tooltip" placement="bottom">
            <Button variant="outline">Bottom</Button>
          </Tooltip>

          <Tooltip content="Left tooltip" placement="left">
            <Button variant="outline">Left</Button>
          </Tooltip>

          <Tooltip content="Right tooltip" placement="right">
            <Button variant="outline">Right</Button>
          </Tooltip>

          <Tooltip content="Top start" placement="top-start">
            <Button variant="outline">Top Start</Button>
          </Tooltip>

          <Tooltip content="Top end" placement="top-end">
            <Button variant="outline">Top End</Button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Variants</h3>
        <div className="flex gap-4">
          <Tooltip content="Default dark tooltip" variant="default">
            <Button>Default</Button>
          </Tooltip>

          <Tooltip content="Inverse light tooltip" variant="inverse">
            <Button>Inverse</Button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Icons</h3>
        <div className="flex gap-4">
          <Tooltip content="User profile">
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </Tooltip>

          <Tooltip content="Settings and preferences">
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </Tooltip>

          <Tooltip content="Help and documentation">
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </Tooltip>

          <Tooltip content="Information">
            <Button variant="ghost" size="icon">
              <Info className="h-4 w-4" />
            </Button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Custom Delays</h3>
        <div className="flex gap-4">
          <Tooltip
            content="Shows instantly"
            showDelay={0}
          >
            <Button variant="outline">Instant</Button>
          </Tooltip>

          <Tooltip
            content="Shows after 1 second"
            showDelay={1000}
          >
            <Button variant="outline">Delayed (1s)</Button>
          </Tooltip>

          <Tooltip
            content="Hides after 2 seconds"
            hideDelay={2000}
          >
            <Button variant="outline">Sticky (2s)</Button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Rich Content</h3>
        <div className="flex gap-4">
          <Tooltip
            content={
              <div>
                <strong>Pro Tip</strong>
                <br />
                Use Ctrl+K to open command palette
              </div>
            }
          >
            <Button>Multi-line</Button>
          </Tooltip>

          <Tooltip
            content={
              <div className="space-y-1">
                <div className="font-semibold">Keyboard Shortcuts</div>
                <div className="text-xs opacity-90">
                  • Ctrl+S: Save
                  <br />
                  • Ctrl+Z: Undo
                  <br />• Ctrl+Y: Redo
                </div>
              </div>
            }
          >
            <Button>Formatted</Button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Other Components</h3>
        <div className="flex flex-wrap gap-4">
          <Tooltip content="This is a primary badge">
            <Badge variant="primary">Badge</Badge>
          </Tooltip>

          <Tooltip content="Click to copy">
            <code className="px-2 py-1 bg-black/5 dark:bg-white/5 rounded cursor-pointer">
              npm install
            </code>
          </Tooltip>

          <Tooltip content="Destructive action">
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Real-world Examples</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">API Key:</span>
            <Tooltip content="Click to reveal">
              <code className="px-2 py-1 bg-black/5 dark:bg-white/5 rounded cursor-pointer">
                ••••••••••••
              </code>
            </Tooltip>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm">Status:</span>
            <Tooltip content="All systems operational">
              <Badge variant="success">Online</Badge>
            </Tooltip>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm">Actions:</span>
            <Tooltip content="Edit this item">
              <Button size="sm" variant="ghost">
                Edit
              </Button>
            </Tooltip>
            <Tooltip content="Delete permanently">
              <Button size="sm" variant="ghost">
                Delete
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
