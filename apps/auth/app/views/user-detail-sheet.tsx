import { useEffect, useState } from "react";
import {
    Sheet,
    SheetContent,
} from "@labs/ui/sheet";
import { Badge } from "@labs/ui/badge";
import { formatDate } from "@labs/utils";
import { 
    Mail, 
    User as UserIcon, 
    Shield, 
    Calendar, 
    CheckCircle2, 
    ShieldCheck,
    Phone,
    Loader2,
    Lock,
    Activity,
    LogIn
} from "lucide-react";
import { useAuth } from "@labs/auth/client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@labs/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@labs/ui/avatar";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@labs/ui/accordion";
import { Card, CardContent } from "@labs/ui/card";
import { Separator } from "@labs/ui/separator";

interface User {
    id: string;
    email: string;
    fullName: string | null;
    username?: string | null;
    displayName?: string | null;
    memberCode?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    isSuperAdmin: boolean;
    isActive: boolean;
    createdAt: string;
    emailVerified: boolean;
    emailVerifiedTimestamp?: string | null;
    phoneVerified: boolean;
    phoneVerifiedTimestamp?: string | null;
    userVerified: boolean;
    userVerifiedTimestamp?: string | null;
    provider: string | null;
}

interface Session {
    id: string;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: string;
    expiresAt: string;
}

interface DetailedUserResponse {
    user: User;
    sessions: Session[];
}

interface UserDetailSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: User | null;
}

export function UserDetailSheet({ open, onOpenChange, user: initialUser }: UserDetailSheetProps) {
    const { session: authSession, user: currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DetailedUserResponse | null>(null);

    // Use initial user for basic display until detailed fetch provided
    const displayUser = data?.user || initialUser;

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!open || !initialUser?.id || !authSession?.token) return;

            setLoading(true);
            try {
                const tenantId = currentUser?.tenantId || 'default-tenant';
                const res = await fetch(`/api/auth/users/${initialUser.id}?tenantId=${tenantId}`, {
                    headers: { 'Authorization': `Bearer ${authSession.token}` }
                });

                if (res.ok) {
                    const result = await res.json();
                    setData(result);
                } else {
                    console.error("Failed to fetch user details");
                }
            } catch (error) {
                console.error("Error fetching user details", error);
            } finally {
                setLoading(false);
            }
        };

        if (open) {
            fetchUserDetails();
        } else {
            setData(null); // Reset on close
        }
    }, [open, initialUser?.id, authSession?.token, currentUser?.tenantId]);

    if (!displayUser) return null;

    const getInitials = (name: string | null | undefined) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-[600px] w-full p-0 overflow-y-auto bg-background">
                {/* Header Section (Unchanged as requested) */}
                <div className="bg-muted/30 border-b p-6">
                    <div className="flex items-start gap-4">
                        <Avatar className="h-20 w-20 border-2 border-background shadow-sm">
                            <AvatarImage src="" />
                            <AvatarFallback className="text-xl bg-primary/10 text-primary">
                                {getInitials(displayUser.fullName || displayUser.email)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                             <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold tracking-tight">
                                    {displayUser.fullName || displayUser.username || "User Profile"}
                                </h2>
                                <div className="flex gap-2">
                                     {displayUser.isSuperAdmin && (
                                        <Badge variant="default" className="bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 border-indigo-200">
                                            Super Admin
                                        </Badge>
                                    )}
                                    {displayUser.isActive ? (
                                        <Badge variant="outline" className="border-green-500/20 text-green-600 bg-green-500/5">
                                            Active
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-muted-foreground">
                                            Inactive
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            <p className="text-muted-foreground flex items-center gap-2">
                                <Mail className="h-4 w-4 text-purple-600" /> {displayUser.email}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-1">
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4 text-orange-500" /> Joined {formatDate(new Date(displayUser.createdAt), "MMM DD, YYYY")}
                                </span>
                                {displayUser.userVerified && (
                                    <span className="flex items-center gap-1 text-blue-600">
                                        <ShieldCheck className="h-4 w-4" /> Verified Identity
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Accordion Content (4 Sections) */}
                <div className="p-6 ">
                    <Accordion type="single" collapsible defaultValue="overview" className="w-full space-y-4">
                        
                        {/* 1. Overview */}
                        <AccordionItem value="overview" className="border rounded-lg px-4">
                            <AccordionTrigger className="hover:no-underline py-4">
                                <span className="flex items-center gap-2 text-base font-semibold">
                                    <UserIcon className="h-5 w-5 text-blue-500" /> Overview
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pb-6 space-y-4">
                                <Card className="border-0 shadow-none bg-transparent">
                                    <CardContent className="p-0 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Full Name</p>
                                                <p className="font-medium">{displayUser.fullName || "—"}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Username</p>
                                                <p className="font-medium">{displayUser.username || "—"}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Display Name</p>
                                                <p className="font-medium">{displayUser.displayName || "—"}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Member Code</p>
                                                <p className="font-mono text-sm">{displayUser.memberCode || "—"}</p>
                                            </div>
                                        </div>
                                        <Separator />
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <p className="text-sm text-muted-foreground">Email Address</p>
                                                    <p className="font-medium">{displayUser.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <p className="text-sm text-muted-foreground">Phone Number</p>
                                                    <p className="font-medium text-muted-foreground italic">Not provided</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>

                        {/* 2. Verifications */}
                        <AccordionItem value="verifications" className="border rounded-lg px-4">
                            <AccordionTrigger className="hover:no-underline py-4">
                                <span className="flex items-center gap-2 text-base font-semibold">
                                    <CheckCircle2 className="h-5 w-5 text-green-600" /> Verifications
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pb-6 space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="p-4 border rounded-lg bg-background flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                                <Mail className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">Email Status</p>
                                                {displayUser.emailVerifiedTimestamp && (
                                                     <p className="text-xs text-muted-foreground">
                                                        Verified {formatDate(new Date(displayUser.emailVerifiedTimestamp), "MMM DD")}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <Badge variant={displayUser.emailVerified ? "default" : "outline"} className={displayUser.emailVerified ? "bg-green-600 hover:bg-green-700" : ""}>
                                            {displayUser.emailVerified ? "Verified" : "Pending"}
                                        </Badge>
                                    </div>
                                    <div className="p-4 border rounded-lg bg-background flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                                <Phone className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">Phone Status</p>
                                                {displayUser.phoneVerifiedTimestamp && (
                                                     <p className="text-xs text-muted-foreground">
                                                        Verified {formatDate(new Date(displayUser.phoneVerifiedTimestamp), "MMM DD")}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <Badge variant={displayUser.phoneVerified ? "default" : "outline"} className={displayUser.phoneVerified ? "bg-green-600 hover:bg-green-700" : ""}>
                                            {displayUser.phoneVerified ? "Verified" : "Pending"}
                                        </Badge>
                                    </div>
                                    <div className="p-4 border rounded-lg bg-background flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                <ShieldCheck className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">Identity Status</p>
                                                {displayUser.userVerifiedTimestamp && (
                                                     <p className="text-xs text-muted-foreground">
                                                        Verified {formatDate(new Date(displayUser.userVerifiedTimestamp), "MMM DD")}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <Badge variant={displayUser.userVerified ? "default" : "outline"} className={displayUser.userVerified ? "bg-indigo-600 hover:bg-indigo-700" : ""}>
                                            {displayUser.userVerified ? "Verified" : "Pending"}
                                        </Badge>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* 3. Security */}
                        <AccordionItem value="security" className="border rounded-lg px-4">
                            <AccordionTrigger className="hover:no-underline py-4">
                                <span className="flex items-center gap-2 text-base font-semibold">
                                    <Shield className="h-5 w-5 text-indigo-600" /> Security
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pb-6 space-y-4">
                                <Card className="bg-muted/10 border-0">
                                   <CardContent className="pt-6">
                                       <div className="grid grid-cols-1 gap-4">
                                           <div className="flex justify-between items-center">
                                               <span className="text-sm text-muted-foreground">Account Status</span>
                                               <Badge variant={displayUser.isActive ? "secondary" : "destructive"} className={displayUser.isActive ? "bg-green-100 text-green-700" : ""}>
                                                   {displayUser.isActive ? "Active" : "Deactivated"}
                                               </Badge>
                                           </div>
                                           <Separator className="bg-background/20" />
                                            <div className="flex justify-between items-center">
                                               <span className="text-sm text-muted-foreground">Authentication Provider</span>
                                                <span className="text-sm font-medium capitalize flex items-center gap-2">
                                                   {displayUser.provider === 'google' ? (
                                                       <span className="h-2 w-2 rounded-full bg-red-500" />
                                                   ) : ( 
                                                       <span className="h-2 w-2 rounded-full bg-gray-400" />
                                                   )}
                                                   {displayUser.provider || "Email/Password"}
                                               </span>
                                           </div>
                                           <Separator className="bg-background/20" />
                                           <div className="space-y-1">
                                               <p className="text-sm text-muted-foreground">Internal User ID</p>
                                               <p className="text-xs font-mono break-all text-muted-foreground bg-background p-2 rounded border">{displayUser.id}</p>
                                           </div>
                                       </div>
                                   </CardContent>
                               </Card>
                            </AccordionContent>
                        </AccordionItem>

                        {/* 4. Login Activity */}
                        <AccordionItem value="activity" className="border rounded-lg px-4">
                            <AccordionTrigger className="hover:no-underline py-4">
                                <span className="flex items-center gap-2 text-base font-semibold">
                                    <Activity className="h-5 w-5 text-orange-500" /> Login Activity
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pb-6">
                                <div className="border rounded-md overflow-hidden shadow-sm">
                                    <Table>
                                        <TableHeader className="bg-muted/50">
                                            <TableRow>
                                                <TableHead>Date & Time</TableHead>
                                                <TableHead>IP</TableHead>
                                                <TableHead className="text-right">Device</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {!data?.sessions || data.sessions.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                                                        {loading ? "Loading..." : "No recent logins found."}
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                data.sessions.map((session) => (
                                                    <TableRow key={session.id}>
                                                        <TableCell className="font-medium text-xs">
                                                            {formatDate(new Date(session.createdAt), "MMM DD, h:mm a")}
                                                        </TableCell>
                                                        <TableCell className="font-mono text-xs">{session.ipAddress || "—"}</TableCell>
                                                        <TableCell className="text-right text-muted-foreground text-xs max-w-[150px] truncate" title={session.userAgent || ""}>
                                                            {session.userAgent || "—"}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                    </Accordion>
                </div>
            </SheetContent>
        </Sheet>
    );
}
