'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useStore } from '@/lib/store';
import { generateId, colors } from '@/lib/utils';

export default function ProjectManager() {
  const { projects, addProject, deleteProject } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    hourlyRate: 50000
  });

  const handleAdd = () => {
    if (!newProject.name || newProject.hourlyRate <= 0) return;
    
    addProject({
      id: generateId(),
      name: newProject.name,
      hourlyRate: newProject.hourlyRate,
      color: colors[projects.length % colors.length],
      createdAt: new Date()
    });
    
    setNewProject({ name: '', hourlyRate: 50000 });
    setIsAdding(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">프로젝트</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
        >
          <Plus size={20} />
          추가
        </button>
      </div>

      {isAdding && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-3">
          <input
            type="text"
            placeholder="프로젝트 이름"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="시간당 요율 (원)"
            value={newProject.hourlyRate}
            onChange={(e) => setNewProject({ ...newProject, hourlyRate: Number(e.target.value) })}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleAdd}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            저장
          </button>
        </div>
      )}

      <div className="space-y-2">
        {projects.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            프로젝트를 추가해주세요
          </p>
        ) : (
          projects.map(project => (
            <div
              key={project.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              style={{ borderLeftColor: project.color, borderLeftWidth: '4px' }}
            >
              <div>
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-sm text-gray-600">
                  ₩{project.hourlyRate.toLocaleString()}/시간
                </p>
              </div>
              <button
                onClick={() => deleteProject(project.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}