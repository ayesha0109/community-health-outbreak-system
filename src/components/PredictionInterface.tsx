import React, { useState } from 'react';
import { Calculator, AlertCircle, CheckCircle, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { PredictionResult } from '../types';

const PredictionInterface: React.FC = () => {
  const [formData, setFormData] = useState({
    country: '',
    population: '',
    hospitalBeds: '',
    icuCapacity: '',
    healthExpenditure: '',
    gdpPerCapita: '',
    healthcareIndex: ''
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateRiskLevel = (data: typeof formData): PredictionResult => {
    // Simple risk calculation algorithm (in real app, this would call your ML model)
    const healthcareScore = parseFloat(data.healthcareIndex) || 0;
    const bedsScore = parseFloat(data.hospitalBeds) || 0;
    const icuScore = parseFloat(data.icuCapacity) || 0;
    const expenditureScore = parseFloat(data.healthExpenditure) || 0;
    const gdpScore = Math.min(parseFloat(data.gdpPerCapita) || 0, 100000) / 1000;

    const healthcareFactor = (healthcareScore + bedsScore * 10 + icuScore + expenditureScore * 5) / 4;
    const economicFactor = gdpScore;
    const demographicFactor = Math.max(0, 100 - (parseFloat(data.population) || 0) / 10000000);

    const overallScore = (healthcareFactor * 0.5 + economicFactor * 0.3 + demographicFactor * 0.2);

    let riskLevel: 'low' | 'moderate' | 'high';
    let confidence: number;
    let recommendations: string[];

    if (overallScore >= 70) {
      riskLevel = 'low';
      confidence = 0.85 + Math.random() * 0.1;
      recommendations = [
        'Maintain current healthcare infrastructure',
        'Continue monitoring and surveillance',
        'Prepare contingency plans for potential outbreaks'
      ];
    } else if (overallScore >= 40) {
      riskLevel = 'moderate';
      confidence = 0.75 + Math.random() * 0.15;
      recommendations = [
        'Strengthen healthcare capacity',
        'Improve early warning systems',
        'Enhance international cooperation',
        'Invest in medical equipment and supplies'
      ];
    } else {
      riskLevel = 'high';
      confidence = 0.70 + Math.random() * 0.2;
      recommendations = [
        'Urgent healthcare system reinforcement needed',
        'Implement strict monitoring protocols',
        'Seek international aid and support',
        'Focus on prevention and early intervention',
        'Develop emergency response protocols'
      ];
    }

    return {
      country: data.country,
      riskLevel,
      confidence,
      factors: {
        healthcare: healthcareFactor,
        economic: economicFactor,
        demographic: demographicFactor
      },
      recommendations
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const result = calculateRiskLevel(formData);
    setPrediction(result);
    setIsLoading(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-success-600';
      case 'moderate': return 'text-warning-600';
      case 'high': return 'text-danger-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskBgColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-success-50 border-success-200';
      case 'moderate': return 'bg-warning-50 border-warning-200';
      case 'high': return 'bg-danger-50 border-danger-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Disease Outbreak Risk Prediction</h2>
        <p className="text-gray-600">
          Enter country-specific data to predict disease outbreak risk using our trained machine learning models.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-6">
            <Calculator className="w-6 h-6 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">Country Data Input</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country Name
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter country name"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Users className="w-4 h-4 inline mr-1" />
                  Population (millions)
                </label>
                <input
                  type="number"
                  name="population"
                  value={formData.population}
                  onChange={handleInputChange}
                  required
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 67.9"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Activity className="w-4 h-4 inline mr-1" />
                  Healthcare Index (0-100)
                </label>
                <input
                  type="number"
                  name="healthcareIndex"
                  value={formData.healthcareIndex}
                  onChange={handleInputChange}
                  required
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 81.3"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hospital Beds per 1000
                </label>
                <input
                  type="number"
                  name="hospitalBeds"
                  value={formData.hospitalBeds}
                  onChange={handleInputChange}
                  required
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 2.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ICU Capacity per 100k
                </label>
                <input
                  type="number"
                  name="icuCapacity"
                  value={formData.icuCapacity}
                  onChange={handleInputChange}
                  required
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 6.6"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Health Expenditure (% GDP)
                </label>
                <input
                  type="number"
                  name="healthExpenditure"
                  value={formData.healthExpenditure}
                  onChange={handleInputChange}
                  required
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 10.9"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GDP per Capita (USD)
                </label>
                <input
                  type="number"
                  name="gdpPerCapita"
                  value={formData.gdpPerCapita}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 41030"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Analyzing...</span>
                </div>
              ) : (
                'Predict Risk Level'
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {prediction && (
            <>
              {/* Risk Level Result */}
              <div className={`card border-2 ${getRiskBgColor(prediction.riskLevel)}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Risk Assessment</h3>
                  {prediction.riskLevel === 'low' ? (
                    <CheckCircle className="w-6 h-6 text-success-600" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-danger-600" />
                  )}
                </div>

                <div className="text-center mb-4">
                  <h4 className="text-2xl font-bold mb-2">
                    <span className={getRiskColor(prediction.riskLevel)}>
                      {prediction.country}
                    </span>
                  </h4>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold ${
                    prediction.riskLevel === 'low' ? 'bg-success-100 text-success-800' :
                    prediction.riskLevel === 'moderate' ? 'bg-warning-100 text-warning-800' :
                    'bg-danger-100 text-danger-800'
                  }`}>
                    {prediction.riskLevel.charAt(0).toUpperCase() + prediction.riskLevel.slice(1)} Risk
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Prediction Confidence</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {(prediction.confidence * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Factor Analysis */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Factors Analysis</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">Healthcare Infrastructure</span>
                      <span className="text-sm text-gray-600">{prediction.factors.healthcare.toFixed(1)}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(prediction.factors.healthcare, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">Economic Factors</span>
                      <span className="text-sm text-gray-600">{prediction.factors.economic.toFixed(1)}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-success-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(prediction.factors.economic, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">Demographic Factors</span>
                      <span className="text-sm text-gray-600">{prediction.factors.demographic.toFixed(1)}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-warning-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(prediction.factors.demographic, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-primary-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Recommendations</h3>
                </div>
                <ul className="space-y-2">
                  {prediction.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {!prediction && (
            <div className="card text-center py-12">
              <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Analyze</h3>
              <p className="text-gray-600">
                Fill in the country data form to get AI-powered risk predictions and recommendations.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionInterface;