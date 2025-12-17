"use client";

import { useEffect, useState } from "react";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@labs/ui/table"; 
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@labs/ui/alert-dialog";
import { toast } from "@labs/ui/sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@labs/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@labs/ui/pagination";

interface User {
    id: string;
    email: string;
    fullName: string | null;
    username?: string | null;
    displayName?: string | null;
    isSuperAdmin: boolean;
    isActive: boolean;
    createdAt: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    userVerified: boolean;
    provider: string | null;
}

import { UserDialog } from "./user-dialog";
import { 
    Phone, 
    CheckCircle2, 
    ShieldCheck,
    Eye
} from "lucide-react";
import { UserDetailSheet } from "./user-detail-sheet";

export function UsersView() {
    const { user: currentUser, session } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Dialog State
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    
    // Delete Alert State
    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    // Detail Sheet State
    const [detailSheetOpen, setDetailSheetOpen] = useState(false);
    const [userToView, setUserToView] = useState<User | null>(null);

    const fetchUsers = async () => {
        if (!session?.token) return;

        try {
            const res = await fetch(`/api/auth/users?tenantId=${currentUser?.tenantId || 'default-tenant'}`, {
                headers: { 'Authorization': `Bearer ${session.token}` }
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

    useEffect(() => {
        fetchUsers();
    }, [currentUser?.tenantId, session?.token]);

    const handleAddUser = () => {
        setSelectedUser(null);
        setDialogOpen(true);
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setDialogOpen(true);
    };

    const handleViewUser = (user: User) => {
        setUserToView(user);
        setDetailSheetOpen(true);
    };

    const handleSuccess = () => {
        fetchUsers();
    };

    const handleToggleActive = async (user: User) => {
        if (!session?.token) return;

        try {
            setLoading(true);
            const tenantId = currentUser?.tenantId || 'default-tenant';
            const res = await fetch(`/api/auth/users?tenantId=${tenantId}&userId=${user.id}`, {
                method: 'PATCH',
                headers: { 
                    'Authorization': `Bearer ${session.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: user.id, isActive: !user.isActive })
            });

            if (!res.ok) {
                const err = await res.json();
                toast.error(`Failed to update user status: ${err.error || 'Unknown error'}`);
            } else {
                toast.success(`User ${!user.isActive ? 'activated' : 'deactivated'} successfully`);
                fetchUsers();
            }
        } catch (error) {
            console.error("Failed to update user status", error);
            toast.error("An error occurred while updating the user status.");
        } finally {
            setLoading(false);
        }
    };
    
    // Original handleRemoveUser...
    const handleRemoveUser = async (userId: string) => {
        if (!session?.token) return;

        try {
            setLoading(true);
            const tenantId = currentUser?.tenantId || 'default-tenant';
            const res = await fetch(`/api/auth/users?tenantId=${tenantId}&userId=${userId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${session.token}` }
            });

            if (!res.ok) {
                const err = await res.json();
                toast.error(`Failed to remove user: ${err.error || 'Unknown error'}`);
            } else {
                toast.success("User removed successfully");
                fetchUsers();
            }
        } catch (error) {
            console.error("Failed to remove user", error);
            toast.error("An error occurred while removing the user.");
        } finally {
            setLoading(false);
        }
    };

    const confirmDeleteUser = async () => {
        if (!userToDelete) return;
        await handleRemoveUser(userToDelete.id);
        setDeleteAlertOpen(false);
        setUserToDelete(null);
    };

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const filteredUsers = users.filter(u => 
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (u.fullName && u.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Calculate Pagination
    const totalItems = filteredUsers.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    // Reset page when filtering
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

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
                               // placeholder="Search users..."
                                className="pl-8 w-[250px] h-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button size="sm" className="h-9 gap-1" onClick={handleAddUser}>
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
                        <div className="space-y-4">
                                <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[200px]">User</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Verified</TableHead>
                                            <TableHead>Joined</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {currentUsers.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                                    No users found.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            currentUsers.map((user) => (
                                                <TableRow key={user.id}>
                                                    {/* User Col */}
                                                    <TableCell>
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">{user.fullName || user.displayName || user.username || "—"}</span>
                                                            <span className="text-xs text-muted-foreground">{user.email}</span>
                                                        </div>
                                                    </TableCell>
                                                    {/* Role Col */}
                                                    <TableCell>
                                                        {user.isSuperAdmin ? (
                                                            <Badge variant="default" className="bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 border-indigo-200">
                                                                Admin
                                                            </Badge>
                                                        ) : (
                                                            <Badge variant="secondary" className="font-normal text-muted-foreground">
                                                                Member
                                                            </Badge>
                                                        )}
                                                    </TableCell>
                                                    {/* Status Col */}
                                                    <TableCell>
                                                        {user.isActive ? (
                                                            <Badge variant="outline" className="border-green-500/20 text-green-600 bg-green-500/5">
                                                                Active
                                                            </Badge>
                                                        ) : (
                                                            <Badge variant="outline" className="text-muted-foreground">
                                                                Inactive
                                                            </Badge>
                                                        )}
                                                    </TableCell>
                                                    {/* Verified Col (New) */}
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            {user.userVerified ? (
                                                                 <Badge variant="outline" className="border-blue-500/20 text-blue-600 bg-blue-500/5 gap-1.5 pr-3 pl-2 py-1 text-sm [&>svg]:size-4">
                                                                    <ShieldCheck />
                                                                    Verified
                                                                </Badge>
                                                            ) : (
                                                                <>
                                                                    {user.emailVerified && (
                                                                        <div title="Email Verified" className="p-1 rounded-md bg-green-50 text-green-600 border border-green-200">
                                                                            <Mail className="h-4 w-4" />
                                                                        </div>
                                                                    )}
                                                                    {user.phoneVerified && (
                                                                        <div title="Phone Verified" className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                                                                            <Phone className="h-4 w-4" />
                                                                        </div>
                                                                    )}
                                                                    {!user.emailVerified && !user.phoneVerified && (
                                                                        <span className="text-xs text-muted-foreground">—</span>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    {/* Joined Col */}
                                                    <TableCell className="text-muted-foreground">
                                                        {formatDate(new Date(user.createdAt), "MMM DD, YYYY")}
                                                    </TableCell>
                                                    {/* Actions Col */}
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            {/* ... menu items ... */}
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                                    <span className="sr-only">Open menu</span>
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuItem onClick={() => handleViewUser(user)}>
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View Details
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                                                    Edit User
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => handleToggleActive(user)}>
                                                                    {user.isActive ? "Deactivate User" : "Activate User"}
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem 
                                                                    className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
                                                                    onSelect={(e) => {
                                                                        e.preventDefault();
                                                                        setUserToDelete(user);
                                                                        setDeleteAlertOpen(true);
                                                                    }}
                                                                >
                                                                    Remove User
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                            
                            {/* Pagination Controls */}
                            {totalItems > 0 && (
                                <div className="flex items-center justify-between px-2 pt-4">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>Show</span>
                                        <Select
                                            value={pageSize.toString()}
                                            onValueChange={(v) => {
                                                setPageSize(Number(v));
                                                setCurrentPage(1);
                                            }}
                                        >
                                            <SelectTrigger className="h-8 w-[70px]">
                                                <SelectValue placeholder={pageSize.toString()} />
                                            </SelectTrigger>
                                            <SelectContent side="top">
                                                {[5, 10, 20, 50, 100].map((size) => (
                                                    <SelectItem key={size} value={size.toString()}>
                                                        {size}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <span>
                                            {startIndex + 1}-{endIndex} of {totalItems}
                                        </span>
                                    </div>

                                    <div className="flex-1 flex justify-end">
                                         <Pagination>
                                            <PaginationContent>
                                                <PaginationItem>
                                                    <PaginationPrevious 
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if (currentPage > 1) setCurrentPage(currentPage - 1);
                                                        }}
                                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                                    />
                                                </PaginationItem>
                                                
                                                 <PaginationItem>
                                                    <span className="text-sm font-medium px-2">
                                                        Page {currentPage} of {totalPages}
                                                    </span>
                                                </PaginationItem>

                                                <PaginationItem>
                                                    <PaginationNext 
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                                                        }}
                                                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                                                    />
                                                </PaginationItem>
                                            </PaginationContent>
                                        </Pagination>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            <UserDialog 
                open={dialogOpen} 
                onOpenChange={setDialogOpen} 
                user={selectedUser} 
                onSuccess={handleSuccess} 
            />

            <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the user account 
                            <strong> {userToDelete?.fullName || userToDelete?.email}</strong> and remove their data from our servers.
                            <br/><br/>
                            If you just want to prevent access, consider <strong>Deactivating</strong> the user instead from the actions menu.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDeleteUser} className="bg-red-600 hover:bg-red-700">
                            Delete User
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <UserDetailSheet 
                open={detailSheetOpen} 
                onOpenChange={setDetailSheetOpen} 
                user={userToView} 
            />
        </div>
    );
}

