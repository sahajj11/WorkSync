import React from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: FolderKanban, label: 'Projects', path: '/projects' },
    { icon: CheckSquare, label: 'My Tasks', path: '/tasks' },
    { icon: Users, label: 'Team', path: '/team' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <aside className="w-64 h-screen bg-[#0f1115] border-r border-gray-800 flex flex-col fixed left-0 top-0 z-50">
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="h-9 w-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
          <span className="text-white font-bold text-xl uppercase">W</span>
        </div>
        <span className="text-xl font-bold text-white tracking-tight">WorkSync</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 mt-4 space-y-1.5">
        <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
          Main Menu
        </p>
        
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                ? 'bg-blue-600/10 text-blue-500' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={isActive ? 'text-blue-500' : 'group-hover:text-gray-200'} />
                <span className="font-medium">{item.label}</span>
              </div>
              {isActive && <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />}
            </button>
          );
        })}
      </nav>

      {/* Footer / Settings & Logout */}
      <div className="p-4 space-y-1.5">
        <button 
          onClick={() => navigate('/settings')}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
        >
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500/80 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};