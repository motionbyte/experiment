import React from "react";
import { Outlet } from "react-router-dom";
import { SideDrawer } from "../../components/navigation/SideDrawer/SideDrawer";
import { FluidBackground } from "../../components/FluidBackground/FluidBackground";
import { Footer } from "../../components/Footer/Footer";

export const AppShell: React.FC = () => {
  return (
    <div className="app-shell">
      <FluidBackground />
      <SideDrawer />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

