import type {  Joint, JointStatus  } from '../../types';

interface BeltJointMapProps {
  joints: Joint[];
  selectedId: number;
  onSelect: (id: number) => void;
}

const getStatusColor = (status: JointStatus) => {
  switch (status) {
    case 'Normal': return 'bg-success';
    case 'Degrading': return 'bg-warning';
    case 'Critical': return 'bg-danger';
    default: return 'bg-gray-400';
  }
};

const BeltJointMap: React.FC<BeltJointMapProps> = ({ joints, selectedId, onSelect }) => {
  return (
    <div className="card p-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-gray-800 text-sm">Belt Joint Map</h3>
        <div className="flex gap-4 text-xs font-medium text-gray-600">
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-success"></div>Normal</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-warning"></div>Degrading</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-danger"></div>Critical</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>Not Monitored</div>
        </div>
      </div>

      <div className="relative w-full h-24 bg-[#1E293B] rounded-full border-[6px] border-[#334155] flex items-center px-4 shadow-inner">
        {/* Belt Texture Simulation */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuNSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')]"></div>
        
        {/* Rollers (visual effect) */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-16 bg-gray-400 rounded-full border-2 border-gray-600 shadow-lg z-10"></div>
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-16 bg-gray-400 rounded-full border-2 border-gray-600 shadow-lg z-10"></div>

        <div className="flex-1 flex justify-between items-center relative z-20">
          {joints.map((joint) => {
            const isSelected = joint.id === selectedId;
            return (
              <div key={joint.id} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => onSelect(joint.id)}>
                <div className={`
                  w-4 h-4 rounded-full ${getStatusColor(joint.status)} 
                  shadow-sm transition-all duration-200
                  ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1E293B] scale-125' : 'hover:scale-110'}
                `}></div>
                <span className={`text-[10px] font-bold absolute -bottom-6 ${isSelected ? 'text-danger scale-110' : 'text-gray-500 group-hover:text-gray-700'}`}>
                  {joint.id}
                </span>
                {isSelected && (
                  <div className="absolute -inset-x-2 -inset-y-4 border border-danger border-dashed rounded opacity-50"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-6"></div> {/* Spacer for the absolute positioned numbers */}
    </div>
  );
};

export default BeltJointMap;
