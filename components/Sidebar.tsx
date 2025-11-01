import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { MOCK_PROJECTS } from '../services/mockApi';
import { useAppContext } from '../context/AppContext';
import { Project } from '../types';
import { HomeIcon, FolderIcon, TicketIcon, ChartBarIcon, ChevronDownIcon, CogIcon, LifebuoyIcon, ArrowLeftOnRectangleIcon } from './icons/Icons';
import Button from './ui/Button';

const Sidebar: React.FC = () => {
    const { currentWorkspace, logout } = useAppContext();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isProjectsExpanded, setIsProjectsExpanded] = useState(true);

    useEffect(() => {
        if (currentWorkspace) {
            const workspaceProjects = MOCK_PROJECTS.filter(p => p.wid === currentWorkspace.wid);
            setProjects(workspaceProjects);
        } else {
            setProjects([]);
        }
    }, [currentWorkspace]);

    const location = useLocation();

    const linkClasses = "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150";
    const inactiveClasses = "text-slate-400 hover:bg-slate-700 hover:text-slate-100";
    const activeClasses = "bg-blue-600 text-white";

    return (
        <aside className="hidden md:flex flex-col w-64 bg-slate-800 border-r border-slate-700">
            <div className="h-16 flex items-center px-6 border-b border-slate-700">
                <Link to="/" className="flex items-center gap-2">
                     <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    <span className="text-xl font-bold text-white">ProjectOps</span>
                </Link>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                {currentWorkspace && <>
                    <NavLink to="/dashboard" className={({ isActive }) => `${linkClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                        <HomeIcon className="w-5 h-5 mr-3" />
                        Dashboard
                    </NavLink>

                    <div className="py-2">
                        <button onClick={() => setIsProjectsExpanded(!isProjectsExpanded)} className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-slate-400 hover:bg-slate-700 rounded-md">
                            <span className="flex items-center"><FolderIcon className="w-5 h-5 mr-3" /> Projects</span>
                            <ChevronDownIcon className={`w-5 h-5 transform transition-transform duration-200 ${isProjectsExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        {isProjectsExpanded && (
                            <div className="mt-2 space-y-1 pl-6">
                                {projects.map(project => (
                                    <NavLink key={project.pid} to={`/projects/${project.pid}`} className={`${linkClasses} py-1.5 ${location.pathname.includes(project.pid) ? activeClasses : inactiveClasses}`}>
                                        <span className="w-2 h-2 mr-4 rounded-full bg-slate-500"></span>
                                        {project.name}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>

                    <NavLink to="/tickets" className={({ isActive }) => `${linkClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                        <TicketIcon className="w-5 h-5 mr-3" />
                        Tickets
                    </NavLink>
                    <NavLink to="/reports" className={({ isActive }) => `${linkClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                        <ChartBarIcon className="w-5 h-5 mr-3" />
                        Reports
                    </NavLink>
                </>}
            </nav>
            <div className="px-4 py-4 border-t border-slate-700 space-y-2">
                 <a href="#settings" className={`${linkClasses} ${inactiveClasses}`}>
                    <CogIcon className="w-5 h-5 mr-3" /> Settings
                 </a>
                 <a href="#support" className={`${linkClasses} ${inactiveClasses}`}>
                    <LifebuoyIcon className="w-5 h-5 mr-3" /> Support
                 </a>
                 <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                    <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" /> Logout
                 </Button>
            </div>
        </aside>
    );
};

export default Sidebar;