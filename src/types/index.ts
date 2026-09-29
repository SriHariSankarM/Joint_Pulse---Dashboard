export type JointStatus = 'Normal' | 'Degrading' | 'Critical' | 'Not Monitored';

export interface Joint {
  id: number;
  status: JointStatus;
  healthIndex: number; // 0-100
  temperature: number; // Celsius
  vibration: number; // g RMS
  load: number; // kg
  beltSpeed: number; // m/s
  lastDetected: string; // ISO string
}

export interface SensorReading {
  sensorId: string;
  type: string;
  value: number | string;
  unit: string;
  status: 'Normal' | 'Warning' | 'Critical' | 'Offline';
  timestamp: string;
}

export interface Alert {
  id: string;
  jointId: number;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface MaintenanceRecommendation {
  id: string;
  jointId: number;
  priority: 'Low' | 'Medium' | 'High' | 'Immediate';
  status: 'Pending' | 'Scheduled' | 'Completed';
  recommendations: string[];
}

export interface JointHistoryPoint {
  time: string;
  temperature: number;
  vibration: number;
  load: number;
}
