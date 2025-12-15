"use client";

import * as React from "react";
import { Button } from "@labs/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@labs/ui/dialog";
import { Input } from "@labs/ui/input";
import { Label } from "@labs/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@labs/ui/toggle-group";
import { Settings2 } from "lucide-react";
import { FactorDetails } from "@labs/auth";

interface FactorConfigDialogProps {
  title: string;
  description: string;
  config: FactorDetails;
  onSave: (config: FactorDetails) => void;
  trigger?: React.ReactNode;
}

export function FactorConfigDialog({
  title,
  description,
  config,
  onSave,
  trigger,
}: FactorConfigDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [localConfig, setLocalConfig] = React.useState<FactorDetails>(config);

  React.useEffect(() => {
    if (open) {
      setLocalConfig(config);
    }
  }, [open, config]);

  const handleSave = () => {
    onSave(localConfig);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings2 className="h-4 w-4" />
            <span className="sr-only">Open configuration</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Code Length</Label>
            <ToggleGroup
              type="single"
              value={String(localConfig.length || 6)}
              onValueChange={(val) => {
                if (val) setLocalConfig({ ...localConfig, length: parseInt(val) });
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
            <p className="text-[0.8rem] text-muted-foreground">
              Number of digits for the generated code.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="expiry">Expiry (Seconds)</Label>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="expiry"
                type="number"
                value={localConfig.expiry || 300}
                onChange={(e) =>
                  setLocalConfig({
                    ...localConfig,
                    expiry: parseInt(e.target.value) || 300,
                  })
                }
                className="col-span-4"
              />
            </div>
            <p className="text-[0.8rem] text-muted-foreground">
              How long the code remains valid.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="attempts">Max Attempts</Label>
            <Input
              id="attempts"
              type="number"
              value={localConfig.maxAttempts || 3}
              onChange={(e) =>
                setLocalConfig({
                  ...localConfig,
                  maxAttempts: parseInt(e.target.value) || 3,
                })
              }
            />
             <p className="text-[0.8rem] text-muted-foreground">
              Failed tries allowed before invalidation.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
