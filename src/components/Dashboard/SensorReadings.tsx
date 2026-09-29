import { Thermometer, Waves, Gauge, Weight, Link, Clock } from 'lucide-react';
import type {  Joint, SensorReading  } from '../../types';
import { format } from 'date-fns';

interface SensorReadingsProps {
  joint: Joint;
  readings: SensorReading[];
}

const SensorReadings: React.FC<SensorReadingsProps> = ({ joint }) => {
  const isTempHigh = joint.temperature > 40;
  const isVibHigh = joint.vibration > 1.0;

  return (
    <div className="card h-[280px] flex flex-col">
      <div className="px-4 py-2 border-b border-[#D9E1EA]">
        <h3 className="font-semibold text-gray-800 text-sm">Sensor Readings (Current Joint)</h3>
      </div>
      <div className="flex-1 p-3 grid grid-cols-2 gap-3">
        {/* Temperature */}
        <div className="bg-gray-50 rounded p-2 flex items-center gap-3 border border-gray-100">
          <div className={`p-2 rounded-full ${isTempHigh ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary'}`}>
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-medium">Temperature</p>
            <p className={`text-sm font-bold ${isTempHigh ? 'text-danger' : 'text-gray-800'}`}>
              {joint.temperature.toFixed(1)}°C
            </p>
          </div>
        </div>

        {/* Belt Speed */}
        <div className="bg-gray-50 rounded p-2 flex items-center gap-3 border border-gray-100">
          <div className="p-2 rounded-full bg-success/10 text-success">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-medium">Belt Speed</p>
            <p className="text-sm font-bold text-success">
              {joint.beltSpeed.toFixed(1)} m/s
            </p>
          </div>
        </div>

        {/* Vibration */}
        <div className="bg-gray-50 rounded p-2 flex items-center gap-3 border border-gray-100">
          <div className={`p-2 rounded-full ${isVibHigh ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'}`}>
            <Waves className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-medium">Vibration (RMS)</p>
            <p className={`text-sm font-bold ${isVibHigh ? 'text-warning' : 'text-gray-800'}`}>
              {joint.vibration.toFixed(2)} g
            </p>
          </div>
        </div>

        {/* Joint ID */}
        <div className="bg-gray-50 rounded p-2 flex items-center gap-3 border border-gray-100">
          <div className="p-2 rounded-full bg-orange-500/10 text-orange-500">
            <Link className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-medium">Joint ID</p>
            <p className="text-sm font-bold text-orange-500">
              #{joint.id}
            </p>
          </div>
        </div>

        {/* Load */}
        <div className="bg-gray-50 rounded p-2 flex items-center gap-3 border border-gray-100">
          <div className="p-2 rounded-full bg-purple-500/10 text-purple-500">
            <Weight className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-medium">Load</p>
            <p className="text-sm font-bold text-purple-700">
              {Math.round(joint.load)} kg
            </p>
          </div>
        </div>

        {/* Passage Time */}
        <div className="bg-gray-50 rounded p-2 flex items-center gap-3 border border-gray-100">
          <div className="p-2 rounded-full bg-navy-900/10 text-navy-900">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-medium">Passage Time</p>
            <p className="text-sm font-bold text-navy-900">
              {format(new Date(joint.lastDetected), 'HH:mm:ss')}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SensorReadings;
