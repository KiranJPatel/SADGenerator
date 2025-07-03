import React from 'react';
import { FileText, Download, Copy, CheckCircle } from 'lucide-react';
import { SystemRequirements } from '../types/SystemRequirements';

interface ArchitectureDocumentProps {
  requirements: SystemRequirements;
}

const ArchitectureDocument: React.FC<ArchitectureDocumentProps> = ({ requirements }) => {
  const [copied, setCopied] = React.useState(false);

  const generateDocument = () => {
    const doc = `# ${requirements.systemName} - System Architecture Document

## Executive Summary

${requirements.purpose}

This document outlines the comprehensive architecture for ${requirements.systemName}, designed to support ${requirements.targetUsers} with high performance, security, and scalability requirements.

## System Overview

### Purpose
${requirements.purpose}

### Key Features
${requirements.mainFeatures.map(feature => `- ${feature}`).join('\n')}

### Target Scale
- **Users**: ${requirements.targetUsers}
- **Performance Requirements**: ${requirements.performanceRequirements.join(', ')}

## Component Breakdown

### Frontend Layer
**Technology**: ${requirements.frontend || 'Modern web framework'}
- User interface components
- Client-side routing and state management
- Responsive design for multiple devices
- Progressive web app capabilities

### Backend Layer
**Technology**: ${requirements.backend || 'Server-side framework'}
- REST/GraphQL API endpoints
- Business logic implementation
- Authentication and authorization
- Data validation and processing

### Database Layer
**Technology**: ${requirements.database || 'Relational/NoSQL database'}
- Primary data storage
- Caching layer for performance
- Database indexing strategy
- Backup and recovery mechanisms

### Infrastructure
**Technology**: ${requirements.infrastructure || 'Cloud infrastructure'}
- Container orchestration
- Load balancing
- Auto-scaling configuration
- Monitoring and logging

## Data Flow Description

1. **User Request**: Client applications send requests to the API gateway
2. **Authentication**: Request validation and user authentication
3. **Business Logic**: Backend services process the request
4. **Data Access**: Database operations for data retrieval/storage
5. **Response**: Formatted response returned to client

## Technology Stack Details

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | ${requirements.frontend || 'TBD'} | User interface |
| Backend | ${requirements.backend || 'TBD'} | API and business logic |
| Database | ${requirements.database || 'TBD'} | Data persistence |
| Infrastructure | ${requirements.infrastructure || 'TBD'} | Hosting and deployment |

## Security Considerations

${requirements.securityRequirements.length > 0 ? 
  requirements.securityRequirements.map(req => `- ${req}`).join('\n') : 
  `- Authentication and authorization mechanisms
- Data encryption at rest and in transit
- Input validation and sanitization
- Regular security audits and penetration testing
- Compliance with industry standards (GDPR, HIPAA, etc.)`
}

## Scalability Approach

### Horizontal Scaling
- Microservices architecture for independent scaling
- Load balancers to distribute traffic
- Database sharding and read replicas
- Content delivery network (CDN) for static assets

### Vertical Scaling
- Resource monitoring and auto-scaling
- Performance optimization at code level
- Database query optimization
- Caching strategies for frequently accessed data

## Integration Points

${requirements.integrations.length > 0 ? 
  requirements.integrations.map(integration => `- ${integration}`).join('\n') : 
  `- Third-party API integrations
- External service connections
- Data synchronization mechanisms
- Event-driven architecture for loose coupling`
}

## Deployment Strategy

### Containerization
- Docker containers for consistent deployment
- Kubernetes for orchestration
- CI/CD pipeline for automated deployment
- Blue-green deployment for zero-downtime updates

### Monitoring and Observability
- Application performance monitoring (APM)
- Centralized logging system
- Health checks and alerting
- Performance metrics and dashboards

## Performance Optimization Strategies

${requirements.performanceRequirements.length > 0 ? 
  requirements.performanceRequirements.map(req => `- Target: ${req}`).join('\n') : 
  `- Database connection pooling
- Caching at multiple layers
- Asynchronous processing for heavy operations
- Image and asset optimization`
}

## Backup and Disaster Recovery

- Automated daily backups
- Point-in-time recovery capabilities
- Multi-region deployment for high availability
- Disaster recovery testing procedures

## Technical Constraints

${requirements.technicalConstraints.length > 0 ? 
  requirements.technicalConstraints.map(constraint => `- ${constraint}`).join('\n') : 
  `- Budget considerations
- Legacy system compatibility
- Compliance requirements
- Performance limitations`
}

## Additional Context

${requirements.additionalContext || 'No additional context provided.'}

---

*This document was generated using ArchitectureGen - System Architecture Generator*
`;

    return doc;
  };

  const documentContent = generateDocument();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(documentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadDocument = () => {
    const blob = new Blob([documentContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${requirements.systemName.replace(/\s+/g, '_')}_Architecture.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-white" />
              <div>
                <h2 className="text-xl font-bold text-white">Architecture Document</h2>
                <p className="text-green-100">{requirements.systemName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button
                onClick={downloadDocument}
                className="flex items-center space-x-2 px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="prose prose-slate max-w-none">
            <pre className="whitespace-pre-wrap font-mono text-sm bg-slate-50 p-6 rounded-lg border border-slate-200 overflow-x-auto">
              {documentContent}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDocument;