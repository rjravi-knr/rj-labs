"use client";

import * as React from "react";
import { Button } from "@labs/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@labs/ui/card";
import { Input } from "@labs/ui/input";
import { Label } from "@labs/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@labs/ui/toggle-group";
import { FactorPolicy } from "@labs/auth";
import { Loader2, Save } from "lucide-react";

interface PolicyConfigCardProps {
  title: string;
  description: string;
  policy: FactorPolicy;
  onSave: (policy: FactorPolicy) => void;
}

export function PolicyConfigCard({
  title,
  description,
  policy,
  onSave,
}: PolicyConfigCardProps) {
  const [localPolicy, setLocalPolicy] = React.useState<FactorPolicy>(policy);
  const [isDirty, setIsDirty] = React.useState(false);

  React.useEffect(() => {
     setLocalPolicy(policy);
     setIsDirty(false);
  }, [policy]);

  const updateField = (updates: Partial<FactorPolicy>) => {
      setLocalPolicy(prev => ({ ...prev, ...updates }));
      setIsDirty(true);
  };

  const handleSave = () => {
    onSave(localPolicy);
    setIsDirty(false); // Optimistic
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="text-base">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </div>
            {isDirty && (
                <Button size="sm" onClick={handleSave} variant="secondary">
                    <Save className="mr-2 h-4 w-4" />
                    Save Local
                </Button>
            )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Code Length</Label>
            <ToggleGroup
              type="single"
              value={String(localPolicy.length || 6)}
              onValueChange={(val) => {
                if (val) updateField({ length: parseInt(val) });
              }}
              className="justify-start"
            >
              <ToggleGroupItem value="4" aria-label="4 digits">
                4 Digits
              </ToggleGroupItem>
              <ToggleGroupItem value="6" aria-label="6 digits">
                6 Digits
              </ToggleGroupItem>
              <ToggleGroupItem value="8" aria-label="8 digits">
                8 Digits
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor={`expiry-${title}`}>Expiry (Seconds)</Label>
                <Input
                    id={`expiry-${title}`}
                    type="number"
                    value={localPolicy.expiry || 300}
                    onChange={(e) => updateField({ expiry: parseInt(e.target.value) || 300 })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`attempts-${title}`}>Max Attempts</Label>
                <Input
                    id={`attempts-${title}`}
                    type="number"
                    value={localPolicy.maxAttempts || 3}
                    onChange={(e) => updateField({ maxAttempts: parseInt(e.target.value) || 3 })}
                />
              </div>
          </div>
      </CardContent>
    </Card>
  );
}
