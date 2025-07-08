import React from 'react';
import { Brain, Target, TrendingUp, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { modelMetrics } from '../data/mockData';

const ModelPerformance: React.FC = () => {
  const classificationModels = ['Random Forest', 'Neural Network', 'Decision Tree'];
  const timeSeriesModels = ['LSTM', 'ARIMA', 'Prophet'];

  const classificationData = classificationModels.map(model => ({
    name: model,
    accuracy: modelMetrics[model].accuracy * 100,
    precision: modelMetrics[model].precision * 100,
    recall: modelMetrics[model].recall * 100,
    f1Score: modelMetrics[model].f1Score * 100
  }));

  const timeSeriesData = timeSeriesModels.map(model => ({
    name: model,
    accuracy: modelMetrics[model].accuracy * 100,
    rmse: modelMetrics[model].rmse || 0,
    mae: modelMetrics[model].mae || 0
  }));

  const radarData = classificationModels.map(model => ({
    model,
    accuracy: modelMetrics[model].accuracy * 100,
    precision: modelMetrics[model].precision * 100,
    recall: modelMetrics[model].recall * 100,
    f1Score: modelMetrics[model].f1Score * 100
  }));

  const ModelCard: React.FC<{ 
    title: string; 
    icon: React.ReactNode; 
    metrics: any; 
    isTimeSeries?: boolean 
  }> = ({ title, icon, metrics, isTimeSeries = false }) => (
    <div className="card">
      <div className="flex items-center space-x-3 mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500">Accuracy</p>
          <p className="text-2xl font-bold text-primary-600">
            {(metrics.accuracy * 100).toFixed(1)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Precision</p>
          <p className="text-2xl font-bold text-success-600">
            {(metrics.precision * 100).toFixed(1)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Recall</p>
          <p className="text-2xl font-bold text-warning-600">
            {(metrics.recall * 100).toFixed(1)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">F1-Score</p>
          <p className="text-2xl font-bold text-danger-600">
            {(metrics.f1Score * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {isTimeSeries && metrics.rmse && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">RMSE</p>
              <p className="text-lg font-semibold text-gray-900">
                {metrics.rmse.toFixed(1)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">MAE</p>
              <p className="text-lg font-semibold text-gray-900">
                {metrics.mae.toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Model Overview */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Model Performance Analysis</h2>
        <p className="text-gray-600">
          Comprehensive evaluation of machine learning models used for disease outbreak prediction and risk classification.
        </p>
      </div>

      {/* Classification Models */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Classification Models</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {classificationModels.map((model) => (
            <ModelCard
              key={model}
              title={model}
              icon={<Brain className="w-6 h-6 text-primary-600" />}
              metrics={modelMetrics[model]}
            />
          ))}
        </div>

        {/* Classification Performance Chart */}
        <div className="card">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Classification Model Comparison
          </h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classificationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, '']} />
                <Bar dataKey="accuracy" fill="#3b82f6" name="Accuracy" />
                <Bar dataKey="precision" fill="#22c55e" name="Precision" />
                <Bar dataKey="recall" fill="#f59e0b" name="Recall" />
                <Bar dataKey="f1Score" fill="#ef4444" name="F1-Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Time Series Models */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Time Series Forecasting Models</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {timeSeriesModels.map((model) => (
            <ModelCard
              key={model}
              title={model}
              icon={<TrendingUp className="w-6 h-6 text-primary-600" />}
              metrics={modelMetrics[model]}
              isTimeSeries={true}
            />
          ))}
        </div>

        {/* Time Series Performance Chart */}
        <div className="card">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Time Series Model Error Metrics
          </h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="rmse" fill="#ef4444" name="RMSE" />
                <Bar dataKey="mae" fill="#f59e0b" name="MAE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Radar Chart for Model Comparison */}
      <div className="card">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Multi-dimensional Model Comparison
        </h4>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="model" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 10 }}
              />
              <Radar
                name="Accuracy"
                dataKey="accuracy"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.1}
              />
              <Radar
                name="Precision"
                dataKey="precision"
                stroke="#22c55e"
                fill="#22c55e"
                fillOpacity={0.1}
              />
              <Radar
                name="Recall"
                dataKey="recall"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.1}
              />
              <Radar
                name="F1-Score"
                dataKey="f1Score"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.1}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Model Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="w-6 h-6 text-success-600" />
            <h4 className="text-lg font-semibold text-gray-900">Best Performing Models</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Classification:</span>
              <span className="font-semibold text-success-600">Neural Network (92%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Time Series:</span>
              <span className="font-semibold text-success-600">LSTM (88%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Overall Best:</span>
              <span className="font-semibold text-primary-600">Neural Network</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="w-6 h-6 text-primary-600" />
            <h4 className="text-lg font-semibold text-gray-900">Model Recommendations</h4>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Neural Networks show superior performance for risk classification</p>
            <p>• LSTM models excel at capturing temporal patterns in outbreak data</p>
            <p>• Random Forest provides good interpretability with competitive accuracy</p>
            <p>• Prophet is recommended for long-term trend analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPerformance;