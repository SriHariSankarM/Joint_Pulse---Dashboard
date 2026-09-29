import { simulationService } from '../services/simulationService';

const LiveData = () => {
  const readings = simulationService.getSensorReadings();
  
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Live Sensor Data</h2>
      <div className="card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Sensor</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Value</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Unit</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {readings.map((r, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-semibold text-gray-800">{r.sensorId} <span className="text-xs text-gray-400 font-normal ml-2">({r.type})</span></td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{r.value}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{r.unit}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    r.status === 'Warning' ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                  }`}>{r.status}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">Just now</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default LiveData;
