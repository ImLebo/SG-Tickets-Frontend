import { useState } from "react";
import TecnicoForm from "./components/tecnicoForm.tsx";
import TecnicoList from "./components/tecnicoList.tsx";

function App() {
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 animate-bounce">CRUD de Técnicos</h1>
      <div className="max-w-3xl mx-auto">
        <TecnicoForm onSuccess={handleRefresh} />
        <TecnicoList key={refresh ? "r1" : "r2"} />
      </div>
    </div>
  );
}

export default App;
