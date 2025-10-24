//app.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DashboardLayout } from "./layout/DashboardLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { FuncionarioPage } from "./pages/FuncionarioPage";
import { TecnicoPage } from "./pages/TecnicoPage";
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

export default function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
