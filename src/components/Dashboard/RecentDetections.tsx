
interface RecentDetectionsProps {
  onInspect: (id: number) => void;
}

const detections = [
  { time: '10:24:15', id: 12, temp: 42.8, vib: 1.25, status: 'Critical' },
  { time: '10:23:50', id: 11, temp: 38.2, vib: 0.95, status: 'Degrading' },
  { time: '10:23:25', id: 10, temp: 32.5, vib: 0.62, status: 'Normal' },
  { time: '10:23:00', id: 9, temp: 31.8, vib: 0.58, status: 'Normal' },
  { time: '10:22:35', id: 8, temp: 39.6, vib: 1.10, status: 'Degrading' },
];

const StatusBadge = ({ status }: { status: string }) => {
  let classes = 'px-2 py-0.5 rounded text-[10px] font-semibold ';
  switch (status) {
    case 'Critical': classes += 'bg-danger/10 text-danger border border-danger/20'; break;
    case 'Degrading': classes += 'bg-warning/10 text-warning border border-warning/20'; break;
    case 'Normal': classes += 'bg-success/10 text-success border border-success/20'; break;
    default: classes += 'bg-gray-100 text-gray-500';
  }
  return <span className={classes}>{status}</span>;
};

const RecentDetections: React.FC<RecentDetectionsProps> = ({ onInspect }) => {
  return (
    <div className="card h-full flex flex-col">
      <div className="px-4 py-3 border-b border-[#D9E1EA]">
        <h3 className="font-semibold text-gray-800 text-sm">Recent Joint Detections</h3>
      </div>
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-500 sticky top-0">
            <tr>
              <th className="px-4 py-2 font-medium">Time</th>
              <th className="px-4 py-2 font-medium">Joint ID</th>
              <th className="px-4 py-2 font-medium text-center">Image</th>
              <th className="px-4 py-2 font-medium">Temperature<br/>(°C)</th>
              <th className="px-4 py-2 font-medium">Vibration<br/>(g)</th>
              <th className="px-4 py-2 font-medium text-center">Status</th>
              <th className="px-4 py-2 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {detections.map((d, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2 text-gray-600">{d.time}</td>
                <td className={`px-4 py-2 font-bold ${d.status === 'Critical' ? 'text-danger' : 'text-gray-700'}`}>#{d.id}</td>
                <td className="px-4 py-1 text-center">
                  <div className="w-12 h-6 bg-gray-300 mx-auto rounded overflow-hidden">
                    <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjY2JkNWUxIiBmaWxsLW9wYWNpdHk9IjEuMCIvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iIzRjNTU2ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuNSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] opacity-50"></div>
                  </div>
                </td>
                <td className={`px-4 py-2 font-medium ${d.temp > 40 ? 'text-danger' : 'text-gray-700'}`}>{d.temp.toFixed(1)}</td>
                <td className="px-4 py-2 text-gray-700">{d.vib.toFixed(2)}</td>
                <td className="px-4 py-2 text-center"><StatusBadge status={d.status} /></td>
                <td className="px-4 py-2 text-center">
                  {d.status === 'Normal' ? (
                    <span className="text-gray-400">-</span>
                  ) : (
                    <button 
                      onClick={() => onInspect(d.id)}
                      className={`px-3 py-1 rounded text-[10px] font-semibold transition-colors ${d.status === 'Critical' ? 'bg-primary/10 text-primary hover:bg-primary hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {d.status === 'Critical' ? 'Inspect' : 'Monitor'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentDetections;
