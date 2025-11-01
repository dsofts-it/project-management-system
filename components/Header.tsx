import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { ChevronUpDownIcon, BellIcon, MagnifyingGlassIcon } from './icons/Icons';
import Avatar from './ui/Avatar';

const Header: React.FC = () => {
  const { currentUser, currentWorkspace, workspaces, switchWorkspace } = useAppContext();
  const [isWorkspaceDropdownOpen, setWorkspaceDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const workspaceDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (workspaceDropdownRef.current && !workspaceDropdownRef.current.contains(event.target as Node)) {
        setWorkspaceDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentUser || !currentWorkspace) {
    return null; // Don't render header if not logged in
  }

  return (
    <header className="h-16 flex-shrink-0 flex items-center justify-between px-4 md:px-6 bg-slate-800 border-b border-slate-700">
      <div className="flex items-center space-x-4">
        {/* Workspace Switcher */}
        <div className="relative" ref={workspaceDropdownRef}>
          <button onClick={() => setWorkspaceDropdownOpen(!isWorkspaceDropdownOpen)} className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-700 transition-colors">
            <span className="font-semibold text-white">{currentWorkspace.name}</span>
            <ChevronUpDownIcon className="w-5 h-5 text-slate-400" />
          </button>
          {isWorkspaceDropdownOpen && (
            <div className="absolute top-full mt-2 w-64 bg-slate-700 rounded-md shadow-lg z-10 border border-slate-600">
              <ul className="p-2">
                {workspaces.map(ws => (
                  <li key={ws.wid}>
                    <button onClick={() => { switchWorkspace(ws.wid); setWorkspaceDropdownOpen(false); }} className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-slate-600 transition-colors">
                      {ws.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks, projects..."
            className="bg-slate-700 border border-slate-600 rounded-md pl-10 pr-4 py-2 w-40 md:w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button className="p-2 rounded-full hover:bg-slate-700 transition-colors">
          <BellIcon className="w-6 h-6 text-slate-400" />
        </button>

        {/* User Menu */}
        <div className="relative" ref={userDropdownRef}>
          <button onClick={() => setUserDropdownOpen(!isUserDropdownOpen)}>
            <Avatar user={currentUser} />
          </button>
          {isUserDropdownOpen && (
             <div className="absolute top-full right-0 mt-2 w-48 bg-slate-700 rounded-md shadow-lg z-10 border border-slate-600">
               <div className="p-2 border-b border-slate-600">
                 <p className="text-sm font-semibold">{currentUser.name}</p>
                 <p className="text-xs text-slate-400">Workspace Member</p>
               </div>
              <ul className="p-2">
                 <li><a href="#profile" className="block px-3 py-2 text-sm rounded-md hover:bg-slate-600">Profile</a></li>
                 <li><a href="#settings" className="block px-3 py-2 text-sm rounded-md hover:bg-slate-600">Settings</a></li>
                 <li><a href="#logout" className="block px-3 py-2 text-sm rounded-md hover:bg-slate-600 text-red-400">Log out</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;