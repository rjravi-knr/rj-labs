
import { Construction } from "lucide-react";
import { Button } from "@labs/ui/button";
import Link from "next/link";

export default function PreviewPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-grid-slate-900/[0.04] bg-background">
            <div className="flex flex-col items-center space-y-4 text-center p-8 rounded-2xl border bg-card shadow-lg max-w-md mx-4">
                <div className="h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center animate-pulse">
                    <Construction className="h-8 w-8 text-amber-600 dark:text-amber-500" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">Preview Mode</h1>
                <p className="text-muted-foreground">
                    This feature is currently under construction. 
                    Soon you will be able to preview exactly how your login pages look to end users.
                </p>
                <div className="pt-4">
                     <Button asChild variant="default">
                        <Link href="/settings/general">Back to Settings</Link>
                     </Button>
                </div>
            </div>
        </div>
    );
}
