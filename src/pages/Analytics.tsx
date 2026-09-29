import { useState, useEffect } from 'react';
import { simulationService } from '../services/simulationService';
import JointHealthChart from '../components/Dashboard/JointHealthChart';

const Analytics = () => {
  const [joints, setJoints] = useState(simulationService.getJoints());
  const [selectedJointId, setSelectedJointId] = useState<number>(12);

  useEffect(() => {
    const timer = setInterval(() => {
      simulationService.updateSimulation();
      setJoints(simulationService.getJoints());
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
        
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
          <label className="text-sm font-semibold text-gray-600">Select Joint:</label>
          <select 
            className="bg-gray-50 border border-gray-200 rounded px-3 py-1 text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            value={selectedJointId}
            onChange={(e) => setSelectedJointId(Number(e.target.value))}
          >
            {joints.map(j => (
              <option key={j.id} value={j.id}>Joint #{j.id}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          {/* Main live variation graph reused from Dashboard */}
          <JointHealthChart jointId={selectedJointId} />
        </div>
        
        <div className="col-span-1 flex flex-col gap-6">
          <div className="card p-6 border-l-4 border-l-purple-500">
            <h3 className="font-bold text-gray-800 mb-2">Wear Estimation</h3>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-3xl font-bold text-gray-900">Calculating...</span>
            </div>
            <p className="text-xs text-gray-500">Wear estimation utilizes laser profile scanning combined with camera feeds to monitor belt surface and thickness changes.</p>
          </div>
          
          <div className="card p-6">
            <h3 className="font-bold text-gray-800 mb-4">Historical Averages</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-sm text-gray-500">Avg. Temperature</span>
                <span className="text-sm font-bold text-gray-800">36.4 °C</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-sm text-gray-500">Avg. Vibration</span>
                <span className="text-sm font-bold text-gray-800">0.82 g</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-sm text-gray-500">Critical Events (24h)</span>
                <span className="text-sm font-bold text-danger">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Analytics;
