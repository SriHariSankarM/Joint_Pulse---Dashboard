import type {  Joint  } from '../../types';

interface ThermalPanelProps {
  joint: Joint;
}

const ThermalPanel: React.FC<ThermalPanelProps> = ({ joint }) => {
  return (
    <div className="card h-[280px] flex flex-col">
      <div className="px-4 py-2 border-b border-[#D9E1EA]">
        <h3 className="font-semibold text-gray-800 text-sm">Thermal Image</h3>
      </div>
      <div className="flex-1 relative bg-gray-900 p-2 flex">
        {/* Thermal gradient background */}
        <div 
          className="flex-1 relative border border-gray-700"
          style={{
            background: 'radial-gradient(ellipse at center, #FF0000 0%, #FFFF00 20%, #00FF00 50%, #0000FF 100%)'
          }}
        >
          {joint.status === 'Critical' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute -top-6 bg-danger text-white text-xs px-2 py-0.5 rounded font-bold whitespace-nowrap">
                Hotspot ({joint.temperature.toFixed(1)}°C)
              </div>
            </div>
          )}
          
          <div className="absolute bottom-2 left-2 text-white/70 text-[10px] font-mono">
            THERMAL FEED
          </div>
          <div className="absolute bottom-2 right-2 text-white/90 text-[10px] font-mono text-right">
            MAX: {joint.temperature.toFixed(1)}°C<br/>
            AVG: {(joint.temperature - 8.2).toFixed(1)}°C
          </div>
        </div>
        
        {/* Thermal Scale */}
        <div className="w-8 ml-2 flex flex-col justify-between items-center text-[10px] text-white">
          <span>60°C</span>
          <div className="flex-1 w-3 my-1 rounded" style={{ background: 'linear-gradient(to bottom, #FF0000, #FFFF00, #00FF00, #0000FF)' }}></div>
          <span>20°C</span>
        </div>
      </div>
    </div>
  );
};

export default ThermalPanel;
