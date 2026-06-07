import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from "@/pages/Login";
import { ProtectedRoute } from "@/routes/ProtectedRoute"
import Register from "@/pages/Register";
import VerificarEmail from "@/pages/VerificarEmail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes: Accessible to everyone */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pesquisar" element={<Search />} />
        <Route path="/registrar" element={<Register />} />
        <Route path="/verificar-email" element={<VerificarEmail />} />
        
        
        {/* Protected Routes: Require valid authentication token */}
        <Route element={<ProtectedRoute />}>
          {/* Any route placed inside here will trigger the token validation */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}