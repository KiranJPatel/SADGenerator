import React, { useState } from 'react';
import { FileText, Layers, Download, Eye, Settings } from 'lucide-react';
import SystemRequirementsForm from './components/SystemRequirementsForm';
import ArchitectureDocument from './components/ArchitectureDocument';
import DiagramView from './components/DiagramView';
import { SystemRequirements } from './types/SystemRequirements';

function App() {
  const [activeTab, setActiveTab] = useState<'input' | 'document' | 'diagram'>('input');
  const [systemRequirements, setSystemRequirements] = useState<SystemRequirements | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerateArchitecture = (requirements: SystemRequirements) => {
    setSystemRequirements(requirements);
    setIsGenerated(true);
    setActiveTab('document');
  };

  const tabs = [
    { id: 'input', label: 'System Requirements', icon: Settings },
    { id: 'document', label: 'Architecture Document', icon: FileText },
    { id: 'diagram', label: 'System Diagram', icon: Layers },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">ArchitectureGen</h1>
                <p className="text-sm text-slate-600">System Architecture Generator</p>
              </div>
            </div>
            
            {isGenerated && (
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isDisabled = !isGenerated && tab.id !== 'input';
              
              return (
                <button
                  key={tab.id}
                  onClick={() => !isDisabled && setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 transition-colors ${
                    isActive
                      ? 'border-blue-500 text-blue-600'
                      : isDisabled
                      ? 'border-transparent text-slate-400 cursor-not-allowed'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                  disabled={isDisabled}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'input' && (
          <SystemRequirementsForm onGenerate={handleGenerateArchitecture} />
        )}
        
        {activeTab === 'document' && systemRequirements && (
          <ArchitectureDocument requirements={systemRequirements} />
        )}
        
        {activeTab === 'diagram' && systemRequirements && (
          <DiagramView requirements={systemRequirements} />
        )}
      </main>
    </div>
  );
}

export default App;