import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@labs/ui/button';
import { Command } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions - RJ SaaS',
  description: 'Our terms and conditions',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
        <div className="container mx-auto max-w-3xl px-6 py-12 md:py-20">
        <header className="mb-10 text-center md:text-left">
          <Link href="/sign-in" className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Command className="h-4 w-4" />
            <span>Back to Sign In</span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Terms and Conditions</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Last updated: December 6, 2025
          </p>
        </header>
        
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold tracking-tight">1. Agreement to Terms</h2>
            <p className="leading-7 text-muted-foreground mt-2">
              These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and RJ SaaS ("we," "us" or "our"), concerning your access to and use of our application and website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight">2. Intellectual Property Rights</h2>
            <p className="leading-7 text-muted-foreground mt-2">
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight">3. User Representations</h2>
            <p className="leading-7 text-muted-foreground mt-2">
              By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Use.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight">4. Prohibited Activities</h2>
            <p className="leading-7 text-muted-foreground mt-2">
              You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold tracking-tight">5. Term and Termination</h2>
            <p className="leading-7 text-muted-foreground mt-2">
              These Terms of Use shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON.
            </p>
          </section>
          
           <div className="pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                Questions about the Terms of Service should be sent to us at <a href="mailto:support@example.com" className="text-primary hover:underline">support@example.com</a>.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
