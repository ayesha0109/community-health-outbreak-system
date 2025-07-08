import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { HealthMonitoring } from './components/HealthMonitoring';
import { OutbreakAlerts } from './components/OutbreakAlerts';
import { CommunityMap } from './components/CommunityMap';
import { AIModels } from './components/AIModels';
import { outbreakAlerts } from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'monitoring':
        return <HealthMonitoring />;
      case 'alerts':
        return <OutbreakAlerts />;
      case 'communities':
        return <CommunityMap />;
      case 'models':
        return <AIModels />;
      case 'settings':
        return (
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">System Settings</h2>
            <p className="text-gray-600">Configuration options and system preferences will be available here.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeAlerts={outbreakAlerts.length} />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;