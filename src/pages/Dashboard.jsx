import { Outlet } from "react-router-dom";

import { Header, Sidebar } from "../components";

const Dashboard = () => {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <div className="w-full">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
