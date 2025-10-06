'use client';

import { useStore } from '@/lib/store';
import { DollarSign, Clock, TrendingUp } from 'lucide-react';
import { formatDuration } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { timeEntries, getTotalEarnings } = useStore();
  
  // 🔥 이 부분이 핵심! 클라이언트에서만 데이터 로드
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 클라이언트에서만 실제 값 계산
  const totalDuration = isClient 
    ? timeEntries.reduce((sum, entry) => sum + entry.duration, 0)
    : 0;
    
  const totalEarnings = isClient ? getTotalEarnings() : 0;
  
  const averageHourlyRate = totalDuration > 0 && isClient
    ? (totalEarnings / (totalDuration / 3600))
    : 0;

  const stats = [
    {
      icon: DollarSign,
      label: '총 수익',
      value: `₩${totalEarnings.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}`,
      color: 'text-green-600'
    },
    {
      icon: Clock,
      label: '총 작업 시간',
      value: formatDuration(totalDuration),
      color: 'text-blue-600'
    },
    {
      icon: TrendingUp,
      label: '평균 시급',
      value: `₩${averageHourlyRate.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}`,
      color: 'text-purple-600'
    }
  ];

  // 로딩 중일 때 표시
  if (!isClient) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
            <div className="h-20"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
            <stat.icon className={stat.color} size={48} />
          </div>
        </div>
      ))}
    </div>
  );
}