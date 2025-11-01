export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum TaskStatus {
  BACKLOG = 'backlog',
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  BLOCKED = 'blocked',
  REVIEW = 'review',
  DONE = 'done',
}

export enum TicketPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    CRITICAL = 'critical',
}

export enum TicketStatus {
    OPEN = 'open',
    IN_PROGRESS = 'in_progress',
    ON_HOLD = 'on_hold',
    RESOLVED = 'resolved',
    CLOSED = 'closed',
}

export interface User {
  uid: string;
  name: string;
  avatarUrl?: string;
}

export interface Workspace {
  wid: string;
  name: string;
}

export interface Project {
  pid: string;
  wid: string;
  name: string;
  key: string;
}

export interface Task {
  tid: string;
  pid: string;
  taskNumber: number;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  progress: number;
  assignees: User[];
  reporter: User;
}

export interface Ticket {
    kid: string;
    wid: string;
    pid?: string;
    title: string;
    createdBy: User;
    assignedTo?: User;
    priority: TicketPriority;
    status: TicketStatus;
    createdAt: string;
}