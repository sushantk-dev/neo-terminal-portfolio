'use client';

import { useState, useMemo } from 'react';
import { Project } from '@/types';
import ProjectCard from '@/components/ProjectCard';

interface ProjectsListClientProps {
  projects: Project[];
  categories: string[];
}

export default function ProjectsListClient({
  projects,
  categories,
}: ProjectsListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'category'>('name');

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.techStack.some((tech) => tech.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (project) => project.category === selectedCategory
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      } else {
        return a.category.localeCompare(b.category);
      }
    });

    return sorted;
  }, [projects, searchQuery, selectedCategory, sortBy]);

  // Organize projects by timeline
  const projectsByTimeline = useMemo(() => {
    const featured = filteredAndSortedProjects.filter((p) => p.featured);
    
    const professional = filteredAndSortedProjects.filter((p) => 
      p.category === 'Backend' && !p.featured
    );
    
    const academic = filteredAndSortedProjects.filter((p) => 
      (p.id === 'ashraya-ngo-website' || p.id === 'malicious-url-detection') && !p.featured
    );
    
    const learning = filteredAndSortedProjects.filter((p) => 
      (p.id === 'html-css-js-editor' || p.id === 'car-jump-game')
    );

    return { featured, professional, academic, learning };
  }, [filteredAndSortedProjects]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Backend':
        return '⚙️';
      case 'System Design':
        return '🗂️';
      case 'Open Source':
        return '🌟';
      case 'Full Stack':
        return '🚀';
      default:
        return '📦';
    }
  };

  return (
    <div className="space-y-8">
      {/* Filters & Search */}
      <div className="terminal-card space-y-4 animate-slide-up">
        {/* Search Bar */}
        <div className="space-y-2">
          <label
            htmlFor="search"
            className="text-terminal-cyan text-sm font-semibold flex items-center gap-2"
          >
            <span>🔍</span>
            Search Projects
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, description, or technology..."
              className="w-full px-4 py-3 bg-terminal-bg border border-terminal-border rounded text-terminal-text placeholder-terminal-textMuted focus:border-terminal-cyan focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-terminal-textMuted hover:text-terminal-cyan transition-colors"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <label className="text-terminal-cyan text-sm font-semibold flex items-center gap-2">
            <span>📁</span>
            Filter by Category
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`terminal-button text-sm ${
                selectedCategory === 'all'
                  ? 'border-terminal-cyan text-terminal-cyan'
                  : ''
              }`}
            >
              <span className="text-terminal-prompt mr-1">›</span>
              All ({projects.length})
            </button>
            {categories.map((category) => {
              const count = projects.filter(
                (p) => p.category === category
              ).length;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`terminal-button text-sm ${
                    selectedCategory === category
                      ? 'border-terminal-cyan text-terminal-cyan'
                      : ''
                  }`}
                >
                  <span className="mr-1">{getCategoryIcon(category)}</span>
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* View Mode & Sort Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* View Mode */}
          <div className="space-y-2">
            <label className="text-terminal-cyan text-sm font-semibold flex items-center gap-2">
              <span>👁️</span>
              View Mode
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`terminal-button text-sm flex-1 ${
                  viewMode === 'grid' ? 'border-terminal-cyan text-terminal-cyan' : ''
                }`}
              >
                📊 Grid View
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`terminal-button text-sm flex-1 ${
                  viewMode === 'timeline' ? 'border-terminal-cyan text-terminal-cyan' : ''
                }`}
              >
                📅 Timeline View
              </button>
            </div>
          </div>

          {/* Sort Options */}
          <div className="space-y-2">
            <label className="text-terminal-cyan text-sm font-semibold flex items-center gap-2">
              <span>📊</span>
              Sort By
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('name')}
                className={`terminal-button text-sm flex-1 ${
                  sortBy === 'name' ? 'border-terminal-cyan text-terminal-cyan' : ''
                }`}
              >
                🔤 Name
              </button>
              <button
                onClick={() => setSortBy('category')}
                className={`terminal-button text-sm flex-1 ${
                  sortBy === 'category'
                    ? 'border-terminal-cyan text-terminal-cyan'
                    : ''
                }`}
              >
                📁 Category
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="pt-4 border-t border-terminal-border text-terminal-textMuted text-sm">
          <span className="text-terminal-prompt">›</span> Showing{' '}
          <span className="text-terminal-cyan font-semibold">
            {filteredAndSortedProjects.length}
          </span>{' '}
          {filteredAndSortedProjects.length === 1 ? 'project' : 'projects'}
          {searchQuery && ` matching "${searchQuery}"`}
          {selectedCategory !== 'all' && ` in "${selectedCategory}"`}
        </div>
      </div>

      {/* No Results */}
      {filteredAndSortedProjects.length === 0 && (
        <div className="terminal-card text-center py-12 animate-fade-in">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-terminal-cyan mb-2">
            No Projects Found
          </h3>
          <p className="text-terminal-textMuted mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="terminal-button"
          >
            <span className="text-terminal-prompt mr-2">›</span>
            Clear Filters
          </button>
        </div>
      )}

      {/* Timeline View */}
      {viewMode === 'timeline' && filteredAndSortedProjects.length > 0 && (
        <div className="space-y-8">
          {/* Featured Projects */}
          {projectsByTimeline.featured.length > 0 && (
            <div className="space-y-4 animate-slide-up">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">⭐</span>
                  <h2 className="text-2xl font-bold text-terminal-cyan">Featured Projects</h2>
                </div>
                <div className="flex-1 h-px bg-terminal-border"></div>
              </div>
              <p className="text-terminal-textMuted text-sm pl-11">
                Major achievements and production applications
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-11">
                {projectsByTimeline.featured.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    featured 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Professional Work */}
          {projectsByTimeline.professional.length > 0 && (
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">💼</span>
                  <h2 className="text-2xl font-bold text-terminal-green">Professional Work</h2>
                </div>
                <div className="flex-1 h-px bg-terminal-border"></div>
              </div>
              <p className="text-terminal-textMuted text-sm pl-11">
                Enterprise systems at Suntec Business Solutions (2021-Present)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-11">
                {projectsByTimeline.professional.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}

          {/* Academic Projects */}
          {projectsByTimeline.academic.length > 0 && (
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🎓</span>
                  <h2 className="text-2xl font-bold text-terminal-command">Academic Projects</h2>
                </div>
                <div className="flex-1 h-px bg-terminal-border"></div>
              </div>
              <p className="text-terminal-textMuted text-sm pl-11">
                Final year projects and academic achievements (2019-2020)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-11">
                {projectsByTimeline.academic.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}

          {/* Learning Journey */}
          {projectsByTimeline.learning.length > 0 && (
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🌱</span>
                  <h2 className="text-2xl font-bold text-terminal-text">Learning Journey</h2>
                </div>
                <div className="flex-1 h-px bg-terminal-border"></div>
              </div>
              <p className="text-terminal-textMuted text-sm pl-11">
                Early projects and technology exploration (2016-2019)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-11">
                {projectsByTimeline.learning.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}

          {/* Timeline Indicator */}
          <div className="terminal-card bg-terminal-bg animate-fade-in">
            <div className="space-y-3">
              <h3 className="text-terminal-cyan font-semibold flex items-center gap-2">
                <span>📅</span>
                Project Timeline
              </h3>
              <div className="pl-6 space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-terminal-green">●</span>
                  <span className="text-terminal-textMuted">2021-Present:</span>
                  <span className="text-terminal-text">Professional Work ({projectsByTimeline.professional.length} projects)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-terminal-cyan">●</span>
                  <span className="text-terminal-textMuted">2019-2020:</span>
                  <span className="text-terminal-text">Academic Projects ({projectsByTimeline.featured.filter(p => p.id === 'ashraya-ngo-website').length + projectsByTimeline.academic.length} projects)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-terminal-command">●</span>
                  <span className="text-terminal-textMuted">2016-2019:</span>
                  <span className="text-terminal-text">Learning Journey ({projectsByTimeline.learning.length} projects)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid View (Original) */}
      {viewMode === 'grid' && filteredAndSortedProjects.length > 0 && (
        <>
          {/* Featured Projects */}
          {projectsByTimeline.featured.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-terminal-cyan flex items-center gap-2">
                <span>⭐</span>
                Featured Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsByTimeline.featured.map((project) => (
                  <ProjectCard key={project.id} project={project} featured />
                ))}
              </div>
            </div>
          )}

          {/* Regular Projects */}
          {(projectsByTimeline.professional.length > 0 || 
            projectsByTimeline.academic.length > 0 || 
            projectsByTimeline.learning.length > 0) && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-terminal-cyan flex items-center gap-2">
                <span>📦</span>
                {projectsByTimeline.featured.length > 0 ? 'All Projects' : 'Projects'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...projectsByTimeline.professional, ...projectsByTimeline.academic, ...projectsByTimeline.learning].map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}