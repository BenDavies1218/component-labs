import { Button } from "../button/Button";
import { Toast } from "./Toast";

function ToastDemoContent() {
  const { toast, success, error, warning, info, dismiss } = Toast.useToast();

  return (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Basic Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() =>
              toast({
                title: "Default Toast",
                description: "This is a default notification",
              })
            }
          >
            Default
          </Button>

          <Button
            variant="secondary"
            onClick={() => success("Success!", "Operation completed successfully")}
          >
            Success
          </Button>

          <Button
            variant="destructive"
            onClick={() => error("Error", "Something went wrong")}
          >
            Error
          </Button>

          <Button
            onClick={() => warning("Warning", "Please review your input")}
          >
            Warning
          </Button>

          <Button
            onClick={() => info("Info", "Here's some helpful information")}
          >
            Info
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Action</h3>
        <Button
          onClick={() =>
            toast({
              title: "Update available",
              description: "A new version is ready to install",
              variant: "info",
              action: {
                label: "Install now",
                onClick: () => {
                  success("Installing", "Update is being installed");
                },
              },
            })
          }
        >
          Show Toast with Action
        </Button>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Custom Duration</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() =>
              toast({
                title: "Quick toast",
                description: "Disappears in 2 seconds",
                duration: 2000,
              })
            }
          >
            2 seconds
          </Button>

          <Button
            onClick={() =>
              toast({
                title: "Long toast",
                description: "Stays for 10 seconds",
                duration: 10000,
              })
            }
          >
            10 seconds
          </Button>

          <Button
            onClick={() => {
              toast({
                title: "Persistent",
                description: "Won't auto-dismiss",
                duration: 0,
              });
            }}
          >
            No auto-dismiss
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Multiple Toasts</h3>
        <Button
          onClick={() => {
            success("First", "Toast 1");
            setTimeout(() => info("Second", "Toast 2"), 300);
            setTimeout(() => warning("Third", "Toast 3"), 600);
          }}
        >
          Show Multiple
        </Button>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Dismiss</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {
              toast({ title: "This can be dismissed manually", duration: 0 });
            }}
          >
            Show Persistent Toast
          </Button>

          <Button variant="destructive" onClick={() => dismiss()}>
            Dismiss All
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Real-world Examples</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() =>
              success("Settings saved", "Your preferences have been updated")
            }
          >
            Save Settings
          </Button>

          <Button
            onClick={() =>
              error("Upload failed", "The file size exceeds 10MB limit")
            }
          >
            Failed Upload
          </Button>

          <Button
            onClick={() =>
              warning(
                "Unsaved changes",
                "You have unsaved changes that will be lost",
              )
            }
          >
            Unsaved Warning
          </Button>

          <Button
            onClick={() =>
              info("Tip", "Press Ctrl+K to open the command palette")
            }
          >
            Show Tip
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ToastShowcase() {
  return (
    <Toast.Provider>
      <ToastDemoContent />
    </Toast.Provider>
  );
}
