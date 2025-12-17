import * as React from "react";
import { Switch } from "@labs/ui/switch";
import { LoginMethods, LoginMethodEnablement } from "@labs/auth";
import { Smartphone, Mail, User as UserIcon } from "lucide-react";

interface LoginMethodMatrixProps {
  config: LoginMethods;
  onChange: (config: LoginMethods) => void;
}

export function LoginMethodMatrix({ config, onChange }: LoginMethodMatrixProps) {
  const updateMethod = (
    method: "email" | "phone" | "username",
    updates: Partial<LoginMethodEnablement> // Use correct type
  ) => {
    onChange({
      ...config,
      [method]: {
        ...config[method],
        ...updates,
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
                <Switch
                  checked={config.email.otp}
                  onCheckedChange={(checked) =>
                    updateMethod("email", { otp: checked })
                  }
                />
            </td>
            <td className="p-4 align-middle text-center">
                <Switch
                  checked={config.email.pin}
                  onCheckedChange={(checked) =>
                    updateMethod("email", { pin: checked })
                  }
                />
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
                <Switch
                  checked={config.phone.otp}
                  onCheckedChange={(checked) =>
                    updateMethod("phone", { otp: checked })
                  }
                />
            </td>
            <td className="p-4 align-middle text-center">
                <Switch
                  checked={config.phone.pin}
                  onCheckedChange={(checked) =>
                    updateMethod("phone", { pin: checked })
                  }
                />
            </td>
          </tr>

          {/* Username Row */}
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <td className="p-4 align-middle font-medium">
              <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                Username
              </div>
            </td>
            <td className="p-4 align-middle text-center">
              <Switch
                checked={config.username?.password || false}
                onCheckedChange={(checked) =>
                  updateMethod("username", { password: checked })
                }
              />
            </td>
            <td className="p-4 align-middle text-center">
                <Switch
                  checked={config.username?.otp || false}
                  onCheckedChange={(checked) =>
                    updateMethod("username", { otp: checked })
                  }
                />
            </td>
            <td className="p-4 align-middle text-center">
                <Switch
                  checked={config.username?.pin || false}
                  onCheckedChange={(checked) =>
                    updateMethod("username", { pin: checked })
                  }
                />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
