import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@labs/ui/button';
import { Command } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - RJ SaaS',
  description: 'Our privacy policy',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <div className="container mx-auto max-w-3xl px-6 py-12 md:py-20">
        <header className="mb-10 text-center md:text-left">
          <Link href="/sign-in" className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Command className="h-4 w-4" />
            <span>Back to Sign In</span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Privacy Policy</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Last updated: December 6, 2025
          </p>
        </header>
        
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold tracking-tight">1. Introduction</h2>
            <p className="leading-7 text-muted-foreground mt-2">
              Welcome to RJ SaaS. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight">2. The data we collect about you</h2>
            <p className="leading-7 text-muted-foreground mt-2">
              Personal data, or personal information, means any information about an individual from which that person can be identified. It does not include data where the identity has been removed (anonymous data).
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
              <li><strong>Identity Data</strong> includes first name, maiden name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight">3. How we use your personal data</h2>
            <p className="leading-7 text-muted-foreground mt-2">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
             <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal or regulatory obligation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight">4. Data Security</h2>
            <p className="leading-7 text-muted-foreground mt-2">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
          </section>
          
           <div className="pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                If you have any questions about this privacy policy, please contact us at <a href="mailto:privacy@example.com" className="text-primary hover:underline">privacy@example.com</a>.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
