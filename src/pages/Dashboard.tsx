import { useState, useEffect } from 'react';
import KpiRow from '../components/Dashboard/KpiRow';
import CameraPanel from '../components/Dashboard/CameraPanel';
import ThermalPanel from '../components/Dashboard/ThermalPanel';
import SensorReadings from '../components/Dashboard/SensorReadings';
import BeltJointMap from '../components/Dashboard/BeltJointMap';
import JointHealthChart from '../components/Dashboard/JointHealthChart';
import RecentDetections from '../components/Dashboard/RecentDetections';
import AlertsPanel from '../components/Dashboard/AlertsPanel';
import MaintenancePanel from '../components/Dashboard/MaintenancePanel';
import JointDetailModal from '../components/Dashboard/JointDetailModal';
import { simulationService } from '../services/simulationService';
import type {  Joint  } from '../types';

const Dashboard = () => {
  const [joints, setJoints] = useState<Joint[]>([]);
  const [selectedJointId, setSelectedJointId] = useState<number>(12);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    // Initial fetch
    setJoints(simulationService.getJoints());

    // Setup polling for simulated real-time data
    const timer = setInterval(() => {
      simulationService.updateSimulation();
      setJoints(simulationService.getJoints());
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const selectedJoint = joints.find(j => j.id === selectedJointId) || joints[0];

  if (!selectedJoint) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">


      <KpiRow joints={joints} speed={selectedJoint.beltSpeed} />
      
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4 h-full">
          <CameraPanel jointId={selectedJointId} />
        </div>
        <div className="col-span-4 h-full">
          <ThermalPanel joint={selectedJoint} />
        </div>
        <div className="col-span-4 h-full">
          <SensorReadings joint={selectedJoint} readings={simulationService.getSensorReadings()} />
        </div>
      </div>

      <BeltJointMap 
        joints={joints} 
        selectedId={selectedJointId} 
        onSelect={(id) => setSelectedJointId(id)} 
      />

      <JointHealthChart jointId={selectedJointId} />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <RecentDetections onInspect={(id) => {
            setSelectedJointId(id);
            setIsModalOpen(true);
          }} />
        </div>
        <div className="col-span-3">
          <AlertsPanel alerts={simulationService.getAlerts()} />
        </div>
        <div className="col-span-3">
          <MaintenancePanel maintenance={simulationService.getMaintenance()} />
        </div>
      </div>

      {isModalOpen && (
        <JointDetailModal 
          joint={selectedJoint} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default Dashboard;
