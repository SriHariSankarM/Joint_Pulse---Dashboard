import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Sidebar />
      <Header />
      <main className="ml-[200px] flex-1 p-4 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
