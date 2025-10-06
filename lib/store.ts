import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project, TimeEntry } from '@/types';

interface AppState {
  projects: Project[];
  timeEntries: TimeEntry[];
  activeEntry: TimeEntry | null;
  
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  
  startTimer: (projectId: string) => void;
  stopTimer: () => void;
  addTimeEntry: (entry: TimeEntry) => void;
  
  getTotalEarnings: () => number;
  getProjectEarnings: (projectId: string) => number;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      projects: [],
      timeEntries: [],
      activeEntry: null,
      
      addProject: (project) => 
        set((state) => ({ projects: [...state.projects, project] })),
        
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter(p => p.id !== id),
          timeEntries: state.timeEntries.filter(e => e.projectId !== id)
        })),
        
      startTimer: (projectId) => {
        const project = get().projects.find(p => p.id === projectId);
        if (!project) return;
        
        const entry: TimeEntry = {
          id: Date.now().toString(),
          projectId,
          startTime: new Date(),
          duration: 0,
          earnings: 0
        };
        
        set({ activeEntry: entry });
      },
      
      stopTimer: () => {
        const active = get().activeEntry;
        if (!active) return;
        
        const endTime = new Date();
        // 🔥 new Date()로 감싸서 Date 객체로 변환!
        const duration = Math.floor((endTime.getTime() - new Date(active.startTime).getTime()) / 1000);
        const project = get().projects.find(p => p.id === active.projectId);
        const earnings = project ? (duration / 3600) * project.hourlyRate : 0;
        
        const completedEntry: TimeEntry = {
          ...active,
          endTime,
          duration,
          earnings
        };
        
        set((state) => ({
          timeEntries: [...state.timeEntries, completedEntry],
          activeEntry: null
        }));
      },
      
      addTimeEntry: (entry) =>
        set((state) => ({ timeEntries: [...state.timeEntries, entry] })),
        
      getTotalEarnings: () => {
        return get().timeEntries.reduce((sum, entry) => sum + entry.earnings, 0);
      },
      
      getProjectEarnings: (projectId) => {
        return get().timeEntries
          .filter(e => e.projectId === projectId)
          .reduce((sum, entry) => sum + entry.earnings, 0);
      }
    }),
    {
      name: 'devtime-storage',
    }
  )
);