import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Task, User } from '../../types';

interface UserWorkloadChartProps {
    tasks: Task[];
    users: User[];
}

const UserWorkloadChart: React.FC<UserWorkloadChartProps> = ({ tasks, users }) => {
    const data = users.map(user => {
        const assignedTasks = tasks.filter(task =>
            task.assignees.some(assignee => assignee.uid === user.uid)
        );
        return {
            name: user.name.split(' ')[0], // Use first name for brevity
            tasks: assignedTasks.length,
        };
    }).filter(item => item.tasks > 0);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#cbd5e1' }}
                    itemStyle={{ color: '#818cf8' }}
                />
                <Legend formatter={(value) => <span className="text-slate-300 capitalize">{value}</span>} />
                <Bar dataKey="tasks" fill="#6366f1" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default UserWorkloadChart;
