import { Project, GitHubRepo } from '@/types';

// Sushant Kumar's Real Project Portfolio
export const projectsData: Project[] = [
  // Featured Projects - Major Achievements
  {
    id: 'ashraya-ngo-website',
    title: 'Ashraya - NGO Management Platform',
    description: 'Led student team in developing comprehensive digital infrastructure for Ashraya Charitable Society (serving 1000+ beneficiaries across 10 facilities in Kerala) as academic consultancy project. Delivered 8 major services: website development, payment gateway integration, SSL security, backend CMS, digital payment facility, DNS management, Google Business setup, and web hosting. Features secure admin panel with brute force protection, real-time notifications, and dynamic content management. Received official Letter of Appreciation from organization.',
    techStack: ['PHP', 'CodeIgniter', 'MySQL', 'Payment Gateway', 'SSL/HTTPS', 'Bootstrap', 'JavaScript', 'jQuery', 'cPanel', 'DNS'],
    category: 'Full Stack',
    liveUrl: 'https://ashraya.in',
    imageUrl: '/projects/ashraya.png',
    featured: true,
  },
  {
    id: 'neo-terminal-portfolio',
    title: 'Neo-Terminal Portfolio',
    description: 'A modern developer portfolio with terminal aesthetics, built with Next.js 14, TypeScript, and Tailwind CSS. Features dark/light mode toggle, interactive career timeline, skills visualization, and AWS infrastructure deployment with S3, CloudFront CDN, automated CI/CD pipelines. Integrated with GitHub API and Medium RSS feed for real-time content updates.',
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'AWS S3', 'CloudFront', 'Route 53', 'Lambda', 'GitHub Actions'],
    category: 'Full Stack',
    githubUrl: 'https://github.com/sushantkct/neo-terminal-portfolio',
    imageUrl: '/projects/neo-terminal.png',
    featured: true,
  },
  {
    id: 'malicious-url-detection',
    title: 'Malicious URL Detection using CNN',
    description: 'A deep learning security solution that detects malicious URLs using Character-level Convolutional Neural Networks. The model identifies XSS attacks, SQL injection attempts, and directory traversal payloads in URL parameters. Implemented using Python and Keras with comprehensive training on security threat datasets.',
    techStack: ['Python', 'Keras', 'TensorFlow', 'Deep Learning', 'CNN', 'Machine Learning'],
    category: 'Open Source',
    githubUrl: 'https://github.com/sushantkct/malicious-url-detection',
    featured: true,
  },

  // Learning & Academic Projects
  {
    id: 'html-css-js-editor',
    title: 'HTML/CSS/JS Code Editor',
    description: 'Small desktop application built with Electron.js as a 3rd year academic project. Features basic code editing and live preview for HTML, CSS, and JavaScript. Learning project exploring desktop application development with web technologies.',
    techStack: ['Electron.js', 'JavaScript', 'HTML', 'CSS', 'Node.js'],
    category: 'Open Source',
    featured: false,
  },

  // Professional Enterprise Projects
  {
    id: 'data-pipeline-kafka-s3',
    title: 'High-Volume Data Pipeline',
    description: 'Designed and implemented a robust data pipeline using Apache Kafka for streaming data ingestion into Amazon S3. Handles high-volume data efficiently with automated processing, partitioning strategies, and error handling. Optimized for scalability and reliability in production environments.',
    techStack: ['Apache Kafka', 'Amazon S3', 'Java', 'Spring Boot', 'AWS'],
    category: 'Backend',
  },
  {
    id: 'redis-cache-optimization',
    title: 'Redis Cache Performance System',
    description: 'Implemented advanced Redis caching layer that significantly improved API response times. Designed optimal cache policies, implemented cache-aside pattern, and configured TTL strategies for various data types. Achieved substantial performance improvements through intelligent caching strategies.',
    techStack: ['Redis', 'Java', 'Spring Boot', 'REST APIs'],
    category: 'Backend',
  },
  {
    id: 'database-integration-connectors',
    title: 'Multi-Database Integration System',
    description: 'Developed custom database connectors for seamless integration between Oracle and MariaDB systems. Implemented connection pooling, transaction management, and error handling for reliable data access. Enabled cross-database queries and data synchronization capabilities.',
    techStack: ['Oracle', 'MariaDB', 'Java', 'JDBC', 'Spring Boot'],
    category: 'Backend',
  },
  {
    id: 'apache-nifi-data-flows',
    title: 'Real-Time Data Processing with Apache NiFi',
    description: 'Designed and implemented Apache NiFi flows for real-time data processing and transformation. Handled high-volume streaming data efficiently with custom processors, routing logic, and data enrichment. Ensured data quality and reliability through comprehensive error handling and monitoring.',
    techStack: ['Apache NiFi', 'Java', 'Data Processing', 'ETL'],
    category: 'Backend',
  },
  {
    id: 'logging-abstraction-layer',
    title: 'Unified Logging Framework',
    description: 'Created a robust logging abstraction layer over Log4j to provide a unified logging interface across multiple libraries and services. Simplified logging operations, standardized log formats, and improved debuggability. Implemented centralized configuration and log level management.',
    techStack: ['Java', 'Log4j', 'Spring Boot'],
    category: 'Backend',
  },
  {
    id: 'cicd-jenkins-automation',
    title: 'Jenkins CI/CD Pipeline Automation',
    description: 'Streamlined development workflow by configuring Jenkins pipelines with pipeline-as-code approach. Implemented parallel job execution for automated builds, comprehensive testing, and deployments. Reduced deployment time and improved code quality through automated checks and validations.',
    techStack: ['Jenkins', 'Jenkinsfile', 'CI/CD', 'Docker', 'Kubernetes'],
    category: 'Backend',
  },
];

// GitHub API integration
export async function getGitHubPinnedRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Add your GitHub token for higher rate limits (optional)
        // 'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repos');
    }

    const repos: GitHubRepo[] = await response.json();
    return repos.filter(repo => !repo.fork); // Exclude forked repos
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export async function getGitHubRepoDetails(owner: string, repo: string): Promise<GitHubRepo | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch repo details');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching repo details:', error);
    return null;
  }
}

// Get all projects
export function getAllProjects(): Project[] {
  return projectsData;
}

// Get featured projects
export function getFeaturedProjects(): Project[] {
  return projectsData.filter(project => project.featured);
}

// Get project by ID
export function getProjectById(id: string): Project | undefined {
  return projectsData.find(project => project.id === id);
}

// Get all categories
export function getAllCategories(): string[] {
  const categories = new Set(projectsData.map(project => project.category));
  return Array.from(categories);
}

// Get projects by category
export function getProjectsByCategory(category: string): Project[] {
  return projectsData.filter(project => project.category === category);
}