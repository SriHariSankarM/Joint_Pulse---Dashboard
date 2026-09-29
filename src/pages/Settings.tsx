
const Settings = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-6 text-gray-800">System Settings</h2>
      
      <div className="space-y-6">
        <div className="card p-6">
          <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">System</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Conveyor ID</label>
              <input type="text" value="CV-01" readOnly className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-700" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Monitoring Status</label>
              <select className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-700">
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Alert Thresholds</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Temperature Warning (°C)</label>
              <input type="number" defaultValue={40} className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-700" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Temperature Critical (°C)</label>
              <input type="number" defaultValue={45} className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-700" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Vibration Warning (g)</label>
              <input type="number" step={0.1} defaultValue={0.9} className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-700" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Vibration Critical (g)</label>
              <input type="number" step={0.1} defaultValue={1.2} className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-700" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
export default Settings;
