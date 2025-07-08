import { HealthIndicator, OutbreakAlert, CommunityData, Intervention, TimeSeriesData, ModelMetrics, OutbreakPattern } from '../types';

export const healthIndicators: HealthIndicator[] = [
  {
    id: '1',
    name: 'Respiratory Illness Reports',
    value: 45,
    threshold: 30,
    unit: 'cases/week',
    trend: 'up',
    lastUpdated: new Date(),
    severity: 'medium'
  },
  {
    id: '2',
    name: 'Hospital Admissions',
    value: 12,
    threshold: 20,
    unit: 'admissions/day',
    trend: 'stable',
    lastUpdated: new Date(),
    severity: 'low'
  },
  {
    id: '3',
    name: 'Pharmacy Sales (Fever Reducers)',
    value: 180,
    threshold: 150,
    unit: 'units/day',
    trend: 'up',
    lastUpdated: new Date(),
    severity: 'medium'
  },
  {
    id: '4',
    name: 'School Absenteeism',
    value: 8.5,
    threshold: 10,
    unit: 'percentage',
    trend: 'down',
    lastUpdated: new Date(),
    severity: 'low'
  },
  {
    id: '5',
    name: 'Emergency Room Visits',
    value: 85,
    threshold: 70,
    unit: 'visits/day',
    trend: 'up',
    lastUpdated: new Date(),
    severity: 'high'
  }
];

export const interventions: Intervention[] = [
  {
    id: '1',
    type: 'vaccination',
    description: 'Mass vaccination campaign in high-risk areas',
    priority: 'high',
    estimatedCost: 250000,
    effectiveness: 85,
    timeToImplement: 7
  },
  {
    id: '2',
    type: 'screening',
    description: 'Enhanced screening at community centers',
    priority: 'medium',
    estimatedCost: 50000,
    effectiveness: 70,
    timeToImplement: 3
  },
  {
    id: '3',
    type: 'education',
    description: 'Public health awareness campaign',
    priority: 'medium',
    estimatedCost: 25000,
    effectiveness: 60,
    timeToImplement: 2
  },
  {
    id: '4',
    type: 'quarantine',
    description: 'Targeted quarantine for affected areas',
    priority: 'high',
    estimatedCost: 100000,
    effectiveness: 90,
    timeToImplement: 1
  }
];

export const outbreakAlerts: OutbreakAlert[] = [
  {
    id: '1',
    disease: 'Influenza A',
    location: 'Downtown District',
    riskLevel: 'high',
    confidence: 87,
    predictedCases: 450,
    timeToOutbreak: 5,
    affectedPopulation: 15000,
    interventions: interventions.slice(0, 2),
    createdAt: new Date()
  },
  {
    id: '2',
    disease: 'Norovirus',
    location: 'University Campus',
    riskLevel: 'medium',
    confidence: 72,
    predictedCases: 120,
    timeToOutbreak: 8,
    affectedPopulation: 8000,
    interventions: interventions.slice(1, 3),
    createdAt: new Date(Date.now() - 86400000)
  },
  {
    id: '3',
    disease: 'COVID-19 Variant',
    location: 'Residential Area North',
    riskLevel: 'medium',
    confidence: 65,
    predictedCases: 200,
    timeToOutbreak: 12,
    affectedPopulation: 12000,
    interventions: interventions.slice(0, 3),
    createdAt: new Date(Date.now() - 172800000)
  }
];

export const communityData: CommunityData[] = [
  {
    id: '1',
    name: 'Downtown District',
    population: 15000,
    coordinates: [40.7128, -74.0060],
    healthIndicators: healthIndicators.slice(0, 3),
    riskScore: 75,
    lastAssessment: new Date()
  },
  {
    id: '2',
    name: 'University Campus',
    population: 8000,
    coordinates: [40.7589, -73.9851],
    healthIndicators: healthIndicators.slice(1, 4),
    riskScore: 60,
    lastAssessment: new Date()
  },
  {
    id: '3',
    name: 'Residential Area North',
    population: 12000,
    coordinates: [40.7831, -73.9712],
    healthIndicators: healthIndicators.slice(2, 5),
    riskScore: 45,
    lastAssessment: new Date()
  }
];

export const timeSeriesData: TimeSeriesData[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 86400000),
  value: Math.floor(Math.random() * 50) + 20 + (i > 20 ? (i - 20) * 2 : 0),
  predicted: i > 25,
  confidence: i > 25 ? Math.random() * 0.3 + 0.7 : undefined
}));

export const modelMetrics: ModelMetrics = {
  accuracy: 0.89,
  precision: 0.85,
  recall: 0.92,
  f1Score: 0.88,
  falsePositiveRate: 0.08,
  falseNegativeRate: 0.12
};

export const outbreakPatterns: OutbreakPattern[] = [
  {
    id: '1',
    disease: 'Influenza A',
    seasonality: 'winter',
    peakMonths: [12, 1, 2],
    averageDuration: 14,
    transmissionRate: 0.3,
    mortalityRate: 0.001
  },
  {
    id: '2',
    disease: 'Norovirus',
    seasonality: 'year_round',
    peakMonths: [11, 12, 1, 2, 3],
    averageDuration: 7,
    transmissionRate: 0.5,
    mortalityRate: 0.0001
  },
  {
    id: '3',
    disease: 'COVID-19',
    seasonality: 'year_round',
    peakMonths: [11, 12, 1],
    averageDuration: 21,
    transmissionRate: 0.25,
    mortalityRate: 0.02
  }
];