import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from "@/pages/Login";
import { ProtectedRoute } from "@/routes/ProtectedRoute"
import Register from "@/pages/Register";
import VerificarEmail from "@/pages/VerificarEmail";
import CompleteProfileClient from "@/pages/CompleteProfileClient";
import CompleteProfileProfessional from "@/pages/CompleteProfileProfessional";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes: Accessible to everyone */}
        <Route path="/inicio" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pesquisar" element={<Search />} />
        <Route path="/registrar" element={<Register />} />
        <Route path="/verificar-email" element={<VerificarEmail />} />
        
        {/* Protected Routes: Require valid authentication token */}
        <Route element={<ProtectedRoute />}>
          <Route path="/completar-cadastro" element={<CompleteProfileClient />} />
          <Route path="/completar-cadastro-profissional" element={<CompleteProfileProfessional />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}