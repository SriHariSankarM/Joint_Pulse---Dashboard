import { Link2, CheckCircle2, AlertTriangle, AlertCircle, Gauge, Settings2 } from 'lucide-react';
import type {  Joint  } from '../../types';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  iconColorClass: string;
  borderColorClass: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, subtitle, icon: Icon, iconColorClass, borderColorClass }) => (
  <div className={`card flex items-center p-4 border-l-4 ${borderColorClass} flex-1 min-w-0`}>
    <div className={`p-3 rounded-full ${iconColorClass} bg-opacity-10 mr-4 shrink-0`}>
      <Icon className={`w-8 h-8 ${iconColorClass.replace('bg-', 'text-')}`} />
    </div>
    <div className="flex-1 min-w-0 overflow-hidden">
      <h3 className="text-sm font-semibold text-gray-700 truncate">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-navy-900 truncate">{value}</span>
      </div>
      {subtitle && <p className="text-xs text-gray-500 font-medium mt-0.5 truncate">{subtitle}</p>}
    </div>
  </div>
);

interface KpiRowProps {
  joints: Joint[];
  speed: number;
}

const KpiRow: React.FC<KpiRowProps> = ({ joints, speed }) => {
  const total = joints.length;
  const healthy = joints.filter(j => j.status === 'Normal').length;
  const degrading = joints.filter(j => j.status === 'Degrading').length;
  const critical = joints.filter(j => j.status === 'Critical').length;

  return (
    <div className="flex gap-4">
      <KpiCard 
        title="Total Joints" 
        value={total} 
        subtitle="Monitored" 
        icon={Link2} 
        iconColorClass="bg-primary text-primary" 
        borderColorClass="border-l-primary" 
      />
      <KpiCard 
        title="Healthy Joints" 
        value={healthy} 
        subtitle={`(${Math.round((healthy/total)*100)}%)`} 
        icon={CheckCircle2} 
        iconColorClass="bg-success text-success" 
        borderColorClass="border-l-success" 
      />
      <KpiCard 
        title="Degrading Joints" 
        value={degrading} 
        subtitle={`(${Math.round((degrading/total)*100)}%)`} 
        icon={AlertTriangle} 
        iconColorClass="bg-warning text-warning" 
        borderColorClass="border-l-warning" 
      />
      <KpiCard 
        title="Critical Joints" 
        value={critical} 
        subtitle={`(${Math.round((critical/total)*100)}%)`} 
        icon={AlertCircle} 
        iconColorClass="bg-danger text-danger" 
        borderColorClass="border-l-danger" 
      />
      <KpiCard 
        title="Belt Speed" 
        value={speed.toFixed(1)} 
        subtitle="m/s" 
        icon={Gauge} 
        iconColorClass="bg-accent text-accent" 
        borderColorClass="border-l-accent" 
      />
      <KpiCard 
        title="System Health" 
        value="Good" 
        subtitle="All Sensors Active" 
        icon={Settings2} 
        iconColorClass="bg-teal-500 text-teal-500" 
        borderColorClass="border-l-teal-500" 
      />
    </div>
  );
};

export default KpiRow;
