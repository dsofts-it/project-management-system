
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Task, TaskStatus } from '../../types';

interface TaskStatusChartProps {
  tasks: Task[];
}

const statusOrder = [
    TaskStatus.BACKLOG,
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.REVIEW,
    TaskStatus.BLOCKED,
    TaskStatus.DONE,
];

const COLORS: { [key in TaskStatus]: string } = {
  [TaskStatus.BACKLOG]: '#64748b', // slate-500
  [TaskStatus.TODO]: '#3b82f6', // blue-500
  [TaskStatus.IN_PROGRESS]: '#a855f7', // purple-500
  [TaskStatus.REVIEW]: '#eab308', // yellow-500
  [TaskStatus.BLOCKED]: '#ef4444', // red-500
  [TaskStatus.DONE]: '#22c55e', // green-500
};

const statusLabels: { [key in TaskStatus]: string } = {
    [TaskStatus.BACKLOG]: 'Backlog',
    [TaskStatus.TODO]: 'To Do',
    [TaskStatus.IN_PROGRESS]: 'In Progress',
    [TaskStatus.REVIEW]: 'Review',
    [TaskStatus.BLOCKED]: 'Blocked',
    [TaskStatus.DONE]: 'Done',
};


const TaskStatusChart: React.FC<TaskStatusChartProps> = ({ tasks }) => {
  const data = statusOrder.map(status => ({
    name: statusLabels[status],
    value: tasks.filter(task => task.status === status).length,
  })).filter(item => item.value > 0);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Tooltip
          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
          labelStyle={{ color: '#cbd5e1' }}
          itemStyle={{ color: '#cbd5e1' }}
        />
        <Legend
            formatter={(value) => <span className="text-slate-300">{value}</span>}
        />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[Object.keys(statusLabels).find(key => statusLabels[key as TaskStatus] === entry.name) as TaskStatus]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TaskStatusChart;
