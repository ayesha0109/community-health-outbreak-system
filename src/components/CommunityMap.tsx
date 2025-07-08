import React, { useState } from 'react';
import { MapPin, Users, TrendingUp, AlertTriangle, Activity, Search } from 'lucide-react';
import { communityData } from '../data/mockData';

export const CommunityMap: React.FC = () => {
  const [selectedCommunity, setSelectedCommunity] = useState(communityData[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const getRiskColor = (riskScore: number) => {
    if (riskScore >= 70) return 'bg-red-500';
    if (riskScore >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getRiskLevel = (riskScore: number) => {
    if (riskScore >= 70) return 'High Risk';
    if (riskScore >= 50) return 'Medium Risk';
    return 'Low Risk';
  };

  const getRiskBadgeColor = (riskScore: number) => {
    if (riskScore >= 70) return 'bg-red-100 text-red-800';
    if (riskScore >= 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const filteredCommunities = communityData.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Map Overview */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Risk Map</h3>
        <div className="relative bg-gray-100 rounded-lg h-96 overflow-hidden">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                <path d="M50,50 Q200,20 350,80 Q380,150 320,250 Q200,280 80,220 Q20,150 50,50 Z" 
                      fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2"/>
                <path d="M100,100 Q180,80 280,120 Q300,180 250,220 Q180,240 120,200 Q80,160 100,100 Z" 
                      fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1"/>
              </svg>
            </div>
          </div>

          {/* Community Markers */}
          {communityData.map((community, index) => (
            <div
              key={community.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${30 + index * 25}%`,
                top: `${40 + index * 15}%`
              }}
              onClick={() => setSelectedCommunity(community)}
            >
              <div className="relative">
                <div className={`w-6 h-6 rounded-full ${getRiskColor(community.riskScore)} 
                  ${selectedCommunity.id === community.id ? 'ring-4 ring-primary-300' : ''} 
                  animate-pulse-slow`} />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                  bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap
                  opacity-0 hover:opacity-100 transition-opacity duration-200">
                  {community.name}
                </div>
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Risk Levels</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-xs text-gray-600">Low Risk (0-49)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="text-xs text-gray-600">Medium Risk (50-69)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-xs text-gray-600">High Risk (70+)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Community List */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Communities</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search communities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredCommunities.map((community) => (
              <div
                key={community.id}
                onClick={() => setSelectedCommunity(community)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedCommunity.id === community.id
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{community.name}</h4>
                  <span className={`status-indicator ${getRiskBadgeColor(community.riskScore)}`}>
                    {getRiskLevel(community.riskScore)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{community.population.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Activity className="w-4 h-4" />
                    <span>Score: {community.riskScore}</span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  Last assessed: {community.lastAssessment.toLocaleDateString()}
                </div>
                
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getRiskColor(community.riskScore)}`}
                    style={{ width: `${community.riskScore}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Details */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{selectedCommunity.name}</h3>
              <p className="text-gray-600">Population: {selectedCommunity.population.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <span className={`status-indicator text-lg ${getRiskBadgeColor(selectedCommunity.riskScore)}`}>
                {getRiskLevel(selectedCommunity.riskScore)}
              </span>
              <p className="text-sm text-gray-500 mt-1">Risk Score: {selectedCommunity.riskScore}/100</p>
            </div>
          </div>

          {/* Risk Score Visualization */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Risk Assessment</span>
              <span className="text-sm text-gray-500">{selectedCommunity.riskScore}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className={`h-4 rounded-full transition-all duration-500 ${getRiskColor(selectedCommunity.riskScore)}`}
                style={{ width: `${selectedCommunity.riskScore}%` }}
              />
            </div>
          </div>

          {/* Health Indicators */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Health Indicators</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedCommunity.healthIndicators.map((indicator) => (
                <div key={indicator.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-900">{indicator.name}</h5>
                    <div className="flex items-center space-x-1">
                      {indicator.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-danger-500" />
                      ) : indicator.trend === 'down' ? (
                        <TrendingUp className="w-4 h-4 text-success-500 transform rotate-180" />
                      ) : (
                        <div className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-baseline space-x-2 mb-2">
                    <span className="text-xl font-bold text-gray-900">{indicator.value}</span>
                    <span className="text-sm text-gray-500">{indicator.unit}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Threshold: {indicator.threshold}</span>
                    <span className={`status-indicator ${
                      indicator.severity === 'high' ? 'bg-danger-100 text-danger-800' :
                      indicator.severity === 'medium' ? 'bg-warning-100 text-warning-800' :
                      'bg-success-100 text-success-800'
                    }`}>
                      {indicator.severity}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        indicator.value > indicator.threshold ? 'bg-danger-500' : 'bg-success-500'
                      }`}
                      style={{ width: `${Math.min((indicator.value / (indicator.threshold * 1.5)) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium text-gray-900">Last Assessment</h5>
                <p className="text-sm text-gray-600">{selectedCommunity.lastAssessment.toLocaleString()}</p>
              </div>
              <button className="btn-primary">
                Update Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};