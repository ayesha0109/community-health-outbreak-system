import React from 'react';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Users, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { healthIndicators, timeSeriesData, outbreakAlerts, communityData } from '../data/mockData';

export const Dashboard: React.FC = () => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-danger-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-success-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-danger-600 bg-danger-50';
      case 'medium': return 'text-warning-600 bg-warning-50';
      default: return 'text-success-600 bg-success-50';
    }
  };

  const riskDistribution = [
    { name: 'Low Risk', value: 60, color: '#22c55e' },
    { name: 'Medium Risk', value: 30, color: '#f59e0b' },
    { name: 'High Risk', value: 10, color: '#ef4444' }
  ];

  const highRiskAlerts = outbreakAlerts.filter(alert => alert.riskLevel === 'high').length;
  const totalPopulationAtRisk = outbreakAlerts.reduce((sum, alert) => sum + alert.affectedPopulation, 0);
  const averageConfidence = outbreakAlerts.reduce((sum, alert) => sum + alert.confidence, 0) / outbreakAlerts.length;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card fade-in">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Alerts</p>
              <p className="metric-value">{outbreakAlerts.length}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-danger-100 to-danger-200 rounded-full shadow-md">
              <AlertTriangle className="w-6 h-6 text-danger-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-danger-600 font-medium">{highRiskAlerts} high risk</span>
            <span className="text-gray-500 ml-2">alerts require immediate attention</span>
          </div>
        </div>

        <div className="metric-card fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Population at Risk</p>
              <p className="metric-value">{totalPopulationAtRisk.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-warning-100 to-warning-200 rounded-full shadow-md">
              <Users className="w-6 h-6 text-warning-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-warning-600 font-medium">3 communities</span>
            <span className="text-gray-500 ml-2">under monitoring</span>
          </div>
        </div>

        <div className="metric-card fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Prediction Confidence</p>
              <p className="metric-value">{averageConfidence.toFixed(0)}%</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full shadow-md">
              <Activity className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-success-600 font-medium">High accuracy</span>
            <span className="text-gray-500 ml-2">model performance</span>
          </div>
        </div>

        <div className="metric-card fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Status</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-success-600 to-success-700 bg-clip-text text-transparent">Operational</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-success-100 to-success-200 rounded-full shadow-md">
              <Activity className="w-6 h-6 text-success-600 animate-pulse" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-success-600 font-medium">All systems</span>
            <span className="text-gray-500 ml-2">functioning normally</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Indicators Trend */}
        <div className="chart-container slide-up">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Indicators Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                  formatter={(value, name) => [value, 'Cases']}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0ea5e9" 
                  strokeWidth={2}
                  dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="chart-container slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Risk Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Communities']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {riskDistribution.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Health Indicators */}
      <div className="card slide-up" style={{ animationDelay: '0.4s' }}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Health Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {healthIndicators.map((indicator) => (
            <div key={indicator.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{indicator.name}</h4>
                {getTrendIcon(indicator.trend)}
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">{indicator.value}</span>
                <span className="text-sm text-gray-500">{indicator.unit}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Threshold: {indicator.threshold} {indicator.unit}
                </span>
                <span className={`status-indicator ${getSeverityColor(indicator.severity)}`}>
                  {indicator.severity}
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    indicator.value > indicator.threshold ? 'progress-fill-danger' : 'progress-fill-success'
                  }`}
                  style={{ width: `${Math.min((indicator.value / indicator.threshold) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};