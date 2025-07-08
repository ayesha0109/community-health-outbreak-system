import React, { useState } from 'react';
import { AlertTriangle, Clock, Users, TrendingUp, MapPin, Calendar, DollarSign, Zap } from 'lucide-react';
import { outbreakAlerts } from '../data/mockData';

export const OutbreakAlerts: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState(outbreakAlerts[0]);
  const [filterRisk, setFilterRisk] = useState<string>('all');

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-danger-50 border-danger-200 text-danger-800';
      case 'medium': return 'bg-warning-50 border-warning-200 text-warning-800';
      default: return 'bg-success-50 border-success-200 text-success-800';
    }
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-danger-100 text-danger-800';
      case 'medium': return 'bg-warning-100 text-warning-800';
      default: return 'bg-success-100 text-success-800';
    }
  };

  const getInterventionIcon = (type: string) => {
    switch (type) {
      case 'vaccination': return <Zap className="w-4 h-4" />;
      case 'screening': return <Users className="w-4 h-4" />;
      case 'education': return <TrendingUp className="w-4 h-4" />;
      case 'quarantine': return <MapPin className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filteredAlerts = filterRisk === 'all' 
    ? outbreakAlerts 
    : outbreakAlerts.filter(alert => alert.riskLevel === filterRisk);

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-danger-50 border-danger-200">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-danger-600" />
            <div>
              <p className="text-sm font-medium text-danger-600">High Risk Alerts</p>
              <p className="text-2xl font-bold text-danger-900">
                {outbreakAlerts.filter(a => a.riskLevel === 'high').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-warning-50 border-warning-200">
          <div className="flex items-center space-x-3">
            <Clock className="w-8 h-8 text-warning-600" />
            <div>
              <p className="text-sm font-medium text-warning-600">Medium Risk Alerts</p>
              <p className="text-2xl font-bold text-warning-900">
                {outbreakAlerts.filter(a => a.riskLevel === 'medium').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-primary-50 border-primary-200">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-primary-600" />
            <div>
              <p className="text-sm font-medium text-primary-600">Total Population at Risk</p>
              <p className="text-2xl font-bold text-primary-900">
                {outbreakAlerts.reduce((sum, alert) => sum + alert.affectedPopulation, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts List */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Risk Levels</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>

          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => setSelectedAlert(alert)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedAlert.id === alert.id
                    ? 'border-primary-300 bg-primary-50'
                    : `${getRiskColor(alert.riskLevel)} hover:shadow-md`
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{alert.disease}</h4>
                  <span className={`status-indicator ${getRiskBadgeColor(alert.riskLevel)}`}>
                    {alert.riskLevel}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{alert.location}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div>Confidence: {alert.confidence}%</div>
                  <div>Cases: {alert.predictedCases}</div>
                  <div>Population: {alert.affectedPopulation.toLocaleString()}</div>
                  <div>ETA: {alert.timeToOutbreak} days</div>
                </div>
                
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${
                      alert.riskLevel === 'high' ? 'bg-danger-500' :
                      alert.riskLevel === 'medium' ? 'bg-warning-500' : 'bg-success-500'
                    }`}
                    style={{ width: `${alert.confidence}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alert Details */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{selectedAlert.disease}</h3>
              <p className="text-gray-600">{selectedAlert.location}</p>
            </div>
            <span className={`status-indicator text-lg ${getRiskBadgeColor(selectedAlert.riskLevel)}`}>
              {selectedAlert.riskLevel.toUpperCase()} RISK
            </span>
          </div>

          {/* Alert Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Confidence</p>
              <p className="text-xl font-bold text-gray-900">{selectedAlert.confidence}%</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Predicted Cases</p>
              <p className="text-xl font-bold text-gray-900">{selectedAlert.predictedCases}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Time to Outbreak</p>
              <p className="text-xl font-bold text-gray-900">{selectedAlert.timeToOutbreak} days</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Population at Risk</p>
              <p className="text-xl font-bold text-gray-900">{selectedAlert.affectedPopulation.toLocaleString()}</p>
            </div>
          </div>

          {/* Recommended Interventions */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Recommended Interventions</h4>
            <div className="space-y-4">
              {selectedAlert.interventions.map((intervention) => (
                <div key={intervention.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getInterventionIcon(intervention.type)}
                      <h5 className="font-medium text-gray-900">{intervention.description}</h5>
                    </div>
                    <span className={`status-indicator ${
                      intervention.priority === 'high' ? 'bg-danger-100 text-danger-800' :
                      intervention.priority === 'medium' ? 'bg-warning-100 text-warning-800' :
                      'bg-success-100 text-success-800'
                    }`}>
                      {intervention.priority} priority
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>${intervention.estimatedCost.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{intervention.effectiveness}% effective</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{intervention.timeToImplement} days to implement</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-primary-500"
                      style={{ width: `${intervention.effectiveness}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Timeline */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-2">Alert Timeline</h5>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Created: {selectedAlert.createdAt.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};