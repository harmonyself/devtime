'use client';

import { useEffect, useState } from 'react';
import { Play, Square } from 'lucide-react';
import { useStore } from '@/lib/store';
import { formatDuration } from '@/lib/utils';

export default function ActiveTimer() {
  const { projects, activeEntry, startTimer, stopTimer } = useStore();
  const [elapsed, setElapsed] = useState(0);
  const [selectedProject, setSelectedProject] = useState('');
  const [isClient, setIsClient] = useState(false);

  // 클라이언트 체크 추가
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!activeEntry) return;
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const start = new Date(activeEntry.startTime).getTime();
      setElapsed(Math.floor((now - start) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [activeEntry]);

  // 로딩 중
  if (!isClient) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
        <div className="h-40"></div>
      </div>
    );
  }

  // 나머지 코드는 그대로...

  const handleStart = () => {
    if (selectedProject) {
      startTimer(selectedProject);
    }
  };

  const currentProject = activeEntry 
    ? projects.find(p => p.id === activeEntry.projectId)
    : null;

  const currentEarnings = currentProject
    ? (elapsed / 3600) * currentProject.hourlyRate
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {!activeEntry ? (
        <div className="space-y-4">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">프로젝트 선택...</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name} (₩{project.hourlyRate.toLocaleString()}/시간)
              </option>
            ))}
          </select>
          
          <button
            onClick={handleStart}
            disabled={!selectedProject}
            className="w-full bg-green-500 text-white p-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-green-600 disabled:opacity-50"
          >
            <Play size={24} />
            시작하기
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-600">
              {currentProject?.name}
            </h3>
            <div className="text-6xl font-bold my-4">
              {formatDuration(elapsed)}
            </div>
            <div className="text-3xl font-bold text-green-600">
              ₩{currentEarnings.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}
            </div>
          </div>
          
          <button
            onClick={stopTimer}
            className="w-full bg-red-500 text-white p-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-red-600"
          >
            <Square size={24} />
            정지
          </button>
        </div>
      )}
    </div>
  );
}