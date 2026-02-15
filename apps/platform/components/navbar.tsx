"use client";

import Link from "next/link";
import { useAuth } from "@labs/auth/client";
import { Button } from "@labs/ui/button";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@labs/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@labs/ui/avatar";
import { LayoutDashboard, User, LogOut, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function Navbar() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();

    // Configuration - In a real app this might come from env or context
    // For now static as requested
    const AUTH_URL = "http://localhost:3000"; 
    const PLATFORM_URL = "http://localhost:3004"; // Current App
    const REDIRECT_URL = `${PLATFORM_URL}/auth/callback`;

    const handleSignIn = () => {
        window.location.href = `${AUTH_URL}/sign-in?redirect=${REDIRECT_URL}`;
    };

    const handleSignOut = async () => {
        // 1. Clear Local Platform Session
        await signOut();
        
        // 2. Redirect to Auth Server to clear Global Session
        // This ensures that next time "Sign In" is clicked, we see the login form
        window.location.href = `${AUTH_URL}/logout?redirect=${PLATFORM_URL}`;
    };

    return (
        <header className="px-6 py-4 flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
             <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                    <LayoutDashboard className="h-5 w-5" />
                </div>
                <span>RJ Platform</span>
             </Link>

             <nav className="flex items-center gap-4">
                 <Link href="/docs" className="text-sm font-medium hover:text-primary transition-colors hidden sm:block">
                    Documentation
                 </Link>

                 {loading ? (
                     <Button variant="ghost" size="icon" disabled>
                         <Loader2 className="h-5 w-5 animate-spin" />
                     </Button>
                 ) : user ? (
                     <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                             <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                 <Avatar className="h-9 w-9 border">
                                     <AvatarImage src={user.image} alt={user.fullName || "User"} />
                                     <AvatarFallback>{(user.fullName || user.email || "U").charAt(0).toUpperCase()}</AvatarFallback>
                                 </Avatar>
                             </Button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent className="w-56" align="end">
                             <DropdownMenuLabel className="font-normal">
                                 <div className="flex flex-col space-y-1">
                                     <p className="text-sm font-medium leading-none">{user.fullName || "User"}</p>
                                     <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                 </div>
                             </DropdownMenuLabel>
                             <DropdownMenuSeparator />
                             <DropdownMenuItem onClick={() => window.location.href = `${AUTH_URL}/settings`}>
                                 <User className="mr-2 h-4 w-4" />
                                 <span>Profile Settings</span>
                             </DropdownMenuItem>
                             <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                                 <LogOut className="mr-2 h-4 w-4" />
                                 <span>Log out</span>
                             </DropdownMenuItem>
                         </DropdownMenuContent>
                     </DropdownMenu>
                 ) : (
                     <Button onClick={handleSignIn} size="sm">
                         Sign In
                     </Button>
                 )}
             </nav>
        </header>
    );
}
