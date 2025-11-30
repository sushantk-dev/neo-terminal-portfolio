'use client';

import { useState, useEffect } from 'react';

interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  followers: number;
  following: number;
  publicGists: number;
}

interface GitHubEvent {
  type: string;
  repo: string;
  created_at: string;
  payload?: any;
}

interface GitHubActivityProps {
  username: string;
  className?: string;
}

export default function GitHubActivity({ username, className = '' }: GitHubActivityProps) {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [recentEvents, setRecentEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user stats
        const userResponse = await fetch(`https://api.github.com/users/${username}`, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch GitHub user data');
        }

        const userData = await userResponse.json();

        // Fetch recent events
        const eventsResponse = await fetch(
          `https://api.github.com/users/${username}/events/public?per_page=10`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );

        if (!eventsResponse.ok) {
          throw new Error('Failed to fetch GitHub events');
        }

        const eventsData = await eventsResponse.json();

        // Calculate total stars from all repos
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );

        let totalStars = 0;
        let totalForks = 0;

        if (reposResponse.ok) {
          const repos = await reposResponse.json();
          totalStars = repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
          totalForks = repos.reduce((sum: number, repo: any) => sum + repo.forks_count, 0);
        }

        setStats({
          totalRepos: userData.public_repos,
          totalStars,
          totalForks,
          followers: userData.followers,
          following: userData.following,
          publicGists: userData.public_gists,
        });

        // Parse recent events
        const parsedEvents = eventsData.slice(0, 5).map((event: any) => ({
          type: event.type,
          repo: event.repo.name,
          created_at: event.created_at,
          payload: event.payload,
        }));

        setRecentEvents(parsedEvents);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load GitHub data');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  const getEventDescription = (event: GitHubEvent): string => {
    const repoName = event.repo.split('/')[1];
    
    switch (event.type) {
      case 'PushEvent':
        const commits = event.payload?.commits?.length;
        if (commits && commits > 0) {
          return `Pushed ${commits} commit${commits !== 1 ? 's' : ''} to ${repoName}`;
        }
        // If commit count is unavailable or 0, show generic message
        return `Pushed to ${repoName}`;
      case 'CreateEvent':
        return `Created ${event.payload?.ref_type} in ${repoName}`;
      case 'PullRequestEvent':
        return `${event.payload?.action} pull request in ${repoName}`;
      case 'IssuesEvent':
        return `${event.payload?.action} issue in ${repoName}`;
      case 'WatchEvent':
        return `Starred ${repoName}`;
      case 'ForkEvent':
        return `Forked ${repoName}`;
      default:
        return `Activity in ${repoName}`;
    }
  };

  const getEventIcon = (type: string): string => {
    switch (type) {
      case 'PushEvent':
        return '📤';
      case 'CreateEvent':
        return '✨';
      case 'PullRequestEvent':
        return '🔀';
      case 'IssuesEvent':
        return '◉';
      case 'WatchEvent':
        return '⭐';
      case 'ForkEvent':
        return '🍴';
      default:
        return '📌';
    }
  };

  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return `${Math.floor(seconds / 604800)}w ago`;
  };

  if (loading) {
    return (
      <div className={`terminal-card ${className}`}>
        <div className="space-y-4">
          <h3 className="text-terminal-cyan font-semibold flex items-center gap-2 text-base sm:text-lg">
            <span>💻</span>
            <span>GitHub Activity</span>
          </h3>
          <div className="animate-pulse space-y-3">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-terminal-bg border border-terminal-border rounded p-2 sm:p-3">
                  <div className="h-3 sm:h-4 bg-terminal-border rounded w-3/4 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`terminal-card ${className}`}>
        <div className="space-y-3">
          <h3 className="text-terminal-cyan font-semibold flex items-center gap-2 text-base sm:text-lg">
            <span>💻</span>
            <span>GitHub Activity</span>
          </h3>
          <div className="terminal-card bg-terminal-bg border-terminal-error">
            <div className="flex items-start gap-2">
              <span className="text-terminal-error flex-shrink-0">✕</span>
              <div className="min-w-0">
                <p className="text-terminal-error font-semibold mb-1 text-sm">
                  Unable to load GitHub data
                </p>
                <p className="text-terminal-textMuted text-xs break-words">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`terminal-card ${className}`}>
      <div className="space-y-4">
        {/* Header - Responsive layout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-terminal-cyan font-semibold flex items-center gap-2 text-base sm:text-lg">
            <span>💻</span>
            <span className="truncate">GitHub Activity</span>
          </h3>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-textMuted hover:text-terminal-cyan text-xs sm:text-sm transition-colors flex items-center gap-1 w-fit"
          >
            View Profile
            <span>↗</span>
          </a>
        </div>

        {/* Stats Grid - Responsive: 3 cols on all screens with adjusted padding */}
        {stats && (
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="terminal-card bg-terminal-bg text-center hover:border-terminal-cyan transition-colors p-2 sm:p-3">
              <div className="text-lg sm:text-xl font-bold text-terminal-cyan">{stats.totalRepos}</div>
              <div className="text-[10px] sm:text-xs text-terminal-textMuted mt-0.5 sm:mt-1">Repos</div>
            </div>
            <div className="terminal-card bg-terminal-bg text-center hover:border-terminal-cyan transition-colors p-2 sm:p-3">
              <div className="text-lg sm:text-xl font-bold text-terminal-green">{stats.totalStars}</div>
              <div className="text-[10px] sm:text-xs text-terminal-textMuted mt-0.5 sm:mt-1">Stars</div>
            </div>
            <div className="terminal-card bg-terminal-bg text-center hover:border-terminal-cyan transition-colors p-2 sm:p-3">
              <div className="text-lg sm:text-xl font-bold text-terminal-command">{stats.followers}</div>
              <div className="text-[10px] sm:text-xs text-terminal-textMuted mt-0.5 sm:mt-1">Followers</div>
            </div>
          </div>
        )}

        {/* Recent Activity - Responsive spacing and text sizes */}
        {recentEvents.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-terminal-text text-sm font-semibold flex items-center gap-2">
              <span className="text-terminal-prompt">›</span>
              <span>Recent Activity</span>
            </h4>
            <div className="space-y-2">
              {recentEvents.map((event, index) => (
                <div
                  key={index}
                  className="terminal-card bg-terminal-bg hover:border-terminal-cyan transition-colors group p-3 sm:p-4"
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className="text-base sm:text-lg flex-shrink-0 mt-0.5">{getEventIcon(event.type)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-terminal-text text-xs sm:text-sm line-clamp-2 group-hover:text-terminal-cyan transition-colors break-words">
                        {getEventDescription(event)}
                      </p>
                      <p className="text-terminal-textMuted text-[10px] sm:text-xs mt-1">
                        {getTimeAgo(event.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Terminal Output Style - Responsive text */}
        <div className="terminal-card bg-terminal-bg">
          <div className="font-mono text-[10px] sm:text-xs space-y-1">
            <p className="text-terminal-textMuted">
              <span className="text-terminal-prompt">¯</span> GitHub stats updated
            </p>
            <p className="text-terminal-green pl-3 sm:pl-4">
              ✓ Fetched user data and recent events
            </p>
            <p className="text-terminal-textMuted pl-3 sm:pl-4 truncate sm:overflow-visible">
              › Last sync: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}