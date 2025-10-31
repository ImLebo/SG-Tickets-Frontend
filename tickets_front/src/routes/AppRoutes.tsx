//src/routes/AppRoutes.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { FuncionarioPage } from "../pages/FuncionarioPage";
import { TecnicoPage } from "../pages/TecnicoPage";
import { DashboardLayout } from "../layout/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function HomeRouter() {
  const { user } = useAuth();
  const [view, setView] = useState<"listar" | "crear">("listar");

  if (!user) return <div />;
  if (user.role === "tecnico") return <TecnicoPage />;

  return (
    <DashboardLayout onChangeView={setView}>
      <FuncionarioPage view={view} onChangeView={setView} />
    </DashboardLayout>
  );
}

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <HomeRouter />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
