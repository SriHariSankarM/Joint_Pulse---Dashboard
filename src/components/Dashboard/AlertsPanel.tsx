import { Link } from 'react-router-dom';
import { AlertCircle, AlertTriangle, Info, Bell } from 'lucide-react';
import type {  Alert  } from '../../types';
import { format } from 'date-fns';

interface AlertsPanelProps {
  alerts: Alert[];
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  return (
    <div className="card h-full flex flex-col">
      <div className="px-4 py-3 border-b border-[#D9E1EA] flex justify-between items-center bg-gray-50/50">
        <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
          <Bell className="w-4 h-4 text-success" />
          Alerts & Notifications
        </h3>
        <Link to="/alerts" className="bg-danger text-white text-[10px] px-2 py-0.5 rounded font-medium hover:bg-red-700 transition-colors">
          View All
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex gap-3 items-start p-2 rounded hover:bg-gray-50 transition-colors">
            <div className={`mt-0.5 shrink-0 p-1 rounded-full ${
              alert.severity === 'CRITICAL' ? 'bg-danger text-white' : 
              alert.severity === 'WARNING' ? 'bg-warning text-white' : 
              'bg-primary text-white'
            }`}>
              {alert.severity === 'CRITICAL' ? <AlertCircle className="w-4 h-4" /> : 
               alert.severity === 'WARNING' ? <AlertTriangle className="w-4 h-4" /> : 
               <Info className="w-4 h-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-0.5">
                <span className={`text-xs font-bold ${alert.severity === 'CRITICAL' ? 'text-gray-800' : 'text-gray-700'}`}>
                  Joint #{alert.jointId}
                </span>
                <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                  {format(new Date(alert.timestamp), 'hh:mm a')}
                </span>
              </div>
              <p className={`text-xs ${alert.severity === 'CRITICAL' ? 'text-gray-800' : 'text-gray-600'} leading-snug`}>
                {alert.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
