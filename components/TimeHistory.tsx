'use client';

import { useStore } from '@/lib/store';
import { formatDuration } from '@/lib/utils';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function TimeHistory() {
  const { timeEntries, projects } = useStore();
  
  const sortedEntries = [...timeEntries].sort((a, b) => 
    new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">작업 기록</h2>
      
      {sortedEntries.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          아직 작업 기록이 없습니다
        </p>
      ) : (
        <div className="space-y-2">
          {sortedEntries.slice(0, 10).map((entry) => {
            const project = projects.find(p => p.id === entry.projectId);
            
            return (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h3 className="font-semibold">{project?.name}</h3>
                  <p className="text-sm text-gray-600">
                    {format(new Date(entry.startTime), 'PPP p', { locale: ko })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">
                    ₩{entry.earnings.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatDuration(entry.duration)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}