export interface HealthIndicator {
  id: string;
  name: string;
  value: number;
  threshold: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: Date;
  severity: 'low' | 'medium' | 'high';
}

export interface OutbreakAlert {
  id: string;
  disease: string;
  location: string;
  riskLevel: 'low' | 'medium' | 'high';
  confidence: number;
  predictedCases: number;
  timeToOutbreak: number; // days
  affectedPopulation: number;
  interventions: Intervention[];
  createdAt: Date;
}

export interface Intervention {
  id: string;
  type: 'vaccination' | 'quarantine' | 'screening' | 'education' | 'resource_allocation';
  description: string;
  priority: 'low' | 'medium' | 'high';
  estimatedCost: number;
  effectiveness: number; // percentage
  timeToImplement: number; // days
}

export interface CommunityData {
  id: string;
  name: string;
  population: number;
  coordinates: [number, number];
  healthIndicators: HealthIndicator[];
  riskScore: number;
  lastAssessment: Date;
}

export interface TimeSeriesData {
  date: Date;
  value: number;
  predicted?: boolean;
  confidence?: number;
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  falsePositiveRate: number;
  falseNegativeRate: number;
}

export interface OutbreakPattern {
  id: string;
  disease: string;
  seasonality: 'spring' | 'summer' | 'fall' | 'winter' | 'year_round';
  peakMonths: number[];
  averageDuration: number; // days
  transmissionRate: number;
  mortalityRate: number;
}