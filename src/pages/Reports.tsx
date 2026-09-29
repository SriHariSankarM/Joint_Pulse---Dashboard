import { simulationService } from '../services/simulationService';
import { Download } from 'lucide-react';

const Reports = () => {
  const handleExportCSV = () => {
    const joints = simulationService.getJoints();
    const headers = 'ID,Status,HealthIndex,Temperature,Vibration,Load,BeltSpeed,LastDetected\n';
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers 
      + joints.map(j => `${j.id},${j.status},${j.healthIndex},${j.temperature},${j.vibration},${j.load},${j.beltSpeed},${j.lastDetected}`).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `joint_health_report_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-6 text-gray-800">System Reports</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg mb-2">Joint Health Report</h3>
            <p className="text-sm text-gray-600 mb-6">Comprehensive export of all current joint statuses, health indices, and latest sensor readings.</p>
          </div>
          <button onClick={handleExportCSV} className="flex justify-center items-center gap-2 w-full py-2 bg-navy-900 text-white rounded-md text-sm font-medium hover:bg-navy-800 transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        <div className="card p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg mb-2">Maintenance History</h3>
            <p className="text-sm text-gray-600 mb-6">Log of all scheduled and completed maintenance tasks.</p>
          </div>
          <button className="flex justify-center items-center gap-2 w-full py-2 bg-gray-100 text-gray-400 rounded-md text-sm font-medium cursor-not-allowed">
            <Download className="w-4 h-4" /> Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
