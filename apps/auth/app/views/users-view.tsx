"use client";

import { useEffect, useState } from "react";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@labs/ui/components/data-display/table"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card";
import { Badge } from "@labs/ui/badge";
import { Button } from "@labs/ui/button";
import { Input } from "@labs/ui/input";
import { 
    Loader2, 
    Search, 
    UserPlus, 
    MoreHorizontal, 
    Mail,
    Shield
} from "lucide-react";
import { useAuth } from "@labs/auth/client";
import { formatDate } from "@labs/utils";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@labs/ui/dropdown-menu";

interface User {
    id: string;
    email: string;
    fullName: string | null;
    isSuperAdmin: boolean;
    isActive: boolean;
    createdAt: string;
    emailVerified: boolean;
    provider: string | null;
}

export function UsersView() {
    const { user: currentUser, session } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            if (!session?.token) return; // Wait for token

            try {
                // Fetch from Next.js Proxy which calls Auth Service
                const res = await fetch(`/api/auth/users?tenantId=${currentUser?.tenantId || 'default-tenant'}`, {
                    headers: {
                        'Authorization': `Bearer ${session.token}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setUsers(data);
                }
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [currentUser?.tenantId, session?.token]);

    const filteredUsers = users.filter(u => 
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (u.fullName && u.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Users</h3>
                <p className="text-sm text-muted-foreground">
                    Manage users, roles, and access permissions for your tenant.
                </p>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div className="flex items-center gap-2">
                         <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search users..."
                                className="pl-8 w-[250px] h-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button size="sm" className="h-9 gap-1">
                        <UserPlus className="h-4 w-4" />
                        Add User
                    </Button>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex h-[200px] items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <div className="rounded-md border">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Joined</th>
                                        <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {filteredUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="h-24 text-center text-muted-foreground">
                                                No users found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <tr key={user.id} className="border-b transition-colors hover:bg-muted/50">
                                                <td className="p-4 align-middle">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{user.fullName || "—"}</span>
                                                        <span className="text-xs text-muted-foreground">{user.email}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 align-middle">
                                                    {user.isSuperAdmin ? (
                                                        <Badge variant="default" className="bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 border-indigo-200">
                                                            Admin
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="secondary" className="font-normal text-muted-foreground">
                                                            Member
                                                        </Badge>
                                                    )}
                                                </td>
                                                <td className="p-4 align-middle">
                                                    <div className="flex items-center gap-2">
                                                        {user.isActive ? (
                                                            <Badge variant="outline" className="border-green-500/20 text-green-600 bg-green-500/5">
                                                                Active
                                                            </Badge>
                                                        ) : (
                                                            <Badge variant="outline" className="text-muted-foreground">
                                                                Inactive
                                                            </Badge>
                                                        )}
                                                        {user.emailVerified && (
                                                            <Shield className="h-3 w-3 text-blue-500" title="Email Verified" />
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-4 align-middle text-muted-foreground">
                                                    {formatDate(new Date(user.createdAt), "YYYY-MM-DD")}
                                                </td>
                                                <td className="p-4 align-middle text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Open menu</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem>Detailed View</DropdownMenuItem>
                                                            <DropdownMenuItem>Edit Role</DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-red-600">
                                                                Remove User
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
