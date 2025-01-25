export interface PlantCare {
  wateringSchedule: string;
  temperature: {
    min: number;
    max: number;
    ideal: number;
  };
  humidity: {
    min: number;
    max: number;
    ideal: number;
  };
  sunlight: {
    requirement: string;
    description: string;
  };
  tips: string[];
}

export interface Task {
  id: string;
  title: string;
  date: string;
  completed: boolean;
}

export type PlantType = 'succulent' | 'tropical' | 'herb' | 'flowering';