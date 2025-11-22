import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProjectsListClient from './ProjectsListClient';
import { getAllProjects, getAllCategories } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Portfolio of software development projects spanning from academic achievements to enterprise systems. Featuring full-stack applications, microservices architecture, and ML-based security solutions.',
  openGraph: {
    title: 'Projects | Sushant Kumar - Software Engineer',
    description: 'Portfolio of software development projects spanning from academic achievements to enterprise systems. Featuring full-stack applications, microservices architecture, and ML-based security solutions.',
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const categories = getAllCategories();
  
  // Calculate experience years
  const experienceYears = new Date().getFullYear() - 2021; // Started professional work in 2021
  const totalYears = new Date().getFullYear() - 2016; // Started coding in 2016

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-8" />

        {/* Page Header */}
        <div className="terminal-card mb-8 animate-fade-in">
          <div className="space-y-2">
            <p className="text-terminal-textMuted">
              <span className="terminal-prompt">¯</span> cd /projects
            </p>
            <div className="pl-4">
              <h1 className="text-4xl font-bold text-gradient mb-2">
                Projects
              </h1>
              <p className="text-terminal-textMuted">
                Building solutions, one commit at a time
                <span className="terminal-cursor"></span>
              </p>
              <p className="text-terminal-textMuted text-sm mt-2">
                {totalYears} years of coding journey • From first-year learning to enterprise systems
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="terminal-card text-center animate-slide-up">
            <div className="text-2xl font-bold text-terminal-cyan">
              {projects.length}
            </div>
            <div className="text-xs text-terminal-textMuted mt-1">
              Total Projects
            </div>
          </div>
          <div
            className="terminal-card text-center animate-slide-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="text-2xl font-bold text-terminal-green">
              {projects.filter((p) => p.featured).length}
            </div>
            <div className="text-xs text-terminal-textMuted mt-1">Featured</div>
          </div>
          <div
            className="terminal-card text-center animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="text-2xl font-bold text-terminal-command">
              {categories.length}
            </div>
            <div className="text-xs text-terminal-textMuted mt-1">Categories</div>
          </div>
          <div
            className="terminal-card text-center animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="text-2xl font-bold text-terminal-cyan">
              {new Set(projects.flatMap((p) => p.techStack)).size}
            </div>
            <div className="text-xs text-terminal-textMuted mt-1">
              Technologies
            </div>
          </div>
        </div>

        {/* Journey Highlight */}
        <div className="terminal-card mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="space-y-3">
            <h3 className="text-terminal-cyan font-semibold flex items-center gap-2">
              <span>🚀</span>
              Development Journey
            </h3>
            <div className="pl-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-terminal-green font-semibold">2016-2019: Foundation</p>
                <p className="text-terminal-textMuted">
                  Started with game development, explored desktop apps and machine learning
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-terminal-cyan font-semibold">2019-2020: Achievement</p>
                <p className="text-terminal-textMuted">
                  Built production platform serving 1000+ users, received official recognition
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-terminal-command font-semibold">2021-Present: Professional</p>
                <p className="text-terminal-textMuted">
                  {experienceYears}+ years building enterprise systems with microservices architecture
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Projects List with Client-side Filtering */}
        <ProjectsListClient projects={projects} categories={categories} />

        {/* Technology Stack Summary */}
        <div className="terminal-card bg-terminal-bg mt-8 animate-fade-in">
          <div className="space-y-3">
            <h3 className="text-terminal-cyan font-semibold flex items-center gap-2">
              <span>🛠️</span>
              Technology Stack
            </h3>
            <div className="pl-6 space-y-3 text-sm">
              <div>
                <p className="text-terminal-textMuted mb-2">Backend & Infrastructure</p>
                <div className="flex flex-wrap gap-2">
                  {['Java', 'Spring Boot', 'PHP', 'Python', 'Node.js', 'Apache Kafka', 'Redis', 'Oracle', 'MySQL', 'MariaDB'].map(tech => (
                    <span key={tech} className="px-2 py-1 bg-terminal-bg border border-terminal-border rounded text-terminal-text text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-terminal-textMuted mb-2">Frontend & Full-Stack</p>
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'Electron.js'].map(tech => (
                    <span key={tech} className="px-2 py-1 bg-terminal-bg border border-terminal-border rounded text-terminal-text text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-terminal-textMuted mb-2">Cloud & DevOps</p>
                <div className="flex flex-wrap gap-2">
                  {['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Apache NiFi'].map(tech => (
                    <span key={tech} className="px-2 py-1 bg-terminal-bg border border-terminal-border rounded text-terminal-text text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GitHub Integration Note */}
        <div className="terminal-card bg-terminal-bg mt-8 animate-fade-in">
          <div className="space-y-2">
            <h3 className="text-terminal-cyan font-semibold flex items-center gap-2">
              <span>🔗</span>
              More Projects
            </h3>
            <div className="pl-6 space-y-2 text-sm text-terminal-textMuted">
              <p>
                Want to see more? Check out my{' '}
                <a
                  href="https://github.com/sushantkct"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-link"
                >
                  GitHub profile
                </a>{' '}
                for additional projects, code samples, and open-source contributions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-terminal-green">✓</span>
                  <span>278 LeetCode problems solved (1,501 rating)</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-terminal-green">✓</span>
                  <span>6-star HackerRank (5-star Java, Python)</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-terminal-green">✓</span>
                  <span>8+ verified certifications</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-terminal-green">✓</span>
                  <span>Active open-source contributor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}