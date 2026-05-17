import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '@/pages/Home'
import Search from '@/pages/Search'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}