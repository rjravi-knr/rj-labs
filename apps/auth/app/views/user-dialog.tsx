"use client";

import { useEffect, useState } from "react";
import { Button } from "@labs/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@labs/ui/dialog";
import { Input } from "@labs/ui/input";
import { Label } from "@labs/ui/label";
import { Switch } from "@labs/ui/switch";
import { Loader2 } from "lucide-react";
import { useAuth } from "@labs/auth/client";
import { api } from "../../lib/api";

interface User {
    id: string;
    email: string;
    fullName: string | null;
    isSuperAdmin: boolean;
    isActive: boolean;
}

interface UserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: User | null; // null = Add Mode, User object = Edit Mode
    onSuccess: () => void;
}

export function UserDialog({ open, onOpenChange, user, onSuccess }: UserDialogProps) {
    const { session, user: currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [isActive, setIsActive] = useState(true);

    // Reset or populate form when opening
    useEffect(() => {
        if (open) {
            setError(null);
            if (user) {
                // Edit Mode
                setEmail(user.email);
                setName(user.fullName || "");
                setIsSuperAdmin(user.isSuperAdmin);
                setIsActive(user.isActive);
            } else {
                // Add Mode
                setEmail("");
                setName("");
                setIsSuperAdmin(false);
                setIsActive(true);
            }
        }
    }, [open, user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const tenantId = currentUser?.tenantId || 'default-tenant';
            const method = user ? 'PATCH' : 'POST';
            
            const payload: any = {
                fullName: name,
                isSuperAdmin
            };

            if (user) {
                payload.id = user.id;
                payload.isActive = isActive;
            } else {
                payload.email = email;
            }

            if (user) {
                await api.patch(`/users?tenantId=${tenantId}`, payload);
            } else {
                await api.post(`/users?tenantId=${tenantId}`, payload);
            }

            onSuccess();
            onOpenChange(false);
        } catch (err: any) {
            setError(err.message || "Operation failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{user ? "Edit User" : "Add New User"}</DialogTitle>
                    <DialogDescription>
                        {user ? "Update user details and access permissions." : "Create a new user for this tenant."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    {error && (
                        <div className="text-sm text-red-500 bg-red-50 p-2 rounded border border-red-200">
                            {error}
                        </div>
                    )}
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="col-span-3"
                            disabled={!!user} // Email immutable in edit
                            required
                            type="email"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">
                            Admin
                        </Label>
                        <div className="col-span-3 flex items-center gap-2">
                             <Switch 
                                id="role" 
                                checked={isSuperAdmin}
                                onCheckedChange={setIsSuperAdmin}
                             />
                             <span className="text-xs text-muted-foreground">
                                {isSuperAdmin ? "Grant full access" : "Standard member access"}
                             </span>
                        </div>
                    </div>

                    {user && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="active" className="text-right">
                                Active
                            </Label>
                            <div className="col-span-3 flex items-center gap-2">
                                <Switch 
                                    id="active" 
                                    checked={isActive}
                                    onCheckedChange={setIsActive}
                                    className="data-[state=checked]:bg-green-500"
                                />
                                <span className="text-xs text-muted-foreground">
                                    {isActive ? "User can log in" : "User access suspended"}
                                </span>
                            </div>
                        </div>
                    )}
                </form>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                        Cancel
                    </Button>
                    <Button type="submit" onClick={handleSubmit} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {user ? "Save Changes" : "Create User"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
