import { Wrench, AlertCircle, AlertTriangle } from 'lucide-react';
import type {  MaintenanceRecommendation  } from '../../types';

interface MaintenancePanelProps {
  maintenance: MaintenanceRecommendation[];
}

const MaintenancePanel: React.FC<MaintenancePanelProps> = ({ maintenance }) => {
  // Only show pending high/immediate priority recommendations for the dashboard
  const activeMaint = maintenance.filter(m => m.status === 'Pending' && (m.priority === 'Immediate' || m.priority === 'High'));

  return (
    <div className="card h-full flex flex-col">
      <div className="px-4 py-3 border-b border-[#D9E1EA] bg-gray-50/50">
        <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
          <Wrench className="w-4 h-4 text-success" />
          Maintenance Recommendations
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
        {activeMaint.map((m) => (
          <div key={m.id} className={`p-3 rounded-lg border ${
            m.priority === 'Immediate' ? 'bg-danger/5 border-danger/20' : 'bg-warning/5 border-warning/20'
          }`}>
            <div className="flex gap-3 items-start">
              <div className={`mt-0.5 shrink-0 p-1.5 rounded-full ${
                m.priority === 'Immediate' ? 'bg-danger text-white' : 'bg-warning text-white'
              }`}>
                {m.priority === 'Immediate' ? <AlertCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              </div>
              <div className="flex-1">
                <div className="flex flex-col mb-2">
                  <span className="text-sm font-bold text-gray-800">Joint #{m.jointId}</span>
                  <span className={`text-[10px] font-bold ${
                    m.priority === 'Immediate' ? 'text-danger' : 'text-warning'
                  }`}>
                    Status: {m.priority === 'Immediate' ? 'Critical' : 'Degrading'}
                  </span>
                </div>
                <ul className="text-xs text-gray-700 space-y-1">
                  {m.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 shrink-0"></span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
        {activeMaint.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
            No active maintenance required
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenancePanel;
