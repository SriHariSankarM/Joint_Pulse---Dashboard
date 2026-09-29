import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Activity, BarChart3, Bell, Wrench, FileText, Settings, Link as LinkIcon, HeartPulse } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Joint Monitoring', path: '/dashboard', icon: LinkIcon },
  { name: 'Live Data', path: '/live-data', icon: Activity },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Alerts', path: '/alerts', icon: Bell },
  { name: 'Maintenance', path: '/maintenance', icon: Wrench },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="w-[200px] h-screen bg-[#0B1730] text-white flex flex-col fixed left-0 top-0 overflow-y-auto">
      {/* Logo Area */}
      <div className="p-4 flex items-center gap-3">
        <HeartPulse className="text-primary w-8 h-8" />
        <div>
          <h1 className="font-bold text-lg leading-tight tracking-tight">JOINTPULSE</h1>
          <p className="text-[10px] text-gray-400 leading-tight">Conveyor Belt Joint<br/>Health Monitoring</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => twMerge(
              clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                isActive 
                  ? "bg-primary text-white font-medium" 
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              )
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Footer Status */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
          <span className="text-success text-xs font-medium">System Online</span>
        </div>
        <div className="text-xs text-gray-400">
          <p>Last Updated</p>
          <p>25 Sept 2026 10:24:18</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
