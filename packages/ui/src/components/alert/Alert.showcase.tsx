import { useState } from "react";
import { Button } from "../button/Button";
import { Alert } from "./Alert";

export function AlertShowcase() {
  const [showDismissible, setShowDismissible] = useState(true);

  return (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Basic</h3>
        <Alert description="This is a basic informational message" />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Title</h3>
        <Alert
          title="Heads up!"
          description="You can add components to your app using the CLI."
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Variants</h3>
        <div className="space-y-4">
          <Alert
            variant="default"
            title="Default"
            description="This is a default alert"
          />

          <Alert
            variant="success"
            title="Success"
            description="Your changes have been saved successfully."
          />

          <Alert
            variant="error"
            title="Error"
            description="There was a problem processing your request."
          />

          <Alert
            variant="warning"
            title="Warning"
            description="This action cannot be undone. Please proceed with caution."
          />

          <Alert
            variant="info"
            title="Did you know?"
            description="You can use keyboard shortcuts to navigate faster."
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Without Icon</h3>
        <Alert
          showIcon={false}
          title="Clean Layout"
          description="This alert doesn't have an icon for a cleaner look"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Dismissible</h3>
        {showDismissible ? (
          <Alert
            variant="info"
            dismissible
            onDismiss={() => setShowDismissible(false)}
            title="Cookie Policy"
            description="We use cookies to enhance your browsing experience."
          />
        ) : (
          <Button onClick={() => setShowDismissible(true)}>
            Show Dismissible Alert
          </Button>
        )}
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Custom Content</h3>
        <Alert variant="warning" title="Confirm Action">
          <p className="text-sm opacity-90 mb-3">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="destructive">
              Delete
            </Button>
            <Button size="sm" variant="ghost">
              Cancel
            </Button>
          </div>
        </Alert>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Description Only</h3>
        <div className="space-y-4">
          <Alert
            variant="success"
            description="File uploaded successfully!"
          />
          <Alert variant="error" description="Invalid email address" />
          <Alert
            variant="warning"
            description="Your session will expire in 5 minutes"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Real-world Examples</h3>
        <div className="space-y-4">
          <Alert
            variant="info"
            title="New feature available"
            description="We've added dark mode support. Check it out in settings!"
            dismissible
            onDismiss={() => {}}
          />

          <Alert
            variant="error"
            title="Payment failed"
            description="Your payment method was declined. Please update your billing information."
          />

          <Alert
            variant="success"
            title="Account created"
            description="Welcome! Your account has been successfully created."
          />

          <Alert
            variant="warning"
            title="Maintenance scheduled"
            description="We'll be performing maintenance on Sunday from 2-4 AM EST."
          />
        </div>
      </div>
    </div>
  );
}
