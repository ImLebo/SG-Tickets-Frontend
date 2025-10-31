//src/layout/DashboardLayout.tsx
import { useState, useEffect } from "react";
import { Navbar } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  onChangeView?: (view: "crear" | "listar") => void;
}

export function DashboardLayout({ children, onChangeView }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-500">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        darkMode={darkMode}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-500 ${
          collapsed ? "ml-0 md:pl-6" : "md:pl-8"
        }`}
      >
        <Navbar
          title="Panel Técnico"
          onChangeView={onChangeView ?? ((view: "crear" | "listar") => {})}
          onToggleDark={() => setDarkMode((d) => !d)}
          darkMode={darkMode}
        />

        <main className="p-6 flex-1 overflow-y-auto">
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-100/30 via-transparent to-transparent dark:from-indigo-500/10 dark:via-transparent dark:to-transparent opacity-50"
            />
            <div className="relative z-10">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
