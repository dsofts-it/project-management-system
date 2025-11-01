import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { fetchTicketsForWorkspace } from '../services/mockApi';
import { Ticket, TicketPriority, TicketStatus } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';

const priorityConfig: { [key in TicketPriority]: { label: string; color: 'gray' | 'blue' | 'yellow' | 'red' | 'purple' } } = {
  [TicketPriority.LOW]: { label: 'Low', color: 'gray' },
  [TicketPriority.MEDIUM]: { label: 'blue', color: 'blue' },
  [TicketPriority.HIGH]: { label: 'High', color: 'yellow' },
  [TicketPriority.CRITICAL]: { label: 'Critical', color: 'red' },
};

const statusConfig: { [key in TicketStatus]: { label: string; color: 'gray' | 'blue' | 'yellow' | 'red' | 'green' | 'purple' } } = {
    [TicketStatus.OPEN]: { label: 'Open', color: 'blue' },
    [TicketStatus.IN_PROGRESS]: { label: 'In Progress', color: 'purple' },
    [TicketStatus.ON_HOLD]: { label: 'On Hold', color: 'yellow' },
    [TicketStatus.RESOLVED]: { label: 'Resolved', color: 'green' },
    [TicketStatus.CLOSED]: { label: 'Closed', color: 'gray' },
};

const TicketsPage: React.FC = () => {
    const { currentWorkspace } = useAppContext();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (!currentWorkspace) return;
            setLoading(true);
            const ticketsData = await fetchTicketsForWorkspace(currentWorkspace.wid);
            setTickets(ticketsData);
            setLoading(false);
        };
        loadData();
    }, [currentWorkspace]);

    if (loading) {
        return <div className="text-center p-8">Loading tickets...</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-100">Helpdesk Tickets</h1>
            <Card>
                <CardHeader>
                    <CardTitle>All Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-400">
                            <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Title</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Priority</th>
                                    <th scope="col" className="px-6 py-3">Assignee</th>
                                    <th scope="col" className="px-6 py-3">Reporter</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map(ticket => (
                                    <tr key={ticket.kid} className="border-b border-slate-700 hover:bg-slate-700/50">
                                        <th scope="row" className="px-6 py-4 font-medium text-slate-50 whitespace-nowrap">
                                            {ticket.title}
                                        </th>
                                        <td className="px-6 py-4">
                                            <Badge color={statusConfig[ticket.status].color}>
                                                {statusConfig[ticket.status].label}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge color={priorityConfig[ticket.priority].color}>
                                                {priorityConfig[ticket.priority].label}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            {ticket.assignedTo ? <Avatar user={ticket.assignedTo} size="sm" /> : <span className="text-slate-500">Unassigned</span>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Avatar user={ticket.createdBy} size="sm" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TicketsPage;
