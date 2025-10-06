export interface Project {
  id: string;
  name: string;
  hourlyRate: number;
  color: string;
  createdAt: Date;
}

export interface TimeEntry {
  id: string;
  projectId: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // 초 단위
  earnings: number;
  note?: string;
}

export interface User {
  id: string;
  email: string;
  isPro: boolean;
  projects: Project[];
  timeEntries: TimeEntry[];
}