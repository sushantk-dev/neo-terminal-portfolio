'use client';

import { useState, useEffect } from 'react';

interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
  icon?: string;
}

const skillsData: Skill[] = [
  // Backend
  { name: 'Java', level: 95, category: 'Backend', icon: '☕' },
  { name: 'Spring Boot', level: 92, category: 'Backend', icon: '🍃' },
  { name: 'Angular', level: 90, category: 'Frontend', icon: '🅰️' },
  { name: 'React', level: 85, category: 'Frontend', icon: '⚛️' },
  { name: 'TypeScript', level: 90, category: 'Frontend', icon: '🔷' },
  { name: 'JavaScript', level: 88, category: 'Frontend', icon: '🟨' },
  { name: 'REST APIs', level: 93, category: 'Backend', icon: '🔌' },
  { name: 'Microservices', level: 88, category: 'Backend', icon: '🔧' },
  { name: 'Python', level: 75, category: 'Backend', icon: '🐍' },
  
  // Database
  { name: 'PostgreSQL', level: 90, category: 'Database', icon: '🐘' },
  { name: 'Oracle', level: 88, category: 'Database', icon: '🗄️' },
  { name: 'MongoDB', level: 85, category: 'Database', icon: '🍃' },
  { name: 'MariaDB', level: 87, category: 'Database', icon: '🐬' },
  { name: 'Cassandra', level: 80, category: 'Database', icon: '💾' },
  { name: 'Redis', level: 86, category: 'Database', icon: '⚡' },
  
  // DevOps & Tools
  { name: 'Docker', level: 90, category: 'DevOps', icon: '🐳' },
  { name: 'Kubernetes', level: 87, category: 'DevOps', icon: '☸️' },
  { name: 'Jenkins', level: 88, category: 'DevOps', icon: '🔄' },
  { name: 'Git', level: 95, category: 'DevOps', icon: '📦' },
  { name: 'Maven', level: 90, category: 'DevOps', icon: '📦' },
  { name: 'AWS S3', level: 85, category: 'DevOps', icon: '☁️' },
  
  // Messaging & Streaming
  { name: 'Apache Kafka', level: 88, category: 'Messaging', icon: '📨' },
  { name: 'Apache NiFi', level: 82, category: 'Messaging', icon: '🌊' }
];

const categories = ['All', 'Backend', 'Database', 'DevOps', 'Messaging', 'Frontend'];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [animatedLevels, setAnimatedLevels] = useState<{ [key: string]: number }>({});

  const filteredSkills = selectedCategory === 'All'
    ? skillsData
    : skillsData.filter(skill => skill.category === selectedCategory);

  // Animate progress bars
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    filteredSkills.forEach((skill, index) => {
      const timer = setTimeout(() => {
        setAnimatedLevels(prev => ({
          ...prev,
          [skill.name]: skill.level,
        }));
      }, index * 100);
      timers.push(timer);
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [selectedCategory]);

  const getLevelColor = (level: number) => {
    if (level >= 90) return 'bg-terminal-green';
    if (level >= 85) return 'bg-terminal-cyan';
    return 'bg-terminal-command';
  };

  const getLevelLabel = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 85) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`terminal-button text-sm ${
              selectedCategory === category ? 'border-terminal-cyan text-terminal-cyan' : ''
            }`}
          >
            <span className="text-terminal-prompt mr-1">›</span>
            {category}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSkills.map((skill, index) => (
          <div
            key={skill.name}
            className="terminal-card hover:border-terminal-cyan transition-all animate-slide-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="space-y-3">
              {/* Skill Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {skill.icon && <span className="text-lg">{skill.icon}</span>}
                  <h3 className="font-semibold text-terminal-text">{skill.name}</h3>
                </div>
                <span className="text-terminal-cyan text-sm font-mono">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="h-2 bg-terminal-bg rounded-full overflow-hidden border border-terminal-border">
                  <div
                    className={`h-full ${getLevelColor(skill.level)} transition-all duration-1000 ease-out relative`}
                    style={{ width: `${animatedLevels[skill.name] || 0}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                </div>
                
                {/* Level Label */}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-terminal-textMuted">{skill.category}</span>
                  <span className={`font-semibold ${
                    skill.level >= 90 ? 'text-terminal-green' :
                    skill.level >= 85 ? 'text-terminal-cyan' :
                    'text-terminal-command'
                  }`}>
                    {getLevelLabel(skill.level)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        <div className="terminal-card text-center">
          <div className="text-2xl font-bold text-terminal-cyan">{skillsData.length}</div>
          <div className="text-xs text-terminal-textMuted mt-1">Total Skills</div>
        </div>
        <div className="terminal-card text-center">
          <div className="text-2xl font-bold text-terminal-green">
            {skillsData.filter(s => s.level >= 90).length}
          </div>
          <div className="text-xs text-terminal-textMuted mt-1">Expert Level</div>
        </div>
        <div className="terminal-card text-center">
          <div className="text-2xl font-bold text-terminal-cyan">
            {Math.round(skillsData.reduce((acc, s) => acc + s.level, 0) / skillsData.length)}%
          </div>
          <div className="text-xs text-terminal-textMuted mt-1">Avg. Proficiency</div>
        </div>
        <div className="terminal-card text-center">
          <div className="text-2xl font-bold text-terminal-command">
            {new Set(skillsData.map(s => s.category)).size}
          </div>
          <div className="text-xs text-terminal-textMuted mt-1">Categories</div>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="terminal-card bg-terminal-bg">
        <div className="space-y-1 font-mono text-xs">
          <p className="text-terminal-textMuted">
            <span className="text-terminal-prompt">¯</span> analyzing skills...
          </p>
          <p className="text-terminal-green pl-4">
            ✓ {skillsData.filter(s => s.level >= 90).length} expert-level skills identified
          </p>
          <p className="text-terminal-cyan pl-4">
            ✓ {skillsData.filter(s => s.level >= 85 && s.level < 90).length} advanced skills mastered
          </p>
          <p className="text-terminal-text pl-4">
            ✓ Continuous learning in progress<span className="terminal-cursor"></span>
          </p>
        </div>
      </div>
    </div>
  );
}