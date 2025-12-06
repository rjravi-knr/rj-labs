import Image from 'next/image';
import { Command } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  image?: string;
}

export function AuthLayout({ children, image = '/auth-bg.png' }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Brand Section - 55% */}
      <div className="relative hidden w-full flex-col justify-between overflow-hidden bg-black p-10 text-white lg:flex lg:w-[55%]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt="Authentication Background"
            fill
            className="object-cover opacity-60"
            priority
          />
          {/* Overlay Gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-20 flex items-center text-lg font-medium tracking-tight">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md mr-3 border border-white/20">
            <Command className="h-6 w-6" />
          </div>
          RJ Studios
        </div>

        <div className="relative z-20">
          <blockquote className="space-y-6 max-w-lg">
            <p className="text-3xl font-semibold leading-tight tracking-tight text-white/90 drop-shadow-sm">
              "The speed at which we shipped this product was incredible. The UI
              library just works."
            </p>
            <footer className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 border border-white/10 flex items-center justify-center overflow-hidden">
                 {/* Avatar Placeholder or Image if available */}
                 <span className="text-xs font-bold">R</span>
              </div>
              <div>
                <div className="font-medium text-white">Ravi Kiran J</div>
                <div className="text-sm text-zinc-400">Director Engineer, RJ Studios</div>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Form Section - 45% */}
      <div className="flex w-full items-center justify-center lg:w-[45%] bg-background">
        <div className="mx-auto w-full max-w-[400px] p-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
           {children}
        </div>
      </div>
    </div>
  );
}
