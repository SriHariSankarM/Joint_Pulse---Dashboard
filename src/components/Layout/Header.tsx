import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { format } from 'date-fns';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-[#0B1730] text-white py-3 px-6 flex justify-between items-center ml-[200px] shadow-md z-10 sticky top-0">
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold m-0 leading-tight">Real-Time Conveyor Belt Joint Monitoring</h2>
        <div className="flex gap-2 text-sm text-gray-300 mt-1">
          <span>Detect</span><span className="text-gray-500">|</span>
          <span>Analyze</span><span className="text-gray-500">|</span>
          <span>Predict</span><span className="text-gray-500">|</span>
          <span>Prevent</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 bg-white/10 px-4 py-2 rounded-full border border-white/20">
          <div className="flex items-center gap-2 border-r border-white/20 pr-4">
            <div className="w-2.5 h-2.5 rounded-full bg-success"></div>
            <span className="text-sm font-medium">Live Monitoring</span>
          </div>
          <div className="flex gap-4 text-sm font-medium">
            <span>{format(currentTime, 'dd MMM yyyy')}</span>
            <span className="w-16 tabular-nums">{format(currentTime, 'HH:mm:ss')}</span>
          </div>
        </div>

        <div className="relative cursor-pointer">
          <Bell className="w-6 h-6 text-gray-200 hover:text-white transition-colors" />
          <span className="absolute -top-1 -right-1 bg-danger text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-[#0B1730]">
            3
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
