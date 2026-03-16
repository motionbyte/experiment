import React from "react";
import { Outlet } from "react-router-dom";
import { SideDrawer } from "../../components/navigation/SideDrawer/SideDrawer";
import { LogoTop } from "../../features/intro/LogoTop/LogoTop";

export const AppShell: React.FC = () => {
  return (
    <div className="app-shell">
      <SideDrawer />
      <LogoTop />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
};

