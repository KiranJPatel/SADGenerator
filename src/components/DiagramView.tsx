import React, { useEffect, useRef } from 'react';
import { Layers, Download, RefreshCw } from 'lucide-react';
import { SystemRequirements } from '../types/SystemRequirements';
import mermaid from 'mermaid';

interface DiagramViewProps {
  requirements: SystemRequirements;
}

const DiagramView: React.FC<DiagramViewProps> = ({ requirements }) => {
  const diagramRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [diagramId] = React.useState(() => `diagram-${Date.now()}`);

  const generateMermaidDiagram = () => {
    const frontend = requirements.frontend || 'Frontend';
    const backend = requirements.backend || 'Backend';
    const database = requirements.database || 'Database';
    const infrastructure = requirements.infrastructure || 'Infrastructure';

    return `
graph TB
    subgraph "Client Layer"
        A[User Interface<br/>${frontend}]
        B[Mobile App<br/>React Native/Flutter]
        C[Web App<br/>${frontend}]
    end
    
    subgraph "API Gateway"
        D[Load Balancer<br/>NGINX/HAProxy]
        E[API Gateway<br/>Kong/AWS API Gateway]
    end
    
    subgraph "Application Layer"
        F[Authentication Service<br/>Auth0/JWT]
        G[Business Logic<br/>${backend}]
        H[File Storage<br/>AWS S3/MinIO]
    end
    
    subgraph "Data Layer"
        I[Primary Database<br/>${database}]
        J[Cache Layer<br/>Redis/Memcached]
        K[Search Engine<br/>Elasticsearch]
    end
    
    subgraph "Infrastructure Layer"
        L[Container Orchestration<br/>Kubernetes/Docker Swarm]
        M[Monitoring<br/>Prometheus/Grafana]
        N[Message Queue<br/>RabbitMQ/Apache Kafka]
    end
    
    subgraph "External Services"
        O[Payment Gateway<br/>Stripe/PayPal]
        P[Email Service<br/>SendGrid/SES]
        Q[CDN<br/>CloudFront/Cloudflare]
    end
    
    A --> D
    B --> D
    C --> D
    D --> E
    E --> F
    E --> G
    G --> I
    G --> J
    G --> K
    G --> H
    G --> N
    F --> I
    L --> G
    L --> I
    L --> J
    M --> L
    G --> O
    G --> P
    Q --> C
    Q --> B
    
    classDef frontend fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef backend fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef database fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef infrastructure fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef external fill:#fce4ec,stroke:#880e4f,stroke-width:2px
    
    class A,B,C frontend
    class D,E,F,G,H backend
    class I,J,K database
    class L,M,N infrastructure
    class O,P,Q external
    `;
  };

  useEffect(() => {
    const renderDiagram = async () => {
      if (!diagramRef.current) return;

      try {
        setIsLoading(true);
        
        // Initialize mermaid
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          themeVariables: {
            primaryColor: '#3b82f6',
            primaryTextColor: '#1e293b',
            primaryBorderColor: '#1e40af',
            lineColor: '#64748b',
            secondaryColor: '#f1f5f9',
            tertiaryColor: '#e2e8f0'
          }
        });

        const diagramDefinition = generateMermaidDiagram();
        const { svg } = await mermaid.render(diagramId, diagramDefinition);
        
        if (diagramRef.current) {
          diagramRef.current.innerHTML = svg;
        }
      } catch (error) {
        console.error('Error rendering diagram:', error);
        if (diagramRef.current) {
          diagramRef.current.innerHTML = '<div class="text-red-500">Error rendering diagram</div>';
        }
      } finally {
        setIsLoading(false);
      }
    };

    renderDiagram();
  }, [requirements, diagramId]);

  const downloadDiagram = () => {
    const svg = diagramRef.current?.querySelector('svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${requirements.systemName.replace(/\s+/g, '_')}_Architecture_Diagram.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const refreshDiagram = () => {
    setIsLoading(true);
    // Force re-render by changing the component state
    setTimeout(() => {
      if (diagramRef.current) {
        const diagramDefinition = generateMermaidDiagram();
        mermaid.render(diagramId + '-refresh', diagramDefinition)
          .then(({ svg }) => {
            if (diagramRef.current) {
              diagramRef.current.innerHTML = svg;
            }
          })
          .catch(console.error)
          .finally(() => setIsLoading(false));
      }
    }, 100);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Layers className="h-6 w-6 text-white" />
              <div>
                <h2 className="text-xl font-bold text-white">System Architecture Diagram</h2>
                <p className="text-purple-100">{requirements.systemName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={refreshDiagram}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
              <button
                onClick={downloadDiagram}
                className="flex items-center space-x-2 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="flex items-center space-x-3">
                <RefreshCw className="h-6 w-6 animate-spin text-purple-600" />
                <span className="text-slate-600">Generating diagram...</span>
              </div>
            </div>
          ) : (
            <div 
              ref={diagramRef} 
              className="flex justify-center items-center min-h-96 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg border border-slate-200 p-6 overflow-auto"
            />
          )}
        </div>

        <div className="px-6 pb-6">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Architecture Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-slate-700 mb-1">Frontend Layer</h4>
                <p className="text-slate-600">{requirements.frontend || 'Modern web framework'}</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-700 mb-1">Backend Layer</h4>
                <p className="text-slate-600">{requirements.backend || 'Server-side framework'}</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-700 mb-1">Database Layer</h4>
                <p className="text-slate-600">{requirements.database || 'Database system'}</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-700 mb-1">Infrastructure</h4>
                <p className="text-slate-600">{requirements.infrastructure || 'Cloud infrastructure'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagramView;