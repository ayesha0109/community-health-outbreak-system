import React, { useState } from 'react';
import { Activity, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { healthIndicators, timeSeriesData } from '../data/mockData';

export const HealthMonitoring: React.FC = () => {
  const [selectedIndicator, setSelectedIndicator] = useState(healthIndicators[0]);
  const [timeRange, setTimeRange] = useState('7d');

  const getStatusIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertCircle className="w-5 h-5 text-danger-500" />;
      case 'medium': return <Clock className="w-5 h-5 text-warning-500" />;
      default: return <CheckCircle className="w-5 h-5 text-success-500" />;
    }
  };

  const getStatusColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-danger-200 bg-danger-50';
      case 'medium': return 'border-warning-200 bg-warning-50';
      default: return 'border-success-200 bg-success-50';
    }
  };

  const generateTrendData = (indicator: any) => {
    return Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 86400000),
      value: Math.floor(Math.random() * 20) + indicator.value - 10,
      threshold: indicator.threshold
    }));
  };

  return (
    <div className="space-y-6">
      {/* Real-time Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Activity className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Data Sources</p>
              <p className="text-xl font-bold text-gray-900">12 Active</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Normal Indicators</p>
              <p className="text-xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <Clock className="w-6 h-6 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Watch List</p>
              <p className="text-xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-danger-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-danger-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Critical</p>
              <p className="text-xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Health Indicators List */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Health Indicators</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setTimeRange('24h')}
                className={`px-3 py-1 text-xs rounded-full ${
                  timeRange === '24h' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'
                }`}
              >
                24h
              </button>
              <button
                onClick={() => setTimeRange('7d')}
                className={`px-3 py-1 text-xs rounded-full ${
                  timeRange === '7d' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'
                }`}
              >
                7d
              </button>
              <button
                onClick={() => setTimeRange('30d')}
                className={`px-3 py-1 text-xs rounded-full ${
                  timeRange === '30d' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'
                }`}
              >
                30d
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            {healthIndicators.map((indicator) => (
              <div
                key={indicator.id}
                onClick={() => setSelectedIndicator(indicator)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedIndicator.id === indicator.id
                    ? 'border-primary-300 bg-primary-50'
                    : `${getStatusColor(indicator.severity)} hover:shadow-md`
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(indicator.severity)}
                    <h4 className="font-medium text-gray-900">{indicator.name}</h4>
                  </div>
                  <div className="flex items-center space-x-1">
                    {indicator.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-danger-500" />
                    ) : indicator.trend === 'down' ? (
                      <TrendingDown className="w-4 h-4 text-success-500" />
                    ) : (
                      <div className="w-4 h-4" />
                    )}
                  </div>
                </div>
                
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-lg font-bold text-gray-900">{indicator.value}</span>
                  <span className="text-sm text-gray-500">{indicator.unit}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Threshold: {indicator.threshold}</span>
                  <span>{indicator.lastUpdated.toLocaleTimeString()}</span>
                </div>
                
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      indicator.value > indicator.threshold ? 'bg-danger-500' : 'bg-success-500'
                    }`}
                    style={{ width: `${Math.min((indicator.value / (indicator.threshold * 1.5)) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Chart View */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedIndicator.name} - Detailed View
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary-500 rounded-full" />
                <span className="text-sm text-gray-600">Current Value</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-danger-500 rounded-full" />
                <span className="text-sm text-gray-600">Threshold</span>
              </div>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={generateTrendData(selectedIndicator)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                  formatter={(value, name) => [
                    value, 
                    name === 'value' ? selectedIndicator.unit : 'Threshold'
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0ea5e9"
                  fill="#0ea5e9"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="threshold"
                  stroke="#ef4444"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Current</p>
              <p className="text-lg font-bold text-gray-900">
                {selectedIndicator.value} {selectedIndicator.unit}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Threshold</p>
              <p className="text-lg font-bold text-danger-600">
                {selectedIndicator.threshold} {selectedIndicator.unit}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Status</p>
              <p className={`text-lg font-bold ${
                selectedIndicator.severity === 'high' ? 'text-danger-600' :
                selectedIndicator.severity === 'medium' ? 'text-warning-600' : 'text-success-600'
              }`}>
                {selectedIndicator.severity.toUpperCase()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Trend</p>
              <div className="flex items-center justify-center">
                {selectedIndicator.trend === 'up' ? (
                  <TrendingUp className="w-6 h-6 text-danger-500" />
                ) : selectedIndicator.trend === 'down' ? (
                  <TrendingDown className="w-6 h-6 text-success-500" />
                ) : (
                  <span className="text-lg font-bold text-gray-500">STABLE</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};