import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from "@/pages/Login";
import { ProtectedRoute } from "@/routes/ProtectedRoute"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes: Accessible to everyone */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        
        {/* Protected Routes: Require valid authentication token */}
        <Route element={<ProtectedRoute />}>
          {/* Any route placed inside here will trigger the token validation */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}