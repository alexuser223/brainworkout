"use client";

import { useState } from "react";
import Link from "next/link";
import { FaCoffee, FaHome, FaBars, FaTimes, FaEnvelope } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 left-0 z-50   bg-gradient-to-r from-green-500 to-green-800  shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Title */}
          <div className="text-2xl font-bold text-white flex items-center">
            <LuBrainCircuit className="bg-red-500 p-1" />
            
            <NavLink href="/" label=" Brain Workout"  />

          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavLink href="/" label="Home" icon={<FaHome />} />
            <NavLink href="/buy-me-a-coffee" label="Buy Me a Coffee" icon={<FaCoffee />} />
            <NavLink href="mailto:mkpcpc28@gmail.com" label="mkpcpc28@gmail.com" icon={<FaEnvelope />} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white text-2xl"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden  bg-gradient-to-r from-green-500 to-green-800 shadow-md py-4">
          <div className="flex flex-col space-y-2 px-4">
            <NavLink href="/" label="Home" icon={<FaHome />} />
            <NavLink href="/buy-me-a-coffee" label="Buy Me a Coffee" icon={<FaCoffee />} />
            <NavLink href="mailto:mkpcpc28@gmail.com" label="mkpcpc28@gmail.com" icon={<FaEnvelope />} />
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ href, label, icon }) => (
  <Link
    href={href}
    className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-300"
  >
    {icon} <span>{label}</span>
  </Link>
);

export default Navbar;
