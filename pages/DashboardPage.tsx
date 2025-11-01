import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { fetchDashboardData } from '../services/mockApi';
import { Project, Task, TaskStatus } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import TaskStatusChart from '../components/charts/TaskStatusChart';
import { FolderIcon, CheckCircleIcon, ArrowPathIcon, ExclamationTriangleIcon } from '../components/icons/Icons';

const DashboardPage: React.FC = () => {
  const { currentUser, currentWorkspace } = useAppContext();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!currentWorkspace) return;
      setLoading(true);
      const data = await fetchDashboardData(currentWorkspace.wid);
      setProjects(data.projects);
      setTasks(data.tasks);
      setLoading(false);
    };
    loadData();
  }, [currentWorkspace]);

  if (loading || !currentUser || !currentWorkspace) {
    return <div className="text-center p-8">Loading dashboard...</div>;
  }
  
  const getTasksForProject = (pid: string) => tasks.filter(t => t.pid === pid);
  const tasksInProgress = tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length;
  const tasksDone = tasks.filter(t => t.status === TaskStatus.DONE).length;
  const tasksBlocked = tasks.filter(t => t.status === TaskStatus.BLOCKED).length;


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-100">Welcome back, {currentUser.name}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Total Projects</CardTitle>
                <FolderIcon className="w-6 h-6 text-slate-400" />
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold">{projects.length}</div>
                <p className="text-xs text-slate-400">in {currentWorkspace.name}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Tasks In Progress</CardTitle>
                <ArrowPathIcon className="w-6 h-6 text-blue-400" />
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold">{tasksInProgress}</div>
                 <p className="text-xs text-slate-400">Across all projects</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Completed Tasks</CardTitle>
                <CheckCircleIcon className="w-6 h-6 text-green-400" />
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold">{tasksDone}</div>
                 <p className="text-xs text-slate-400">This week</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Blocked Tasks</CardTitle>
                <ExclamationTriangleIcon className="w-6 h-6 text-red-400" />
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold">{tasksBlocked}</div>
                 <p className="text-xs text-slate-400">Needs attention</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>My Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map(project => {
              const projectTasks = getTasksForProject(project.pid);
              const completed = projectTasks.filter(t => t.status === TaskStatus.DONE).length;
              const total = projectTasks.length;
              const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

              return (
                <Link to={`/projects/${project.pid}`} key={project.pid} className="block p-4 rounded-md bg-slate-700/50 hover:bg-slate-700 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-white">{project.name}</h4>
                    <span className="text-sm text-slate-300">{completed}/{total} tasks</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                  </div>
                </Link>
              );
            })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tasks by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskStatusChart tasks={tasks} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;