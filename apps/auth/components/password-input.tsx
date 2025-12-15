"use client";

import * as React from "react";
import { Input } from "@labs/ui/input";
import { Button } from "@labs/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { PasswordStrengthMeter } from "./password-strength-meter";
import { PasswordPolicy } from "@labs/auth/password-policy";
import { cn } from "@labs/ui/lib/utils";

export interface PasswordInputProps extends React.ComponentProps<"input"> {
    policy?: PasswordPolicy;
    showStrengthMeter?: boolean;
    userContext?: { email?: string; name?: string; username?: string };
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, policy, showStrengthMeter, userContext, onChange, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);
        const [value, setValue] = React.useState(props.defaultValue || props.value || "");

        // Sync internal value state for meter if not controlled completely
        React.useEffect(() => {
            if (props.value !== undefined) {
                setValue(props.value);
            }
        }, [props.value]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
            if (onChange) {
                onChange(e);
            }
        };

        return (
            <div className="space-y-2">
                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        className={cn("pr-10", className)}
                        ref={ref}
                        onChange={handleChange}
                        {...props}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword((prev) => !prev)}
                        tabIndex={-1} // Skip tab index for better flow
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                        </span>
                    </Button>
                </div>
                {showStrengthMeter && (
                    <PasswordStrengthMeter
                        password={String(value)}
                        policy={policy}
                        userContext={userContext}
                    />
                )}
            </div>
        );
    }
);
PasswordInput.displayName = "PasswordInput";
