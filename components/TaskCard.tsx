import React from 'react';
import { Task, TaskPriority } from '../types';
import Badge from './ui/Badge';
import Avatar from './ui/Avatar';

interface TaskCardProps {
  task: Task;
  projectKey: string;
}

const priorityConfig: { [key in TaskPriority]: { label: string; color: 'gray' | 'blue' | 'yellow' | 'red' | 'purple' } } = {
  [TaskPriority.LOW]: { label: 'Low', color: 'gray' },
  [TaskPriority.MEDIUM]: { label: 'Medium', color: 'blue' },
  [TaskPriority.HIGH]: { label: 'High', color: 'yellow' },
  [TaskPriority.CRITICAL]: { label: 'Critical', color: 'red' },
};

const TaskCard: React.FC<TaskCardProps> = ({ task, projectKey }) => {
  const { label, color } = priorityConfig[task.priority];

  return (
    <div className="bg-slate-700/50 p-3 rounded-md border border-slate-600/50 hover:bg-slate-700 hover:border-slate-600 transition-all cursor-pointer">
      <p className="text-sm text-slate-100 font-medium mb-2">{task.title}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
           <Badge color={color}>{label}</Badge>
           <span className="text-xs font-mono text-slate-400">{projectKey}-{task.taskNumber}</span>
        </div>
        <div className="flex -space-x-2">
          {task.assignees.map(user => (
            <Avatar key={user.uid} user={user} size="sm" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;