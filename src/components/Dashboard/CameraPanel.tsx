
interface CameraPanelProps {
  jointId: number;
}

const CameraPanel: React.FC<CameraPanelProps> = ({ jointId }) => {
  return (
    <div className="card h-[280px] flex flex-col">
      <div className="px-4 py-2 border-b border-[#D9E1EA] flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 text-sm">Live Camera View (Joint Detection)</h3>
        <span className="text-[10px] font-bold text-danger bg-danger/10 px-1.5 py-0.5 rounded flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse"></div>
          LIVE
        </span>
      </div>
      <div className="flex-1 bg-gray-900 relative overflow-hidden">
        {/* Placeholder for camera feed */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <div className="w-full h-1/3 bg-gray-700 transform -skew-y-6 flex items-center justify-center">
            <div className="w-full h-1/2 bg-gray-600 border-t border-b border-gray-500"></div>
          </div>
        </div>
        
        {/* Detection Box */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/2 h-1/2 border-2 border-danger relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-danger text-white text-xs px-2 py-0.5 rounded font-bold">
              Joint #{jointId}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-2 left-2 text-white/50 text-[10px] font-mono">
          CAMERA FEED - CV-01
        </div>
      </div>
    </div>
  );
};

export default CameraPanel;
