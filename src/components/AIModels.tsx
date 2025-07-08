import React, { useState } from 'react';
import { Brain, TrendingUp, Target, Zap, Activity, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line } from 'recharts';
import { modelMetrics, outbreakPatterns } from '../data/mockData';

export const AIModels: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState('time-series');

  const models = [
    {
      id: 'time-series',
      name: 'Time Series Forecasting',
      type: 'LSTM + ARIMA + Prophet',
      description: 'Predicts outbreak trends using historical health data patterns',
      accuracy: 89,
      status: 'active',
      lastTrained: new Date(Date.now() - 86400000 * 2),
      icon: TrendingUp
    },
    {
      id: 'classification',
      name: 'Risk Classification',
      type: 'Random Forest + Neural Network',
      description: 'Classifies communities into risk categories based on health indicators',
      accuracy: 85,
      status: 'active',
      lastTrained: new Date(Date.now() - 86400000 * 1),
      icon: Target
    },
    {
      id: 'clustering',
      name: 'Outbreak Pattern Detection',
      type: 'K-Means + DBSCAN',
      description: 'Identifies similar outbreak patterns and seasonal trends',
      accuracy: 78,
      status: 'training',
      lastTrained: new Date(Date.now() - 86400000 * 3),
      icon: BarChart3
    },
    {
      id: 'alert-optimization',
      name: 'Alert Threshold Optimization',
      type: 'Reinforcement Learning',
      description: 'Optimizes alert thresholds to balance false positives and negatives',
      accuracy: 92,
      status: 'active',
      lastTrained: new Date(Date.now() - 86400000 * 1),
      icon: Zap
    }
  ];

  const performanceData = [
    { metric: 'Accuracy', value: modelMetrics.accuracy * 100 },
    { metric: 'Precision', value: modelMetrics.precision * 100 },
    { metric: 'Recall', value: modelMetrics.recall * 100 },
    { metric: 'F1 Score', value: modelMetrics.f1Score * 100 }
  ];

  const radarData = [
    { subject: 'Accuracy', A: 89, B: 85, fullMark: 100 },
    { subject: 'Precision', A: 85, B: 88, fullMark: 100 },
    { subject: 'Recall', A: 92, B: 82, fullMark: 100 },
    { subject: 'F1 Score', A: 88, B: 85, fullMark: 100 },
    { subject: 'Speed', A: 78, B: 90, fullMark: 100 },
    { subject: 'Robustness', A: 85, B: 80, fullMark: 100 }
  ];

  const trainingHistory = Array.from({ length: 20 }, (_, i) => ({
    epoch: i + 1,
    loss: Math.max(0.1, 1 - (i * 0.04) + Math.random() * 0.1),
    accuracy: Math.min(0.95, 0.6 + (i * 0.015) + Math.random() * 0.05)
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success-100 text-success-800';
      case 'training': return 'bg-warning-100 text-warning-800';
      case 'error': return 'bg-danger-100 text-danger-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const selectedModelData = models.find(m => m.id === selectedModel);

  return (
    <div className="space-y-6">
      {/* Model Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {models.map((model) => {
          const Icon = model.icon;
          return (
            <div
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`card cursor-pointer transition-all duration-200 ${
                selectedModel === model.id
                  ? 'border-primary-300 bg-primary-50 shadow-md'
                  : 'hover:shadow-md hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{model.name}</h4>
                  <p className="text-sm text-gray-500">{model.type}</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{model.description}</p>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Accuracy</span>
                <span className="font-bold text-gray-900">{model.accuracy}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className="h-2 rounded-full bg-primary-500"
                  style={{ width: `${model.accuracy}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`status-indicator ${getStatusColor(model.status)}`}>
                  {model.status}
                </span>
                <span className="text-xs text-gray-500">
                  {model.lastTrained.toLocaleDateString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Performance Metrics */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {selectedModelData?.name} - Performance Metrics
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Score']} />
                <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Model Comparison */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Comparison</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Time Series"
                  dataKey="A"
                  stroke="#0ea5e9"
                  fill="#0ea5e9"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Radar
                  name="Classification"
                  dataKey="B"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Training History */}
        <div className="lg:col-span-2 card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Training History</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trainingHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="epoch" />
                <YAxis yAxisId="left" orientation="left" domain={[0, 1]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 1]} />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'loss' ? value.toFixed(3) : `${(value * 100).toFixed(1)}%`,
                    name === 'loss' ? 'Loss' : 'Accuracy'
                  ]}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="loss"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ fill: '#22c55e', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Model Configuration */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alert Threshold
              </label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="75"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Conservative</span>
                <span>Aggressive</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prediction Window
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                <option>7 days</option>
                <option>14 days</option>
                <option>30 days</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confidence Threshold
              </label>
              <input
                type="range"
                min="50"
                max="95"
                defaultValue="80"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>50%</span>
                <span>95%</span>
              </div>
            </div>

            <button className="w-full btn-primary">
              Update Configuration
            </button>
          </div>
        </div>
      </div>

      {/* Outbreak Patterns */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detected Outbreak Patterns</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {outbreakPatterns.map((pattern) => (
            <div key={pattern.id} className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">{pattern.disease}</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Seasonality:</span>
                  <span className="font-medium">{pattern.seasonality}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Duration:</span>
                  <span className="font-medium">{pattern.averageDuration} days</span>
                </div>
                <div className="flex justify-between">
                  <span>Transmission Rate:</span>
                  <span className="font-medium">{(pattern.transmissionRate * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Mortality Rate:</span>
                  <span className="font-medium">{(pattern.mortalityRate * 100).toFixed(3)}%</span>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {pattern.peakMonths.map((month) => (
                  <span key={month} className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded">
                    {new Date(2024, month - 1).toLocaleString('default', { month: 'short' })}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};