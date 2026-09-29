import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { simulationService } from '../../services/simulationService';

interface JointHealthChartProps {
  jointId: number;
}

const JointHealthChart: React.FC<JointHealthChartProps> = ({ jointId }) => {
  const data = simulationService.getHistory(jointId);

  return (
    <div className="card p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800 text-sm">Joint Health Trends – Joint #{jointId}</h3>
        <div className="flex gap-2">
          {['1H', '6H', '24H', '7D'].map((span) => (
            <button 
              key={span}
              className={`text-xs px-2 py-1 rounded font-medium transition-colors ${span === '1H' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {span}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} />
            <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} domain={['dataMin - 5', 'dataMax + 5']} />
            <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} domain={[0, 600]} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              labelStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#0F172A' }}
              itemStyle={{ fontSize: '12px' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} iconType="circle" iconSize={8} />
            <Line yAxisId="left" type="monotone" dataKey="temperature" name="Temperature (°C)" stroke="#DC2626" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
            <Line yAxisId="left" type="monotone" dataKey="vibration" name="Vibration (g)" stroke="#1677FF" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
            <Line yAxisId="right" type="monotone" dataKey="load" name="Load (kg)" stroke="#16A34A" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default JointHealthChart;
