'use client';

interface SkeletonLoaderProps {
  variant?: 'card' | 'list' | 'article' | 'project';
  count?: number;
  className?: string;
}

export default function SkeletonLoader({
  variant = 'card',
  count = 1,
  className = '',
}: SkeletonLoaderProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div className="terminal-card animate-pulse">
            <div className="space-y-4">
              <div className="h-4 bg-terminal-border rounded w-3/4"></div>
              <div className="h-3 bg-terminal-border rounded w-full"></div>
              <div className="h-3 bg-terminal-border rounded w-5/6"></div>
              <div className="flex gap-2 pt-2">
                <div className="h-6 bg-terminal-border rounded w-16"></div>
                <div className="h-6 bg-terminal-border rounded w-16"></div>
                <div className="h-6 bg-terminal-border rounded w-16"></div>
              </div>
            </div>
          </div>
        );

      case 'list':
        return (
          <div className="terminal-card animate-pulse">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-terminal-border rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-terminal-border rounded w-3/4"></div>
                    <div className="h-3 bg-terminal-border rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'article':
        return (
          <div className="terminal-card animate-pulse">
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="h-6 bg-terminal-border rounded w-16"></div>
                <div className="h-6 bg-terminal-border rounded w-20"></div>
              </div>
              <div className="h-6 bg-terminal-border rounded w-full"></div>
              <div className="h-4 bg-terminal-border rounded w-full"></div>
              <div className="h-4 bg-terminal-border rounded w-5/6"></div>
              <div className="flex gap-4 pt-2 border-t border-terminal-border">
                <div className="h-3 bg-terminal-border rounded w-24"></div>
                <div className="h-3 bg-terminal-border rounded w-20"></div>
              </div>
            </div>
          </div>
        );

      case 'project':
        return (
          <div className="terminal-card animate-pulse">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-6 bg-terminal-border rounded w-1/2"></div>
                <div className="w-8 h-8 bg-terminal-border rounded"></div>
              </div>
              <div className="h-6 bg-terminal-border rounded w-24"></div>
              <div className="space-y-2">
                <div className="h-3 bg-terminal-border rounded w-full"></div>
                <div className="h-3 bg-terminal-border rounded w-4/5"></div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-6 bg-terminal-border rounded w-16"></div>
                ))}
              </div>
              <div className="flex gap-3 pt-2 border-t border-terminal-border">
                <div className="h-8 bg-terminal-border rounded flex-1"></div>
                <div className="h-8 w-8 bg-terminal-border rounded"></div>
                <div className="h-8 w-8 bg-terminal-border rounded"></div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={index < count - 1 ? 'mb-6' : ''}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
}

// Terminal-style loading text
export function TerminalLoading({ className = '' }: { className?: string }) {
  return (
    <div className={`terminal-card bg-terminal-bg animate-pulse ${className}`}>
      <div className="font-mono text-xs space-y-1">
        <p className="text-terminal-textMuted">
          <span className="text-terminal-prompt">¯</span> Loading data...
        </p>
        <p className="text-terminal-cyan pl-4">› Fetching resources...</p>
        <p className="text-terminal-textMuted pl-4">
          › Please wait<span className="terminal-cursor"></span>
        </p>
      </div>
    </div>
  );
}

// Page loading skeleton
export function PageSkeleton() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="terminal-card animate-pulse">
          <div className="space-y-2">
            <div className="h-4 bg-terminal-border rounded w-48"></div>
            <div className="pl-4 space-y-2">
              <div className="h-8 bg-terminal-border rounded w-64"></div>
              <div className="h-4 bg-terminal-border rounded w-96"></div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonLoader variant="card" />
          <SkeletonLoader variant="card" />
          <SkeletonLoader variant="card" />
        </div>
      </div>
    </div>
  );
}