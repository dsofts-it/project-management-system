import { User, Workspace, Project, Task, TaskPriority, TaskStatus, Ticket, TicketPriority, TicketStatus } from '../types';

export const MOCK_USERS: User[] = [
  { uid: 'u-1', name: 'Alex Johnson', avatarUrl: 'https://picsum.photos/id/1005/100/100' },
  { uid: 'u-2', name: 'Samantha Bee', avatarUrl: 'https://picsum.photos/id/1011/100/100' },
  { uid: 'u-3', name: 'Charlie Davis', avatarUrl: 'https://picsum.photos/id/1025/100/100' },
  { uid: 'u-4', name: 'Dana Scully', avatarUrl: 'https://picsum.photos/id/200/100/100' },
];

export const MOCK_WORKSPACES: Workspace[] = [
  { wid: 'ws-1', name: 'Innovate Inc.' },
  { wid: 'ws-2', name: 'Synergy Labs' },
];

export const MOCK_PROJECTS: Project[] = [
  { pid: 'p-1', wid: 'ws-1', name: 'Phoenix Initiative', key: 'PHX' },
  { pid: 'p-2', wid: 'ws-1', name: 'Odyssey Platform', key: 'ODY' },
  { pid: 'p-3', wid: 'ws-2', name: 'Quantum Leap', key: 'QL' },
];

export const MOCK_TASKS: Task[] = [
    { tid: 't-1', pid: 'p-1', taskNumber: 1, title: 'Design user authentication flow', priority: TaskPriority.CRITICAL, status: TaskStatus.DONE, progress: 100, assignees: [MOCK_USERS[0]], reporter: MOCK_USERS[1] },
    { tid: 't-2', pid: 'p-1', taskNumber: 2, title: 'Develop API endpoints for user profiles', priority: TaskPriority.HIGH, status: TaskStatus.IN_PROGRESS, progress: 60, assignees: [MOCK_USERS[1]], reporter: MOCK_USERS[2] },
    { tid: 't-3', pid: 'p-1', taskNumber: 3, title: 'Setup CI/CD pipeline', priority: TaskPriority.HIGH, status: TaskStatus.IN_PROGRESS, progress: 40, assignees: [MOCK_USERS[2]], reporter: MOCK_USERS[0] },
    { tid: 't-4', pid: 'p-1', taskNumber: 4, title: 'Create landing page mockups', priority: TaskPriority.MEDIUM, status: TaskStatus.TODO, progress: 0, assignees: [MOCK_USERS[3]], reporter: MOCK_USERS[0] },
    { tid: 't-5', pid: 'p-1', taskNumber: 5, title: 'Review and approve brand guidelines', priority: TaskPriority.LOW, status: TaskStatus.REVIEW, progress: 95, assignees: [MOCK_USERS[0]], reporter: MOCK_USERS[1] },
    { tid: 't-6', pid: 'p-1', taskNumber: 6, title: 'Fix login button CSS bug on mobile', priority: TaskPriority.HIGH, status: TaskStatus.BLOCKED, progress: 20, assignees: [MOCK_USERS[1]], reporter: MOCK_USERS[3] },
    { tid: 't-7', pid: 'p-1', taskNumber: 7, title: 'Write documentation for the API', priority: TaskPriority.MEDIUM, status: TaskStatus.BACKLOG, progress: 0, assignees: [], reporter: MOCK_USERS[2] },
    { tid: 't-8', pid: 'p-2', taskNumber: 1, title: 'Research real-time data providers', priority: TaskPriority.HIGH, status: TaskStatus.TODO, progress: 10, assignees: [MOCK_USERS[2]], reporter: MOCK_USERS[0] },
    { tid: 't-9', pid: 'p-2', taskNumber: 2, title: 'Build data ingestion service', priority: TaskPriority.CRITICAL, status: TaskStatus.BACKLOG, progress: 0, assignees: [MOCK_USERS[1]], reporter: MOCK_USERS[0] },
    { tid: 't-10', pid: 'p-3', taskNumber: 1, title: 'Explore quantum computing SDKs', priority: TaskPriority.MEDIUM, status: TaskStatus.IN_PROGRESS, progress: 50, assignees: [MOCK_USERS[3]], reporter: MOCK_USERS[2] },
];

export const MOCK_TICKETS: Ticket[] = [
    { kid: 'tic-1', wid: 'ws-1', pid: 'p-1', title: 'Cannot reset password via email link', createdBy: MOCK_USERS[3], assignedTo: MOCK_USERS[0], priority: TicketPriority.HIGH, status: TicketStatus.IN_PROGRESS, createdAt: '2024-05-20T10:00:00Z' },
    { kid: 'tic-2', wid: 'ws-1', title: 'Feature Request: Dark mode for dashboard', createdBy: MOCK_USERS[2], priority: TicketPriority.MEDIUM, status: TicketStatus.OPEN, createdAt: '2024-05-22T14:30:00Z' },
    { kid: 'tic-3', wid: 'ws-1', pid: 'p-2', title: 'API returning 500 error on /data endpoint', createdBy: MOCK_USERS[1], assignedTo: MOCK_USERS[1], priority: TicketPriority.CRITICAL, status: TicketStatus.ON_HOLD, createdAt: '2024-05-21T09:15:00Z' },
    { kid: 'tic-4', wid: 'ws-2', title: 'UI text overlaps on smaller screens', createdBy: MOCK_USERS[0], priority: TicketPriority.LOW, status: TicketStatus.RESOLVED, createdAt: '2024-05-19T11:00:00Z' },
    { kid: 'tic-5', wid: 'ws-1', title: 'How to export project data?', createdBy: MOCK_USERS[3], assignedTo: MOCK_USERS[0], priority: TicketPriority.LOW, status: TicketStatus.CLOSED, createdAt: '2024-05-18T16:45:00Z' },
];


const apiDelay = 500;

export const authenticateUser = (email: string, pass: string) => {
    return new Promise<boolean>((resolve) => {
        setTimeout(() => {
            // Mock authentication: accept any non-empty credentials
            resolve(!!email && !!pass);
        }, apiDelay);
    });
};

export const fetchDashboardData = (wid: string) => {
  return new Promise<{ projects: Project[], tasks: Task[] }>((resolve) => {
    setTimeout(() => {
      const projects = MOCK_PROJECTS.filter(p => p.wid === wid);
      const projectIds = projects.map(p => p.pid);
      const tasks = MOCK_TASKS.filter(t => projectIds.includes(t.pid));
      resolve({ projects, tasks });
    }, apiDelay);
  });
};

export const fetchProject = (pid: string) => {
    return new Promise<{project: Project | undefined, tasks: Task[]}>((resolve) => {
        setTimeout(() => {
            const project = MOCK_PROJECTS.find(p => p.pid === pid)
            const tasks = MOCK_TASKS.filter(t => t.pid === pid);
            resolve({project, tasks});
        }, apiDelay);
    });
};

export const fetchTicketsForWorkspace = (wid: string) => {
    return new Promise<Ticket[]>((resolve) => {
        setTimeout(() => {
            resolve(MOCK_TICKETS.filter(t => t.wid === wid));
        }, apiDelay);
    });
};