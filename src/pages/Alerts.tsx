import { useState } from 'react';
import { simulationService } from '../services/simulationService';
import { format } from 'date-fns';
import { AlertCircle, AlertTriangle, Info, Check } from 'lucide-react';

const Alerts = () => {
  const [alerts, setAlerts] = useState(simulationService.getAlerts());

  const handleAck = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, acknowledged: true } : a));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Alerts & Notifications</h2>
      
      <div className="flex gap-4 mb-6">
        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">All Alerts</button>
        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-danger">Critical</button>
        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-warning">Warning</button>
      </div>

      <div className="flex flex-col gap-3">
        {alerts.map(alert => (
          <div key={alert.id} className={`card p-4 flex items-center gap-4 ${alert.acknowledged ? 'opacity-60' : ''}`}>
            <div className={`p-2 rounded-full ${
              alert.severity === 'CRITICAL' ? 'bg-danger text-white' : 
              alert.severity === 'WARNING' ? 'bg-warning text-white' : 
              'bg-primary text-white'
            }`}>
              {alert.severity === 'CRITICAL' ? <AlertCircle className="w-5 h-5" /> : 
               alert.severity === 'WARNING' ? <AlertTriangle className="w-5 h-5" /> : 
               <Info className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">Joint #{alert.jointId}</span>
                <span className="text-xs text-gray-500">{format(new Date(alert.timestamp), 'dd MMM, HH:mm')}</span>
              </div>
              <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
            </div>
            {!alert.acknowledged && (
              <button onClick={() => handleAck(alert.id)} className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-md transition-colors">
                <Check className="w-3 h-3" /> Acknowledge
              </button>
            )}
            {alert.acknowledged && (
              <span className="text-xs text-gray-400 font-medium flex items-center gap-1"><Check className="w-3 h-3" /> Acknowledged</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
