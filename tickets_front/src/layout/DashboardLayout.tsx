import { useState } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="min-h-screen bg-gray5 flex">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div className="flex-1">
        <Header title="SG Tickets" />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
