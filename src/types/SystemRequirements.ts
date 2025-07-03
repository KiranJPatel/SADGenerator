export interface SystemRequirements {
  // Basic Information
  systemName: string;
  purpose: string;
  mainFeatures: string[];
  
  // Technical Constraints
  technicalConstraints: string[];
  preferences: string[];
  
  // Scale and Performance
  targetUsers: string;
  performanceRequirements: string[];
  
  // Technology Stack
  frontend: string;
  backend: string;
  database: string;
  infrastructure: string;
  
  // Security Requirements
  securityRequirements: string[];
  
  // Integration Requirements
  integrations: string[];
  
  // Additional Context
  additionalContext: string;
}