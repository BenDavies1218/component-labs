import { Input } from "../input/Input";
import { Textarea } from "../textarea/Textarea";
import { Label } from "./Label";

export function LabelShowcase() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Basic</h3>
        <div className="space-y-2">
          <Label htmlFor="email-basic">Email Address</Label>
          <Input id="email-basic" type="email" placeholder="you@example.com" />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Required Field</h3>
        <div className="space-y-2">
          <Label htmlFor="password" required>
            Password
          </Label>
          <Input id="password" type="password" />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Error State</h3>
        <div className="space-y-2">
          <Label htmlFor="username" variant="error" required>
            Username
          </Label>
          <Input id="username" error="Username is already taken" />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Muted (Optional)</h3>
        <div className="space-y-2">
          <Label htmlFor="bio" variant="muted">
            Bio (optional)
          </Label>
          <Textarea id="bio" placeholder="Tell us about yourself..." />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Disabled</h3>
        <div className="space-y-2">
          <Label htmlFor="readonly" disabled>
            Readonly Field
          </Label>
          <Input id="readonly" disabled value="Cannot be changed" />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Complete Form</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="form-name" required>
              Full Name
            </Label>
            <Input id="form-name" placeholder="John Doe" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="form-email" required>
              Email
            </Label>
            <Input
              id="form-email"
              type="email"
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="form-phone" variant="muted">
              Phone Number (optional)
            </Label>
            <Input id="form-phone" type="tel" placeholder="+1 (555) 000-0000" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="form-message" required>
              Message
            </Label>
            <Textarea id="form-message" rows={4} placeholder="Your message..." />
          </div>
        </div>
      </div>
    </div>
  );
}
