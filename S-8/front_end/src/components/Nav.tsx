import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-indigo-600 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center py-4 px-6">
        {/* LOGO */}
        <div className="text-2xl font-bold text-white tracking-wide">
          <Link to="/">OpenEventRecorder</Link>
        </div>

        {/* BOTÓN HAMBURGUESA (MÓVIL) */}
        <button
          className="lg:hidden text-white text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* MENÚ PRINCIPAL */}
        <ul className="hidden lg:flex gap-6 text-white text-lg font-medium">
          <li>
            <Link to="/" className="hover:text-gray-200 transition">Home</Link>
          </li>
          <li>
            <Link to="/maps" className="hover:text-gray-200 transition">Map</Link>
          </li>
          <li>
            <Link to="/calendar" className="hover:text-gray-200 transition">FullCalendar</Link>
          </li>
          <li>
            <Link to="/charts" className="hover:text-gray-200 transition">Charts</Link>
          </li>
        </ul>
      </div>

      {/* mobile menu */}
      {isOpen && (
        <ul className="lg:hidden flex flex-col items-end p-6 bg-purple-800 text-white py-4 gap-3">
          <li>
            <Link to="/" className="hover:text-gray-200 transition" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/maps" className="hover:text-gray-200 transition" onClick={() => setIsOpen(false)}>Map</Link>
          </li>
          <li>
            <Link to="/calendar" className="hover:text-gray-200 transition" onClick={() => setIsOpen(false)}>FullCalendar</Link>
          </li>
          <li>
            <Link to="/charts" className="hover:text-gray-200 transition" onClick={() => setIsOpen(false)}>Charts</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
