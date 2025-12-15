import * as React from "react";
import { Switch } from "@labs/ui/switch";
import { LoginMethods, LoginMethodConfig, FactorDetails } from "@labs/auth";
import { Smartphone, Mail } from "lucide-react";
import { FactorConfigDialog } from "./factor-config-dialog";

interface LoginMethodMatrixProps {
  config: LoginMethods;
  onChange: (config: LoginMethods) => void;
}

export function LoginMethodMatrix({ config, onChange }: LoginMethodMatrixProps) {
  const updateMethod = (
    method: "email" | "phone",
    updates: Partial<LoginMethodConfig>
  ) => {
    onChange({
      ...config,
      [method]: {
        ...config[method],
        ...updates,
      },
    });
  };

  const updateFactor = (
    method: "email" | "phone",
    factor: "otp" | "pin",
    updates: Partial<FactorDetails>
  ) => {
    onChange({
      ...config,
      [method]: {
        ...config[method],
        [factor]: {
          ...config[method][factor],
          ...updates,
        },
      },
    });
  };

  return (
    <div className="rounded-md border">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[200px]">Identifier</th>
            <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-center">Password</th>
            <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-center">OTP / Magic Link</th>
            <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-center">PIN</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {/* Email Row */}
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <td className="p-4 align-middle font-medium">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </div>
            </td>
            <td className="p-4 align-middle text-center">
              <Switch
                checked={config.email.password}
                onCheckedChange={(checked) =>
                  updateMethod("email", { password: checked })
                }
              />
            </td>
            <td className="p-4 align-middle text-center">
              <div className="flex items-center justify-center gap-2">
                <Switch
                  checked={config.email.otp.enabled}
                  onCheckedChange={(checked) =>
                    updateFactor("email", "otp", { enabled: checked })
                  }
                />
                 {config.email.otp.enabled && (
                    <FactorConfigDialog
                        title="Email OTP Configuration"
                        description="Configure settings for One-Time Passwords sent via Email."
                        config={config.email.otp}
                        onSave={(updates) => updateFactor("email", "otp", updates)}
                    />
                 )}
              </div>
            </td>
            <td className="p-4 align-middle text-center">
              <div className="flex items-center justify-center gap-2">
                <Switch
                  checked={config.email.pin.enabled}
                  onCheckedChange={(checked) =>
                    updateFactor("email", "pin", { enabled: checked })
                  }
                />
                {config.email.pin.enabled && (
                    <FactorConfigDialog
                        title="Email PIN Configuration"
                        description="Configure restrictions for Email-linked PINs."
                        config={config.email.pin}
                        onSave={(updates) => updateFactor("email", "pin", updates)}
                    />
                 )}
              </div>
            </td>
          </tr>

          {/* Phone Row */}
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <td className="p-4 align-middle font-medium">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Phone
              </div>
            </td>
            <td className="p-4 align-middle text-center">
              <Switch
                checked={config.phone.password}
                onCheckedChange={(checked) =>
                  updateMethod("phone", { password: checked })
                }
              />
            </td>
            <td className="p-4 align-middle text-center">
              <div className="flex items-center justify-center gap-2">
                <Switch
                  checked={config.phone.otp.enabled}
                  onCheckedChange={(checked) =>
                    updateFactor("phone", "otp", { enabled: checked })
                  }
                />
                 {config.phone.otp.enabled && (
                    <FactorConfigDialog
                        title="SMS/Phone OTP Configuration"
                        description="Configure settings for OTPs sent via SMS."
                        config={config.phone.otp}
                        onSave={(updates) => updateFactor("phone", "otp", updates)}
                    />
                 )}
              </div>
            </td>
            <td className="p-4 align-middle text-center">
               <div className="flex items-center justify-center gap-2">
                <Switch
                  checked={config.phone.pin.enabled}
                  onCheckedChange={(checked) =>
                    updateFactor("phone", "pin", { enabled: checked })
                  }
                />
                 {config.phone.pin.enabled && (
                    <FactorConfigDialog
                        title="Phone PIN Configuration"
                        description="Configure restrictions for Phone-linked PINs."
                        config={config.phone.pin}
                        onSave={(updates) => updateFactor("phone", "pin", updates)}
                    />
                 )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
