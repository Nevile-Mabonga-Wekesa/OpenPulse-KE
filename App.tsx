import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import FeedMonitor from './components/FeedMonitor';
import MapVisualizer from './components/MapVisualizer';
import VerificationAssistant from './components/VerificationAssistant';
import CollaborationHub from './components/CollaborationHub';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'monitor':
        return <FeedMonitor />;
      case 'map':
        return <MapVisualizer />;
      case 'verify':
        return <VerificationAssistant />;
      case 'collaborate':
        return <CollaborationHub />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="max-w-7xl mx-auto h-full">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
