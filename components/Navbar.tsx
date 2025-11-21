import React from 'react';
import { PawPrint, Heart, Search, Home, Stethoscope } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: ViewState.HOME, label: 'Home', icon: Home },
    { id: ViewState.ADOPT, label: 'Adopt', icon: Heart },
    { id: ViewState.MATCHER, label: 'AI Match', icon: Search },
    { id: ViewState.CARE, label: 'Vet Chat', icon: Stethoscope },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-orange-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => setView(ViewState.HOME)}
          >
            <div className="bg-orange-500 p-2 rounded-full group-hover:rotate-12 transition-transform duration-300">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-gray-800 tracking-tight">
              Purrfect<span className="text-orange-500">Companions</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-orange-100 text-orange-600 shadow-sm'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-orange-500'
                }`}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Nav Icon (Simple placeholder) */}
          <div className="md:hidden text-gray-500">
             <PawPrint className="w-6 h-6" />
          </div>
        </div>
        
        {/* Mobile Menu Bar (simplified for this layout) */}
        <div className="md:hidden flex justify-around pb-2 border-t border-gray-100 pt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex flex-col items-center p-2 ${
                  currentView === item.id ? 'text-orange-500' : 'text-gray-400'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-bold mt-1">{item.label}</span>
              </button>
            ))}
        </div>
      </div>
    </nav>
  );
};