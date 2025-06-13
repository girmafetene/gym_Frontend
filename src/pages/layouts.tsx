// src/layouts/RootLayout.tsx
import SideNav from "../components/SideNav";
import Header from "../components/header";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="p-4">
          <Outlet /> {/* This renders the child routes */}
        </main>
      </div>
    </div>
  );
}