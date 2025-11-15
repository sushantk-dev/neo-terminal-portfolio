'use client';

import { useState } from 'react';

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  technologies?: string[];
  type: 'work' | 'education' | 'project';
}

const timelineData: TimelineItem[] = [
  {
    id: '1',
    year: '2024',
    title: 'Software Engineer II',
    company: 'Equifax',
    description: 'Working on enterprise-scale applications in a hybrid environment at Trivandrum, Kerala. Leading development initiatives with focus on cloud-native technologies, containerization, and distributed systems.',
    technologies: ['Maven', 'Kubernetes', 'Docker', 'Java', 'Angular', 'TypeScript', 'Google Cloud Platform (GCP)', 'Jenkins', 'Spring'],
    type: 'work',
  },
  {
    id: '2',
    year: '2022',
    title: 'Software Engineer',
    company: 'SunTec Business Solutions',
    description: 'Developed and maintained scalable backend systems for financial services. Implemented RESTful APIs and worked with NoSQL databases. Enhanced system performance and reliability through optimized database queries and efficient API design.',
    technologies: ['Java', 'MongoDB', 'REST APIs', 'Maven', 'React.js', 'MariaDB', 'Spring Boot', 'Amazon S3', 'Oracle Database', 'Git', 'Redis', 'System Architecture', 'Apache Kafka'],
    type: 'work',
  },
  {
    id: '3',
    year: '2021',
    title: 'Associate Software Engineer',
    company: 'SunTec Business Solutions',
    description: 'Started professional journey building enterprise applications for the financial technology sector. Worked with relational databases and developed RESTful services. Gained expertise in backend development, database management, and software engineering best practices.',
    technologies: ['Java', 'Apache NiFi', 'Apache Kafka', 'REST APIs', 'MariaDB', 'Oracle Database', 'Cassandra', 'Maven', 'Docker', 'Jenkins'],
    type: 'work',
  },
  {
    id: '4',
    year: '2020',
    title: 'B.Tech in Computer Science',
    company: 'APJ Abdul Kalam Technological University',
    description: 'Graduated with Bachelor of Technology in Computer Science from UKF College of Engineering and Technology, Parippally, Kollam. Built strong foundation in software engineering, algorithms, data structures, and system design principles.',
    technologies: ['Data Structures', 'Algorithms', 'System Design', 'Software Engineering', 'DBMS', 'Computer Networks', 'Operating Systems'],
    type: 'education',
  },
];

export default function Timeline() {
  const [selectedType, setSelectedType] = useState<'all' | 'work' | 'education' | 'project'>('all');

  const filteredTimeline = selectedType === 'all' 
    ? timelineData 
    : timelineData.filter(item => item.type === selectedType);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'work':
        return '💼';
      case 'education':
        return '🎓';
      case 'project':
        return '🚀';
      default:
        return '📌';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work':
        return 'text-terminal-cyan';
      case 'education':
        return 'text-terminal-green';
      case 'project':
        return 'text-terminal-command';
      default:
        return 'text-terminal-text';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedType('all')}
          className={`terminal-button text-sm ${
            selectedType === 'all' ? 'border-terminal-cyan text-terminal-cyan' : ''
          }`}
        >
          <span className="text-terminal-prompt mr-1">›</span>
          All
        </button>
        <button
          onClick={() => setSelectedType('work')}
          className={`terminal-button text-sm ${
            selectedType === 'work' ? 'border-terminal-cyan text-terminal-cyan' : ''
          }`}
        >
          <span className="mr-1">💼</span>
          Work
        </button>
        <button
          onClick={() => setSelectedType('education')}
          className={`terminal-button text-sm ${
            selectedType === 'education' ? 'border-terminal-cyan text-terminal-cyan' : ''
          }`}
        >
          <span className="mr-1">🎓</span>
          Education
        </button>
      </div>

      {/* Timeline */}
      <div className="relative pl-8 space-y-8">
        {/* Vertical Line */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-terminal-border"></div>

        {filteredTimeline.map((item, index) => (
          <div
            key={item.id}
            className="relative animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Timeline Dot */}
            <div className="absolute left-[-2.15rem] top-2 w-4 h-4 rounded-full bg-terminal-bg border-2 border-terminal-cyan flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-terminal-cyan animate-pulse"></div>
            </div>

            {/* Content Card */}
            <div className="terminal-card hover:scale-[1.02] transition-transform">
              <div className="space-y-3">
                {/* Year Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-terminal-bg border border-terminal-border rounded text-terminal-cyan text-sm font-semibold">
                    <span>{getTypeIcon(item.type)}</span>
                    {item.year}
                  </span>
                </div>

                {/* Title & Company */}
                <div>
                  <h3 className={`text-xl font-bold ${getTypeColor(item.type)} mb-1`}>
                    {item.title}
                  </h3>
                  <p className="text-terminal-textMuted text-sm">
                    <span className="text-terminal-prompt mr-1">›</span>
                    {item.company}
                  </p>
                </div>

                {/* Description */}
                <p className="text-terminal-text text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Technologies */}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-terminal-bg border border-terminal-border rounded text-terminal-textMuted text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* End Marker */}
      <div className="relative pl-8">
        <div className="absolute left-[-2.15rem] top-0 w-4 h-4 rounded-full bg-terminal-bg border-2 border-terminal-green flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-terminal-green"></div>
        </div>
        <div className="text-terminal-green text-sm flex items-center gap-2">
          <span className="text-terminal-prompt">¯</span>
          <span>Journey continues...</span>
        </div>
      </div>
    </div>
  );
}