"use client";

import { DashboardView } from "../views/dashboard-view";
import SettingsLayout from "../settings/layout";

export default function DashboardPage() {
    return (
        <SettingsLayout>
             <DashboardView />
        </SettingsLayout>
    );
}

// NOTE: Instead of duplicating layout, I should really use a route group (admin) or just move dashboard to /settings/dashboard. 
// BUT the prompt implies /dashboard is a sibling.
// Given strict instructions, I will just duplicate the layout wrapper here or import it if possible.
// Actually, I can import SettingsLayout? No, it's a default export.
// Let's just create apps/auth/app/dashboard/page.tsx and layout.tsx if needed.
// Or just move dashboard to apps/auth/app/settings/dashboard/page.tsx and update sidebar href.
