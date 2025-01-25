import { PlantCare, PlantType } from './types';

export const plantCareGuides: Record<PlantType, PlantCare> = {
  succulent: {
    wateringSchedule: 'Every 10-14 days',
    temperature: {
      min: 10,
      max: 30,
      ideal: 22
    },
    humidity: {
      min: 20,
      max: 50,
      ideal: 30
    },
    sunlight: {
      requirement: 'full',
      description: 'Direct sunlight for 6+ hours daily'
    },
    tips: [
      'Allow soil to dry completely between waterings',
      'Use well-draining soil mix',
      'Protect from frost',
      'Reduce watering in winter'
    ]
  },
  tropical: {
    wateringSchedule: 'Every 3-5 days',
    temperature: {
      min: 18,
      max: 30,
      ideal: 24
    },
    humidity: {
      min: 60,
      max: 80,
      ideal: 70
    },
    sunlight: {
      requirement: 'partial',
      description: 'Bright, indirect light'
    },
    tips: [
      'Maintain high humidity',
      'Keep soil consistently moist',
      'Avoid cold drafts',
      'Regular misting recommended'
    ]
  },
  herb: {
    wateringSchedule: 'Every 2-3 days',
    temperature: {
      min: 15,
      max: 25,
      ideal: 20
    },
    humidity: {
      min: 40,
      max: 60,
      ideal: 50
    },
    sunlight: {
      requirement: 'full',
      description: 'At least 6 hours of direct sunlight'
    },
    tips: [
      'Harvest regularly to promote growth',
      'Ensure good air circulation',
      'Fertilize monthly during growing season',
      'Prune to prevent flowering'
    ]
  },
  flowering: {
    wateringSchedule: 'Every 4-6 days',
    temperature: {
      min: 16,
      max: 26,
      ideal: 21
    },
    humidity: {
      min: 50,
      max: 70,
      ideal: 60
    },
    sunlight: {
      requirement: 'partial',
      description: 'Morning sun, afternoon shade'
    },
    tips: [
      'Deadhead spent blooms',
      'Feed with bloom-boosting fertilizer',
      'Check for pests regularly',
      'Rotate pot periodically'
    ]
  }
};