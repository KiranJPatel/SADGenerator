import React, { useState } from 'react';
import { Plus, Trash2, FileText, Zap } from 'lucide-react';
import { SystemRequirements } from '../types/SystemRequirements';

interface SystemRequirementsFormProps {
  onGenerate: (requirements: SystemRequirements) => void;
}

const SystemRequirementsForm: React.FC<SystemRequirementsFormProps> = ({ onGenerate }) => {
  const [formData, setFormData] = useState<SystemRequirements>({
    systemName: '',
    purpose: '',
    mainFeatures: [''],
    technicalConstraints: [''],
    preferences: [''],
    targetUsers: '',
    performanceRequirements: [''],
    frontend: '',
    backend: '',
    database: '',
    infrastructure: '',
    securityRequirements: [''],
    integrations: [''],
    additionalContext: ''
  });

  const addArrayItem = (field: keyof SystemRequirements) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), '']
    }));
  };

  const removeArrayItem = (field: keyof SystemRequirements, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (field: keyof SystemRequirements, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) => i === index ? value : item)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty strings from arrays
    const cleanedData = {
      ...formData,
      mainFeatures: formData.mainFeatures.filter(f => f.trim()),
      technicalConstraints: formData.technicalConstraints.filter(c => c.trim()),
      preferences: formData.preferences.filter(p => p.trim()),
      performanceRequirements: formData.performanceRequirements.filter(r => r.trim()),
      securityRequirements: formData.securityRequirements.filter(s => s.trim()),
      integrations: formData.integrations.filter(i => i.trim())
    };
    
    onGenerate(cleanedData);
  };

  const ArrayInput: React.FC<{
    label: string;
    field: keyof SystemRequirements;
    placeholder: string;
  }> = ({ label, field, placeholder }) => (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      {(formData[field] as string[]).map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            value={item}
            onChange={(e) => updateArrayItem(field, index, e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => removeArrayItem(field, index)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addArrayItem(field)}
        className="flex items-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span>Add {label.toLowerCase()}</span>
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-white" />
            <h2 className="text-xl font-bold text-white">System Requirements</h2>
          </div>
          <p className="text-blue-100 mt-1">Define your system specifications to generate comprehensive architecture documentation</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information */}
          <section>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Basic Information</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">System Name</label>
                <input
                  type="text"
                  value={formData.systemName}
                  onChange={(e) => setFormData(prev => ({ ...prev, systemName: e.target.value }))}
                  placeholder="e.g., E-commerce Platform"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Target Users</label>
                <input
                  type="text"
                  value={formData.targetUsers}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetUsers: e.target.value }))}
                  placeholder="e.g., 10,000 concurrent users"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">System Purpose</label>
              <textarea
                value={formData.purpose}
                onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
                placeholder="Describe the main purpose and goals of your system..."
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </section>

          {/* Features and Requirements */}
          <section>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Features & Requirements</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ArrayInput
                label="Main Features"
                field="mainFeatures"
                placeholder="e.g., User authentication, Product catalog"
              />
              <ArrayInput
                label="Performance Requirements"
                field="performanceRequirements"
                placeholder="e.g., < 200ms response time, 99.9% uptime"
              />
            </div>
          </section>

          {/* Technology Stack */}
          <section>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Technology Stack</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Frontend</label>
                <input
                  type="text"
                  value={formData.frontend}
                  onChange={(e) => setFormData(prev => ({ ...prev, frontend: e.target.value }))}
                  placeholder="e.g., React, Vue.js, Angular"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Backend</label>
                <input
                  type="text"
                  value={formData.backend}
                  onChange={(e) => setFormData(prev => ({ ...prev, backend: e.target.value }))}
                  placeholder="e.g., Node.js, Python, Java"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Database</label>
                <input
                  type="text"
                  value={formData.database}
                  onChange={(e) => setFormData(prev => ({ ...prev, database: e.target.value }))}
                  placeholder="e.g., PostgreSQL, MongoDB, Redis"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Infrastructure</label>
                <input
                  type="text"
                  value={formData.infrastructure}
                  onChange={(e) => setFormData(prev => ({ ...prev, infrastructure: e.target.value }))}
                  placeholder="e.g., AWS, Docker, Kubernetes"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* Constraints and Security */}
          <section>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Constraints & Security</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ArrayInput
                label="Technical Constraints"
                field="technicalConstraints"
                placeholder="e.g., Must support legacy systems, Budget constraints"
              />
              <ArrayInput
                label="Security Requirements"
                field="securityRequirements"
                placeholder="e.g., GDPR compliance, OAuth 2.0, SSL/TLS"
              />
            </div>
          </section>

          {/* Integration and Additional Context */}
          <section>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Integration & Context</span>
            </h3>
            <div className="space-y-6">
              <ArrayInput
                label="External Integrations"
                field="integrations"
                placeholder="e.g., Payment gateway, Email service, CRM system"
              />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Additional Context</label>
                <textarea
                  value={formData.additionalContext}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalContext: e.target.value }))}
                  placeholder="Any additional requirements, constraints, or context..."
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-slate-200">
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Zap className="h-5 w-5" />
              <span>Generate Architecture</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SystemRequirementsForm;