'use client';

import ActiveTimer from '@/components/timer/ActiveTimer';
import Dashboard from '@/components/Dashboard';
import ProjectManager from '@/components/ProjectManager';
import { Timer } from 'lucide-react';
import TimeHistory from '@/components/TimeHistory';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Timer size={48} className="text-blue-600" />
            <h1 className="text-5xl font-bold text-gray-800">DevTime</h1>
          </div>
          <p className="text-gray-600 text-lg">
            개발 시간을 추적하고 수익을 계산하세요
          </p>
          <p className="text-gray-300 text-lg">
            현재는 LocalStorage 사용으로 동일 브라우저에서만 프로젝트가 유지됩니다.
          </p>          
          <p className="text-gray-300 text-lg">
            현재는 무료로 제공되며, 동기화 가능한 Pro 버전은 곧 출시할 예정입니다!
          </p>          
          
        </header>

        <Dashboard />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActiveTimer />
          <ProjectManager />
        </div>

        <TimeHistory />
        
        <footer className="mt-12 text-center text-gray-600">
          <p className="mb-2">💡 간단하게 시간을 추적하고 수익을 확인하세요</p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition">
            Pro 버전으로 업그레이드 - ₩9,000/월
          </button>
        </footer>
      </div>
    </main>
  );
}