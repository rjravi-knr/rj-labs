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
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '3.5rem', margin: '0 0 0.5rem 0', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            📚 RJ Suite Documentation
          </h1>
          <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '0' }}>
            Your comprehensive guide to the RJ Suite SaaS System
          </p>
        </div>

        <div style={{ maxWidth: '800px', textAlign: 'left', marginBottom: '2rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem', borderRadius: '12px', color: 'white', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', margin: '0 0 1rem 0', color: 'white' }}>🚀 Welcome to RJ Suite</h2>
            <p style={{ margin: '0', lineHeight: '1.8', fontSize: '1.1rem', opacity: '0.95' }}>
              RJ Suite is a modern SaaS system built with a <strong>Turborepo monorepo</strong> architecture. 
              This documentation will help you understand the project structure, development workflow, and best practices.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '2px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.3rem', margin: '0 0 0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🏗️ Monorepo Structure
              </h3>
              <ul style={{ margin: '0', paddingLeft: '1.25rem', lineHeight: '1.8', color: '#475569' }}>
                <li><code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9rem' }}>apps/web</code> - Main SaaS app</li>
                <li><code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9rem' }}>apps/docs</code> - This docs site</li>
                <li><code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9rem' }}>packages/*</code> - Shared packages</li>
              </ul>
            </div>

            <div style={{ background: '#fefce8', padding: '1.5rem', borderRadius: '8px', border: '2px solid #fde047' }}>
              <h3 style={{ fontSize: '1.3rem', margin: '0 0 0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ⚡ Quick Commands
              </h3>
              <ul style={{ margin: '0', paddingLeft: '1.25rem', lineHeight: '1.8', color: '#713f12', listStyle: 'none' }}>
                <li><code style={{ background: '#fef08a', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', display: 'inline-block', marginBottom: '0.5rem' }}>pnpm run dev</code> - Start dev servers</li>
                <li><code style={{ background: '#fef08a', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', display: 'inline-block', marginBottom: '0.5rem' }}>pnpm run build</code> - Build all apps</li>
                <li><code style={{ background: '#fef08a', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', display: 'inline-block', marginBottom: '0.5rem' }}>pnpm run lint</code> - Lint all apps</li>
              </ul>
            </div>
          </div>

          <div style={{ background: '#f0f9ff', padding: '2rem', borderRadius: '8px', marginBottom: '2rem', border: '2px solid #7dd3fc' }}>
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0' }}>📦 Shared Packages</h2>
            <p style={{ margin: '0 0 1rem 0', lineHeight: '1.6', color: '#0c4a6e' }}>
              The monorepo includes shared packages that are used across multiple apps:
            </p>
            <div style={{ background: 'white', padding: '1rem', borderRadius: '6px' }}>
              <ul style={{ margin: '0', paddingLeft: '1.5rem', lineHeight: '2', color: '#0c4a6e' }}>
                <li><strong>@labs/ui</strong> - Shared React UI components</li>
                <li><strong>@labs/typescript-config</strong> - Shared TypeScript configurations</li>
                <li><strong>@labs/eslint-config</strong> - Shared ESLint rules</li>
              </ul>
            </div>
          </div>

          <div style={{ background: '#faf5ff', padding: '2rem', borderRadius: '8px', border: '2px solid #d8b4fe' }}>
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0' }}>🎯 Getting Started</h2>
            <ol style={{ margin: '0', paddingLeft: '1.5rem', lineHeight: '2', color: '#581c87' }}>
              <li>Clone the repository and run <code style={{ background: '#e9d5ff', padding: '2px 6px', borderRadius: '4px' }}>pnpm install</code></li>
              <li>Start the development servers with <code style={{ background: '#e9d5ff', padding: '2px 6px', borderRadius: '4px' }}>pnpm run dev</code></li>
              <li>Access the main app at <code style={{ background: '#e9d5ff', padding: '2px 6px', borderRadius: '4px' }}>localhost:3000</code></li>
              <li>Access this docs site at <code style={{ background: '#e9d5ff', padding: '2px 6px', borderRadius: '4px' }}>localhost:3001</code></li>
              <li>Start building your SaaS features! 🚀</li>
            </ol>
          </div>
        </div>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="/"
          >
            🌐 Go to Main App
          </a>
          <Button appName="docs" className={styles.secondary}>
            API Reference
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
