"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@labs/ui/button';
import { Input } from '@labs/ui/input';
import { Label } from '@labs/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@labs/ui/card';

export function TenantSelectionForm() {
  const [tenantId, setTenantId] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tenantId) {
      router.push(`/sign-in?tenantId=${tenantId}`);
    }
  };

  return (
    <Card className="border-none shadow-none sm:border sm:shadow-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Sign In
        </CardTitle>
        <CardDescription>
          Enter your Workspace ID to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="tenantId">Workspace / Company ID</Label>
            <Input
              id="tenantId"
              placeholder="MyCompany"
              value={tenantId}
              onChange={(e) => setTenantId(e.target.value)}
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
