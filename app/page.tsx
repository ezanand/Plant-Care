"use client";

import { useState, useEffect } from "react";
import { Plane as PlantIcon, Leaf, Thermometer, Droplets, Sun, Calendar, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { plantCareGuides } from "@/lib/plant-data";
import { PlantCare, Task, PlantType } from "@/lib/types";

export default function Home() {
  const [plantType, setPlantType] = useState<PlantType | ''>('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [sunlight, setSunlight] = useState('');
  const [careGuide, setCareGuide] = useState<PlantCare | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    if (plantType) {
      setCareGuide(plantCareGuides[plantType as PlantType]);
      generateTasks(plantType as PlantType);
    }
  }, [plantType]);

  useEffect(() => {
    if (careGuide && temperature && humidity && sunlight) {
      generateRecommendations();
    }
  }, [careGuide, temperature, humidity, sunlight]);

  const generateTasks = (type: PlantType) => {
    const guide = plantCareGuides[type];
    const newTasks: Task[] = [
      {
        id: '1',
        title: `Water plant (${guide.wateringSchedule})`,
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        completed: false
      },
      {
        id: '2',
        title: 'Check soil moisture',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString(),
        completed: false
      },
      {
        id: '3',
        title: 'Inspect for pests',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        completed: false
      }
    ];
    setTasks(newTasks);
  };

  const generateRecommendations = () => {
    if (!careGuide) return;

    const temp = parseFloat(temperature);
    const hum = parseFloat(humidity);
    const recommendations: string[] = [];

    if (temp < careGuide.temperature.min) {
      recommendations.push(`Increase temperature to at least ${careGuide.temperature.min}°C`);
    } else if (temp > careGuide.temperature.max) {
      recommendations.push(`Decrease temperature below ${careGuide.temperature.max}°C`);
    }

    if (hum < careGuide.humidity.min) {
      recommendations.push(`Increase humidity to at least ${careGuide.humidity.min}%`);
    } else if (hum > careGuide.humidity.max) {
      recommendations.push(`Decrease humidity below ${careGuide.humidity.max}%`);
    }

    if (sunlight !== careGuide.sunlight.requirement) {
      recommendations.push(`Adjust sunlight exposure: ${careGuide.sunlight.description}`);
    }

    recommendations.push(...careGuide.tips);
    setRecommendations(recommendations);
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-12">
          <PlantIcon className="h-16 w-16 text-green-600 dark:text-green-400 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Plant Nurture</h1>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl">
            Your intelligent plant care companion. Get personalized care recommendations based on your plant's needs and environment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              Plant Details
            </h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="plant-type">Plant Type</Label>
                <Select value={plantType} onValueChange={(value) => setPlantType(value as PlantType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select plant type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="succulent">Succulent</SelectItem>
                    <SelectItem value="tropical">Tropical</SelectItem>
                    <SelectItem value="herb">Herb</SelectItem>
                    <SelectItem value="flowering">Flowering Plant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="temperature">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="h-4 w-4" />
                    Temperature (°C)
                  </div>
                </Label>
                <Input
                  id="temperature"
                  type="number"
                  placeholder="Enter temperature"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="humidity">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="h-4 w-4" />
                    Humidity (%)
                  </div>
                </Label>
                <Input
                  id="humidity"
                  type="number"
                  placeholder="Enter humidity"
                  value={humidity}
                  onChange={(e) => setHumidity(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="sunlight">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="h-4 w-4" />
                    Sunlight Exposure
                  </div>
                </Label>
                <Select value={sunlight} onValueChange={setSunlight}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sunlight exposure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Sun</SelectItem>
                    <SelectItem value="partial">Partial Sun</SelectItem>
                    <SelectItem value="shade">Shade</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {careGuide && (
                <Alert className="bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800">
                  <AlertDescription>
                    <div className="space-y-2">
                      <p><strong>Ideal Conditions:</strong></p>
                      <p>Temperature: {careGuide.temperature.ideal}°C</p>
                      <p>Humidity: {careGuide.humidity.ideal}%</p>
                      <p>Watering: {careGuide.wateringSchedule}</p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Sun className="h-6 w-6 text-green-600" />
                Care Dashboard
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                  <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">Current Conditions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-5 w-5 text-green-600" />
                      <span>{temperature || "--"}°C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-green-600" />
                      <span>{humidity || "--"}%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Recommendations
                  </h3>
                  {recommendations.length > 0 ? (
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      {recommendations.map((rec, index) => (
                        <li key={index}>• {rec}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300">
                      Enter your plant details to receive personalized care recommendations.
                    </p>
                  )}
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    Upcoming Tasks
                  </h3>
                  {tasks.length > 0 ? (
                    <ul className="space-y-2">
                      {tasks.map((task) => (
                        <li
                          key={task.id}
                          className="flex items-center justify-between text-gray-600 dark:text-gray-300"
                        >
                          <span className={task.completed ? 'line-through' : ''}>
                            • {task.title} ({task.date})
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleTask(task.id)}
                          >
                            {task.completed ? 'Undo' : 'Complete'}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300">No tasks scheduled</p>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}