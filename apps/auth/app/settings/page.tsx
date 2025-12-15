import { redirect } from "next/navigation";

export default function SettingsPage({ searchParams }: { searchParams: { tenantId?: string } }) {
    const tenantId = searchParams.tenantId || "acme-corp";
    redirect(`/?tenantId=${tenantId}`);
}
