import { simulationService } from '../services/simulationService';

const Maintenance = () => {
  const maintenance = simulationService.getMaintenance();
  
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Maintenance Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {maintenance.map(m => (
          <div key={m.id} className="card p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">Joint #{m.jointId}</h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  m.priority === 'Immediate' ? 'bg-danger/10 text-danger' : 
                  m.priority === 'High' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
                }`}>
                  {m.priority} Priority
                </span>
              </div>
              <span className="text-sm font-medium text-gray-500">{m.status}</span>
            </div>
            
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Recommendations:</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-6">
              {m.recommendations.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
            
            <div className="flex gap-3">
              <button className="flex-1 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-blue-600">Schedule Inspection</button>
              <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200">Mark Complete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Maintenance;
