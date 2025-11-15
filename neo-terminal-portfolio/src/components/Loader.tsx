'use client';

import { useState, useEffect } from 'react';

interface LoaderProps {
  fullScreen?: boolean;
  message?: string;
  showProgress?: boolean;
  className?: string;
}

const loadingMessages = [
  'Initializing system...',
  'Loading components...',
  'Establishing connection...',
  'Compiling resources...',
  'Almost there...',
];

export default function Loader({
  fullScreen = false,
  message,
  showProgress = false,
  className = '',
}: LoaderProps) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle through loading messages
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 1500);

    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);

    // Simulate progress
    if (showProgress) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return prev;
          return prev + Math.random() * 15;
        });
      }, 300);

      return () => {
        clearInterval(messageInterval);
        clearInterval(dotsInterval);
        clearInterval(progressInterval);
      };
    }

    return () => {
      clearInterval(messageInterval);
      clearInterval(dotsInterval);
    };
  }, [showProgress]);

  const content = (
    <div className="terminal-card max-w-2xl mx-auto animate-fade-in">
      <div className="space-y-4">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 pb-4 border-b border-terminal-border">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-terminal-error"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-command"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-success"></div>
          </div>
          <span className="text-terminal-textMuted text-sm ml-2">sushant@dev:~</span>
        </div>

        {/* Loading Content */}
        <div className="space-y-4">
          <p className="text-terminal-textMuted">
            <span className="terminal-prompt">¯</span> ./load-application.sh
          </p>

          <div className="pl-4 space-y-4">
            {/* Spinner */}
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12">
                {/* Outer ring */}
                <div className="absolute inset-0 border-4 border-terminal-border rounded-full"></div>
                {/* Spinning ring */}
                <div className="absolute inset-0 border-4 border-transparent border-t-terminal-cyan border-r-terminal-green rounded-full animate-spin"></div>
                {/* Inner pulse */}
                <div className="absolute inset-2 bg-terminal-cyan/20 rounded-full animate-pulse"></div>
              </div>

              <div className="flex-1 space-y-2">
                <h2 className="text-xl font-bold text-gradient">
                  {message || loadingMessages[currentMessage]}
                  {dots}
                </h2>

                {/* Progress Bar */}
                {showProgress && (
                  <div className="space-y-1">
                    <div className="h-2 bg-terminal-bg rounded-full overflow-hidden border border-terminal-border">
                      <div
                        className="h-full bg-gradient-to-r from-terminal-cyan to-terminal-green transition-all duration-300 relative"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-terminal-textMuted">
                      <span>{Math.round(progress)}%</span>
                      <span>Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Loading Steps */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-terminal-green">
                <span className="w-2 h-2 bg-terminal-green rounded-full"></span>
                <span>✓ System initialized</span>
              </div>
              <div className="flex items-center gap-2 text-terminal-green">
                <span className="w-2 h-2 bg-terminal-green rounded-full"></span>
                <span>✓ Configuration loaded</span>
              </div>
              <div className="flex items-center gap-2 text-terminal-cyan">
                <span className="w-2 h-2 bg-terminal-cyan rounded-full animate-pulse"></span>
                <span>› {loadingMessages[currentMessage]}</span>
              </div>
              <div className="flex items-center gap-2 text-terminal-textMuted">
                <span className="w-2 h-2 bg-terminal-border rounded-full"></span>
                <span>Finalizing setup...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Command Prompt */}
        <div className="pt-4 border-t border-terminal-border">
          <p className="text-terminal-textMuted flex items-center">
            <span className="terminal-prompt">¯</span>
            <span className="ml-2 text-terminal-text">
              Please wait while we prepare everything
            </span>
            <span className="terminal-cursor"></span>
          </p>
        </div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${className}`}>
        {content}
      </div>
    );
  }

  return <div className={className}>{content}</div>;
}

// Simple inline spinner component
export function LoadingSpinner({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <div className="absolute inset-0 border border-terminal-border rounded-full"></div>
      <div className="absolute inset-0 border border-transparent border-t-terminal-cyan border-r-terminal-green rounded-full animate-spin"></div>
    </div>
  );
}

// Dots loader
export function LoadingDots({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className="w-2 h-2 bg-terminal-cyan rounded-full animate-pulse"></span>
      <span className="w-2 h-2 bg-terminal-cyan rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
      <span className="w-2 h-2 bg-terminal-cyan rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
    </div>
  );
}

// Text loading with typing effect
export function LoadingText({ text = 'Loading', className = '' }: { text?: string; className?: string }) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`text-terminal-text ${className}`}>
      {text}
      <span className="inline-block w-8 text-left">{dots}</span>
    </span>
  );
}