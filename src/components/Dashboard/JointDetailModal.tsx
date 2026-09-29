import { useState } from 'react';
import { X, Activity, Settings2, Bell, Wrench } from 'lucide-react';
import type {  Joint  } from '../../types';
import { simulationService } from '../../services/simulationService';
import { format } from 'date-fns';

interface JointDetailModalProps {
  joint: Joint;
  onClose: () => void;
}

const JointDetailModal: React.FC<JointDetailModalProps> = ({ joint, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const maint = simulationService.getMaintenanceForJoint(joint.id);

  return (
    <div className="fixed inset-0 bg-navy-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh] overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">JOINT #{joint.id}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className={`px-2 py-0.5 rounded text-xs font-bold text-white ${
                joint.status === 'Critical' ? 'bg-danger' : joint.status === 'Degrading' ? 'bg-warning' : 'bg-success'
              }`}>
                {joint.status.toUpperCase()}
              </span>
              <span className="text-sm text-gray-500 font-medium">
                Health Index: <span className={joint.healthIndex < 50 ? 'text-danger' : joint.healthIndex < 80 ? 'text-warning' : 'text-success'}>{joint.healthIndex}/100</span>
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-6">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'sensor', label: 'Sensor Data', icon: Settings2 },
            { id: 'history', label: 'History', icon: Activity },
            { id: 'alerts', label: 'Alerts', icon: Bell },
            { id: 'maintenance', label: 'Maintenance', icon: Wrench },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#F8FAFC]">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-2 gap-6">
              <div className="card p-5 border-l-4 border-l-primary">
                <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Current Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Temperature</span>
                    <span className={`font-bold ${joint.temperature > 40 ? 'text-danger' : 'text-gray-900'}`}>{joint.temperature.toFixed(1)} °C</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Vibration (RMS)</span>
                    <span className={`font-bold ${joint.vibration > 1.0 ? 'text-warning' : 'text-gray-900'}`}>{joint.vibration.toFixed(2)} g</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Load</span>
                    <span className="font-bold text-gray-900">{Math.round(joint.load)} kg</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Belt Speed</span>
                    <span className="font-bold text-gray-900">{joint.beltSpeed.toFixed(1)} m/s</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-gray-600">Last Detection</span>
                    <span className="font-medium text-gray-900">{format(new Date(joint.lastDetected), 'HH:mm:ss')}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-6">
                <div className="card p-5 bg-gradient-to-br from-white to-gray-50">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Health Assessment</h3>
                  <div className="mt-4 flex items-center justify-center relative">
                     <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-200" />
                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" 
                          strokeDasharray={351.8} 
                          strokeDashoffset={351.8 - (351.8 * joint.healthIndex) / 100}
                          className={joint.healthIndex < 50 ? 'text-danger' : joint.healthIndex < 80 ? 'text-warning' : 'text-success'} 
                        />
                     </svg>
                     <div className="absolute flex flex-col items-center justify-center">
                       <span className="text-3xl font-bold text-gray-800">{joint.healthIndex}</span>
                       <span className="text-[10px] font-bold text-gray-400">/ 100</span>
                     </div>
                  </div>
                </div>

                {maint && (
                  <div className={`card p-4 border-l-4 ${maint.priority === 'Immediate' ? 'border-l-danger bg-danger/5' : 'border-l-warning bg-warning/5'}`}>
                    <h3 className={`text-sm font-bold mb-2 ${maint.priority === 'Immediate' ? 'text-danger' : 'text-warning'}`}>
                      Action Required: {maint.priority} Priority
                    </h3>
                    <ul className="text-xs text-gray-700 space-y-1 ml-4 list-disc">
                      {maint.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab !== 'overview' && (
            <div className="flex items-center justify-center h-48 text-gray-400 bg-white rounded-lg border border-dashed border-gray-300">
              <p>Detailed {activeTab} data.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JointDetailModal;
