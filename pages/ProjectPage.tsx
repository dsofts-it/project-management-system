import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProject } from '../services/mockApi';
import { Project, Task, TaskStatus } from '../types';
import TaskCard from '../components/TaskCard';
import Button from '../components/ui/Button';
import { PlusIcon } from '../components/icons/Icons';

const statusColumns: { id: TaskStatus; title: string }[] = [
  { id: TaskStatus.BACKLOG, title: 'Backlog' },
  { id: TaskStatus.TODO, title: 'To Do' },
  { id: TaskStatus.IN_PROGRESS, title: 'In Progress' },
  { id: TaskStatus.REVIEW, title: 'Review' },
  { id: TaskStatus.BLOCKED, title: 'Blocked' },
  { id: TaskStatus.DONE, title: 'Done' },
];

const ProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!projectId) return;
      setLoading(true);
      const { project: projectData, tasks: tasksData } = await fetchProject(projectId);
      setProject(projectData || null);
      setTasks(tasksData);
      setLoading(false);
    };
    loadData();
  }, [projectId]);

  if (loading) {
    return <div className="text-center p-8">Loading project...</div>;
  }

  if (!project) {
    return <div className="text-center p-8 text-red-400">Project not found.</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <header className="mb-6 flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold text-slate-100">{project.name}</h1>
            <p className="text-slate-400">Kanban Board</p>
        </div>
        <Button>
            <PlusIcon className="w-5 h-5 mr-2" />
            New Task
        </Button>
      </header>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 items-start">
        {statusColumns.map(column => (
          <div key={column.id} className="bg-slate-800/80 rounded-lg p-3 h-full">
            <h3 className="font-semibold text-md mb-4 text-slate-200 flex items-center justify-between">
              {column.title}
              <span className="text-sm font-normal bg-slate-700/50 text-slate-300 rounded-full px-2 py-0.5">
                {tasks.filter(task => task.status === column.id).length}
              </span>
            </h3>
            <div className="space-y-4">
              {tasks
                .filter(task => task.status === column.id)
                .map(task => (
                  <TaskCard key={task.tid} task={task} projectKey={project.key} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;