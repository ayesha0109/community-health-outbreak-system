import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { mockCountries } from '../data/mockData';
import { Country } from '../types';

const CountryAnalysis: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');

  const filteredCountries = mockCountries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = selectedRisk === 'all' || country.riskLevel === selectedRisk;
    return matchesSearch && matchesRisk;
  });

  const getRiskBadgeClass = (risk: string) => {
    switch (risk) {
      case 'low': return 'risk-badge-low';
      case 'moderate': return 'risk-badge-moderate';
      case 'high': return 'risk-badge-high';
      default: return 'risk-badge-low';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <TrendingDown className="w-4 h-4" />;
      case 'moderate': return <Minus className="w-4 h-4" />;
      case 'high': return <TrendingUp className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  const CountryCard: React.FC<{ country: Country }> = ({ country }) => (
    <div className="card hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{country.name}</h3>
          <p className="text-sm text-gray-500">Population: {country.population.toLocaleString()}</p>
        </div>
        <div className="flex items-center space-x-2">
          {getRiskIcon(country.riskLevel)}
          <span className={getRiskBadgeClass(country.riskLevel)}>
            {country.riskLevel.charAt(0).toUpperCase() + country.riskLevel.slice(1)} Risk
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Healthcare Index</p>
          <p className="text-lg font-semibold text-gray-900">{country.healthcareIndex}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Hospital Beds/1000</p>
          <p className="text-lg font-semibold text-gray-900">{country.hospitalBeds}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">ICU Capacity/100k</p>
          <p className="text-lg font-semibold text-gray-900">{country.icuCapacity}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Health Expenditure %</p>
          <p className="text-lg font-semibold text-gray-900">{country.healthExpenditure}%</p>
        </div>
      </div>

      {country.predictedCases && (
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Predicted Cases</p>
              <p className="text-lg font-semibold text-danger-600">
                {country.predictedCases.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Confidence</p>
              <p className="text-lg font-semibold text-gray-900">
                {((country.confidence || 0) * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="moderate">Moderate Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Country Analysis Results
        </h2>
        <p className="text-sm text-gray-600">
          Showing {filteredCountries.length} of {mockCountries.length} countries
        </p>
      </div>

      {/* Country Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCountries.map((country) => (
          <CountryCard key={country.code} country={country} />
        ))}
      </div>

      {filteredCountries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No countries match your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default CountryAnalysis;