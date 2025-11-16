'use client';

import { socialLinks } from '@/lib/config';

const profiles = [
  {
    name: 'HackerRank',
    url: socialLinks.hackerrank,
    icon: '🏆',
    color: 'text-terminal-green',
    stats: [
      {
        label: 'Problem Solving',
        value: '⭐⭐⭐⭐⭐⭐',
        color: 'text-terminal-command'
      },
      {
        label: 'Certifications',
        value: '8+',
        color: 'text-terminal-green'
      }
    ],
    badges: ['Java', 'Python3', 'C++', 'SQL']
  },
  {
    name: 'LeetCode',
    url: socialLinks.leetcode,
    icon: '🎯',
    color: 'text-terminal-command',
    stats: [
      {
        label: 'Problems Solved',
        value: '270+',
        color: 'text-terminal-cyan'
      }
    ],
    badges: ['Java', 'Python3', 'Advanced']
  },
  {
    name: 'GitHub',
    url: socialLinks.github,
    icon: '💻',
    color: 'text-terminal-cyan',
    stats: [
      {
        label: 'Repositories',
        value: '15+',
        color: 'text-terminal-cyan'
      },
      {
        label: 'Contributions',
        value: 'Active',
        color: 'text-terminal-green'
      }
    ],
    badges: ['Java', 'JavaScript', 'Python3', 'TypeScript', 'React']
  },
];

export default function CodingProfiles() {
  return (
    <div className="space-y-6">
      {/* Main Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {profiles
          .filter((p) => p.url)
          .map((profile, index) => (
            <a
              key={profile.name}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-card bg-terminal-bg hover:border-terminal-cyan transition-all group hover:scale-[1.02]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{profile.icon}</span>
                    <div>
                      <h3
                        className={`font-semibold ${profile.color} group-hover:text-terminal-cyan transition-colors`}
                      >
                        {profile.name}
                      </h3>
                      <p className="text-xs text-terminal-textMuted">
                        Coding Platform
                      </p>
                    </div>
                  </div>
                  <span className="text-terminal-cyan opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </div>

                {/* Stats */}
                <div className="space-y-2">
                  {profile.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-2 border-b border-terminal-border last:border-0"
                    >
                      <span className="text-terminal-textMuted text-xs">
                        {stat.label}
                      </span>
                      <span className={`font-bold text-sm ${stat.color}`}>
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Badges */}
                {profile.badges.length > 0 && (
                  <div className="pt-2 border-t border-terminal-border">
                    <div className="flex flex-wrap gap-1">
                      {profile.badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-terminal-bg border border-terminal-border rounded text-terminal-cyan text-xs"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </a>
          ))}
      </div>

      {/* Combined Achievements Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* HackerRank Highlights */}
        <div className="terminal-card bg-terminal-bg">
          <div className="space-y-3">
            <h3 className="text-terminal-green font-semibold flex items-center gap-2">
              <span>🏆</span>
              HackerRank Achievements
            </h3>
            
            <div className="pl-4 space-y-3">
              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-2">
                <div className="terminal-card bg-terminal-bgLight text-center">
                  <div className="text-xl mb-1">⭐</div>
                  <div className="text-terminal-command font-bold text-sm">6-Star</div>
                  <div className="text-xs text-terminal-textMuted">Problem Solving</div>
                </div>
                
                <div className="terminal-card bg-terminal-bgLight text-center">
                  <div className="text-xl mb-1">📜</div>
                  <div className="text-terminal-green font-bold text-sm">8+</div>
                  <div className="text-xs text-terminal-textMuted">Certifications</div>
                </div>
              </div>

              {/* Certifications List */}
              <div className="pt-2 border-t border-terminal-border">
                <p className="text-terminal-cyan text-xs font-semibold mb-2">
                  Verified Certifications
                </p>
                <div className="space-y-1 text-xs">
                  {[
                    'Problem Solving (Intermediate)',
                    'Problem Solving (Basic)',
                    'Python (Basic)',
                    'Java (Basic)',
                    'C (Basic)',
                    'C (Intermediate)',
                    'React (Basic)',
                    'REST API (Intermediate)'
                  ].slice(0, 4).map((cert, idx) => (
                    <div key={idx} className="flex items-start gap-1 text-terminal-textMuted">
                      <span className="text-terminal-green">✓</span>
                      <span>{cert}</span>
                    </div>
                  ))}
                  <p className="text-terminal-cyan text-xs pt-1">+4 more...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LeetCode Highlights */}
        <div className="terminal-card bg-terminal-bg">
          <div className="space-y-3">
            <h3 className="text-terminal-command font-semibold flex items-center gap-2">
              <span>🎯</span>
              LeetCode Achievements
            </h3>
            
            <div className="pl-4 space-y-3">
              {/* Problem Breakdown */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-terminal-textMuted">Total Solved</span>
                  <span className="text-terminal-cyan font-bold">278 / 3,748</span>
                </div>
                
                <div className="space-y-1">
                  {/* Easy */}
                  <div className="flex items-center gap-2">
                    <span className="text-terminal-green text-xs w-12">Easy</span>
                    <div className="flex-1 h-2 bg-terminal-bg rounded-full overflow-hidden border border-terminal-border">
                      <div 
                        className="h-full bg-terminal-green"
                        style={{ width: `${(114/913 * 100).toFixed(1)}%` }}
                      ></div>
                    </div>
                    <span className="text-terminal-textMuted text-xs">114</span>
                  </div>
                  
                  {/* Medium */}
                  <div className="flex items-center gap-2">
                    <span className="text-terminal-command text-xs w-12">Medium</span>
                    <div className="flex-1 h-2 bg-terminal-bg rounded-full overflow-hidden border border-terminal-border">
                      <div 
                        className="h-full bg-terminal-command"
                        style={{ width: `${(149/1951 * 100).toFixed(1)}%` }}
                      ></div>
                    </div>
                    <span className="text-terminal-textMuted text-xs">149</span>
                  </div>
                  
                  {/* Hard */}
                  <div className="flex items-center gap-2">
                    <span className="text-terminal-error text-xs w-12">Hard</span>
                    <div className="flex-1 h-2 bg-terminal-bg rounded-full overflow-hidden border border-terminal-border">
                      <div 
                        className="h-full bg-terminal-error"
                        style={{ width: `${(15/884 * 100).toFixed(1)}%` }}
                      ></div>
                    </div>
                    <span className="text-terminal-textMuted text-xs">15</span>
                  </div>
                </div>
              </div>

              {/* Additional Stats */}
              <div className="pt-2 border-t border-terminal-border space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-terminal-textMuted">Languages</span>
                  <span className="text-terminal-text">Java, Python3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="terminal-card bg-terminal-bg">
        <div className="font-mono text-xs space-y-1">
          <p className="text-terminal-textMuted">
            <span className="text-terminal-prompt">¯</span> ./check-coding-stats.sh
          </p>
          <p className="text-terminal-green pl-4">
            ✓ HackerRank: 6-star Problem Solver | 8+ Certifications
          </p>
          <p className="text-terminal-cyan pl-4">
            ✓ LeetCode: 270+ problems solved
          </p>
          <p className="text-terminal-command pl-4">
            ✓ Languages: Java (192 LC), Python (112 LC), C++
          </p>
          <p className="text-terminal-textMuted pl-4">
            › Advanced skills in Dynamic Programming, Backtracking, Depth-First Search
          </p>
        </div>
      </div>
    </div>
  );
}