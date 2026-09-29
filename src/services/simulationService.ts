import type {  Joint, Alert, MaintenanceRecommendation, JointHistoryPoint, SensorReading  } from '../types';

let joints: Joint[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  status: i === 11 ? 'Critical' : (i === 10 || i === 7 || i === 20 || i === 3) ? 'Degrading' : 'Normal',
  healthIndex: i === 11 ? 42 : (i === 10 ? 68 : (i === 7 ? 75 : 92)),
  temperature: i === 11 ? 42.8 : (i === 10 ? 38.2 : 32.5),
  vibration: i === 11 ? 1.25 : (i === 10 ? 0.95 : 0.62),
  load: 320,
  beltSpeed: 2.5,
  lastDetected: new Date().toISOString()
}));

let alerts: Alert[] = [
  { id: 'a1', jointId: 12, severity: 'CRITICAL', message: 'High temperature detected (42.8°C)', timestamp: new Date(Date.now() - 50000).toISOString(), acknowledged: false },
  { id: 'a2', jointId: 11, severity: 'WARNING', message: 'Increased vibration (0.95 g)', timestamp: new Date(Date.now() - 150000).toISOString(), acknowledged: false },
  { id: 'a3', jointId: 8, severity: 'CRITICAL', message: 'Crack detected in camera image', timestamp: new Date(Date.now() - 3600000).toISOString(), acknowledged: false },
  { id: 'a4', jointId: 5, severity: 'INFO', message: 'Scheduled maintenance due', timestamp: new Date(Date.now() - 7200000).toISOString(), acknowledged: false },
];

let maintenance: MaintenanceRecommendation[] = [
  { id: 'm1', jointId: 12, priority: 'Immediate', status: 'Pending', recommendations: ['Plan immediate inspection', 'Check splice condition', 'Monitor temperature closely'] },
  { id: 'm2', jointId: 11, priority: 'High', status: 'Pending', recommendations: ['Schedule inspection', 'Monitor vibration trend', 'Check belt alignment'] },
  { id: 'm3', jointId: 5, priority: 'Medium', status: 'Scheduled', recommendations: ['Routine check', 'Clean sensor surfaces'] },
];

let historyCache: Record<number, JointHistoryPoint[]> = {};

export const simulationService = {
  getJoints: () => [...joints],
  
  getJoint: (id: number) => joints.find(j => j.id === id),
  
  getAlerts: () => [...alerts],
  
  getMaintenance: () => [...maintenance],
  
  getMaintenanceForJoint: (id: number) => maintenance.find(m => m.jointId === id),
  
  getHistory: (id: number) => {
    if (!historyCache[id]) {
      const isCritical = id === 12;
      const points: JointHistoryPoint[] = [];
      const now = new Date();
      for (let i = 60; i >= 0; i -= 2) {
        points.push({
          time: new Date(now.getTime() - i * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          temperature: isCritical ? 32 + (60 - i) * 0.18 : 32 + Math.random() * 2,
          vibration: isCritical ? 0.6 + (60 - i) * 0.01 : 0.6 + Math.random() * 0.1,
          load: 310 + Math.random() * 20
        });
      }
      historyCache[id] = points;
    }
    return [...historyCache[id]];
  },

  getSensorReadings: (): SensorReading[] => {
    return [
      { sensorId: 'MLX90640', type: 'Temperature', value: 42.8, unit: '°C', status: 'Warning', timestamp: new Date().toISOString() },
      { sensorId: 'ADXL345', type: 'Vibration', value: 1.25, unit: 'g', status: 'Warning', timestamp: new Date().toISOString() },
      { sensorId: 'Encoder', type: 'Speed', value: 2.5, unit: 'm/s', status: 'Normal', timestamp: new Date().toISOString() },
      { sensorId: 'LoadCell', type: 'Load', value: 320, unit: 'kg', status: 'Normal', timestamp: new Date().toISOString() },
      { sensorId: 'Camera', type: 'Vision', value: 'Active', unit: '-', status: 'Normal', timestamp: new Date().toISOString() },
    ];
  },

  updateSimulation: () => {
    // Slightly adjust values to simulate live data
    joints = joints.map(j => {
      const speedVary = (Math.random() - 0.5) * 0.1;
      const loadVary = (Math.random() - 0.5) * 5;
      let newTemp = j.temperature;
      let newVib = j.vibration;
      
      if (j.id === 12 && Math.random() > 0.8) {
        newTemp += 0.1;
      }

      if (historyCache[j.id]) {
        const now = new Date();
        const history = historyCache[j.id];
        history.push({
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          temperature: newTemp,
          vibration: newVib,
          load: j.load + loadVary
        });
        if (history.length > 30) {
          history.shift();
        }
      }

      return {
        ...j,
        beltSpeed: Math.max(2.0, Math.min(3.0, j.beltSpeed + speedVary)),
        load: Math.max(200, Math.min(400, j.load + loadVary)),
        temperature: newTemp,
        vibration: newVib,
        lastDetected: new Date().toISOString()
      };
    });
  }
};
