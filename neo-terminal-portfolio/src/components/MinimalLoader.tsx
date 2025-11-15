'use client';

import { useState, useEffect } from 'react';

interface MinimalLoaderProps {
  message?: string;
  variant?: 'spinner' | 'dots' | 'pulse' | 'terminal';
  className?: string;
}

export default function MinimalLoader({
  message = 'Loading',
  variant = 'spinner',
  className = '',
}: MinimalLoaderProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center bg-terminal-bg ${className}`}>
      <div className="text-center space-y-6 animate-fade-in">
        
        {/* Variant: Spinner */}
        {variant === 'spinner' && (
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 border-4 border-terminal-border rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-terminal-cyan border-r-terminal-green rounded-full animate-spin"></div>
          </div>
        )}

        {/* Variant: Dots */}
        {variant === 'dots' && (
          <div className="flex items-center justify-center gap-3">
            <div className="w-3 h-3 bg-terminal-cyan rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-terminal-green rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-terminal-cyan rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}

        {/* Variant: Pulse */}
        {variant === 'pulse' && (
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 bg-terminal-cyan/20 rounded-full animate-ping"></div>
            <div className="absolute inset-0 bg-terminal-cyan/40 rounded-full animate-pulse"></div>
            <div className="absolute inset-4 bg-terminal-cyan rounded-full"></div>
          </div>
        )}

        {/* Variant: Terminal */}
        {variant === 'terminal' && (
          <div className="font-mono text-terminal-cyan text-xl">
            <span className="terminal-prompt mr-2">¯</span>
            <span className="terminal-cursor"></span>
          </div>
        )}

        {/* Message */}
        <p className="text-terminal-text font-mono text-lg w-24 h-24 mx-auto">
          {message}
          <span className="inline-block w-8 text-left">{dots}</span>
        </p>
      </div>
    </div>
  );
}

// Ultra-minimal variant - just a spinner and text
export function UltraMinimalLoader({ message = 'Loading' }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-terminal-bg">
      <div className="text-center space-y-4 animate-fade-in">
        <div className="w-12 h-12 mx-auto border-3 border-terminal-border border-t-terminal-cyan rounded-full animate-spin"></div>
        <p className="text-terminal-textMuted font-mono text-sm">{message}</p>
      </div>
    </div>
  );
}

// Terminal-style minimal loader
// export function TerminalMinimalLoader({ message = 'Initializing' }: { message?: string }) {
//   const [dots, setDots] = useState('');

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
//     }, 400);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-terminal-bg">
//       <div className="terminal-card max-w-md mx-4 animate-fade-in">
//         <div className="space-y-3">
//           {/* Terminal dots */}
//           <div className="flex items-center gap-2 pb-3 border-b border-terminal-border">
//             <div className="w-3 h-3 rounded-full bg-terminal-error"></div>
//             <div className="w-3 h-3 rounded-full bg-terminal-command"></div>
//             <div className="w-3 h-3 rounded-full bg-terminal-success"></div>
//           </div>

//           {/* Loading message */}
//           <div className="font-mono space-y-2">
//             <p className="text-terminal-textMuted text-sm">
//               <span className="terminal-prompt">¯</span> {message}
//               <span className="inline-block w-6 text-left">{dots}</span>
//             </p>
//             <div className="flex items-center gap-2 pl-4">
//               <div className="w-2 h-2 bg-terminal-cyan rounded-full animate-pulse"></div>
//               <span className="text-terminal-cyan text-xs">Please wait</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// Terminal-style minimal loader - NOW WITH SIZE SUPPORT!
export function TerminalMinimalLoader({ 
  message = 'Initializing',
  size = 'lg'  // Default to large
}: { 
  message?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Size configurations
  const sizeConfig = {
    sm: {
      maxWidth: 'max-w-sm',      // 384px
      padding: 'p-4',
      spacing: 'space-y-2',
      dotSize: 'w-2 h-2',
      textSize: 'text-xs',
      messageSize: 'text-sm',
      gap: 'gap-1.5',
    },
    md: {
      maxWidth: 'max-w-md',      // 448px
      padding: 'p-5',
      spacing: 'space-y-3',
      dotSize: 'w-3 h-3',
      textSize: 'text-xs',
      messageSize: 'text-sm',
      gap: 'gap-2',
    },
    lg: {
      maxWidth: 'max-w-xl',      // 576px
      padding: 'p-6',
      spacing: 'space-y-4',
      dotSize: 'w-4 h-4',
      textSize: 'text-sm',
      messageSize: 'text-base',
      gap: 'gap-2.5',
    },
    xl: {
      maxWidth: 'max-w-3xl',     // 768px
      padding: 'p-8',
      spacing: 'space-y-5',
      dotSize: 'w-5 h-5',
      textSize: 'text-base',
      messageSize: 'text-lg',
      gap: 'gap-3',
    },
  };

  const config = sizeConfig[size];

  return (
    <div className="min-h-screen flex items-center justify-center bg-terminal-bg">
      <div className={`terminal-card ${config.maxWidth} ${config.padding} mx-4 animate-fade-in`}>
        <div className={config.spacing}>
          {/* Terminal dots */}
          <div className={`flex items-center ${config.gap} pb-3 border-b border-terminal-border`}>
            <div className={`${config.dotSize} rounded-full bg-terminal-error`}></div>
            <div className={`${config.dotSize} rounded-full bg-terminal-command`}></div>
            <div className={`${config.dotSize} rounded-full bg-terminal-success`}></div>
          </div>

          {/* Loading message */}
          <div className={`font-mono ${config.spacing}`}>
            <p className={`text-terminal-textMuted ${config.messageSize}`}>
              <span className="terminal-prompt">¯</span> {message}
              <span className="inline-block w-6 text-left">{dots}</span>
            </p>
            <div className={`flex items-center ${config.gap} pl-4`}>
              <div className={`${config.dotSize} bg-terminal-cyan rounded-full animate-pulse`}></div>
              <span className={`text-terminal-cyan ${config.textSize}`}>Please wait</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Centered spinner with glow effect
export function GlowLoader({ message = 'Loading' }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-terminal-bg">
      <div className="text-center space-y-6 animate-fade-in">
        {/* Glowing spinner */}
        <div className="relative w-20 h-20 mx-auto">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-terminal-cyan/30 rounded-full blur-xl animate-pulse"></div>
          {/* Outer ring */}
          <div className="absolute inset-2 border-2 border-terminal-border rounded-full"></div>
          {/* Spinning ring */}
          <div className="absolute inset-2 border-2 border-transparent border-t-terminal-cyan rounded-full animate-spin"></div>
        </div>

        {/* Message */}
        <p className="text-terminal-cyan font-mono text-sm tracking-wider">
          {message.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

// Minimalist progress bar loader
export function ProgressBarLoader({ message = 'Loading' }: { message?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 10;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-terminal-bg">
      <div className="w-full max-w-md mx-4 space-y-4 animate-fade-in">
        {/* Progress bar */}
        <div className="h-1 bg-terminal-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-terminal-cyan to-terminal-green transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>

        {/* Message */}
        <p className="text-terminal-textMuted font-mono text-sm text-center">
          {message}
        </p>
      </div>
    </div>
  );
}

// Pulsing dot loader
export function PulseDotsLoader({ message = 'Loading' }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-terminal-bg">
      <div className="text-center space-y-6 animate-fade-in">
        {/* Pulsing dots */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-terminal-cyan rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse" style={{ animationDelay: '0.15s' }}></div>
          <div className="w-2 h-2 bg-terminal-cyan rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse" style={{ animationDelay: '0.45s' }}></div>
          <div className="w-2 h-2 bg-terminal-cyan rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
        </div>

        {/* Message */}
        <p className="text-terminal-text font-mono text-sm">
          {message}
        </p>
      </div>
    </div>
  );
}