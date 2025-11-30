import Image, { type ImageProps } from "next/image";
import { Button } from "@labs/ui/button";
import styles from "./page.module.css";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          RJ Suite
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
          A Modern SaaS System Monorepo
        </p>

        <div style={{ maxWidth: '600px', textAlign: 'left', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📦 About This Monorepo</h2>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
            This is a <strong>Turborepo monorepo</strong> setup for the RJ Suite SaaS System. 
            It contains multiple applications and shared packages organized efficiently.
          </p>

          <div style={{ background: '#f5f5f5', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🌐 <strong>/web</strong> <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: 'normal' }}>(this app)</span>
            </h3>
            <p style={{ margin: '0.5rem 0', lineHeight: '1.6', color: '#555' }}>
              The <strong>main web application</strong> - This is where your primary SaaS application lives. 
              Build your core product features, user dashboards, and business logic here.
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
              📁 Location: <code style={{ background: '#e5e5e5', padding: '2px 6px', borderRadius: '4px' }}>apps/web</code>
            </p>
          </div>

          <div style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📚 <strong>/docs</strong>
            </h3>
            <p style={{ margin: '0.5rem 0', lineHeight: '1.6', color: '#555' }}>
              The <strong>documentation application</strong> - A separate Next.js app for your project documentation, 
              API references, guides, and developer resources.
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
              📁 Location: <code style={{ background: '#dbeafe', padding: '2px 6px', borderRadius: '4px' }}>apps/docs</code>
            </p>
          </div>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>🎯 Quick Start</h3>
          <ol style={{ lineHeight: '1.8', color: '#555' }}>
            <li>Edit <code style={{ background: '#e5e5e5', padding: '2px 6px', borderRadius: '4px' }}>apps/web/app/page.tsx</code> to customize this page</li>
            <li>Shared UI components are in the <code style={{ background: '#e5e5e5', padding: '2px 6px', borderRadius: '4px' }}>@labs/ui</code> package</li>
            <li>Run <code style={{ background: '#e5e5e5', padding: '2px 6px', borderRadius: '4px' }}>pnpm run dev</code> to start all apps in development mode</li>
          </ol>
        </div>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="/docs"
            rel="noopener noreferrer"
          >
            📚 View Documentation
          </a>
          <Button className={styles.secondary}>
            Get Started
          </Button>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com/templates?search=turborepo&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://turborepo.com?utm_source=create-turbo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to turborepo.com →
        </a>
      </footer>
    </div>
  );
}
