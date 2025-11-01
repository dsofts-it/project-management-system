import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { fetchDashboardData, MOCK_USERS } from '../services/mockApi';
import { Task, User } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import TaskStatusChart from '../components/charts/TaskStatusChart';
import UserWorkloadChart from '../components/charts/UserWorkloadChart';

const ReportsPage: React.FC = () => {
    const { currentWorkspace } = useAppContext();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users] = useState<User[]>(MOCK_USERS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (!currentWorkspace) return;
            setLoading(true);
            const data = await fetchDashboardData(currentWorkspace.wid);
            setTasks(data.tasks);
            setLoading(false);
        };
        loadData();
    }, [currentWorkspace]);

    if (loading) {
        return <div className="text-center p-8">Loading reports...</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-100">Reports & Analytics</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Tasks by Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TaskStatusChart tasks={tasks} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>User Workload</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UserWorkloadChart tasks={tasks} users={users} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ReportsPage;
