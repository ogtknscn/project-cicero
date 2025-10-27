import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task } from '../../types';
import { TaskCard } from './TaskCard';
import { useStore } from '../../stores/useStore';

interface DraggableBoardViewProps {
  todoTasks: Task[];
  inProgressTasks: Task[];
  doneTasks: Task[];
  onEdit: (task: Task) => void;
}

export const DraggableBoardView = ({
  todoTasks,
  inProgressTasks,
  doneTasks,
  onEdit,
}: DraggableBoardViewProps) => {
  const { updateTask } = useStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      return;
    }
    
    const taskId = active.id as string;
    const overId = over.id as string;
    
    // Only update if dropping in a valid status column
    const validStatuses = ['todo', 'in-progress', 'done'];
    if (validStatuses.includes(overId)) {
      updateTask(taskId, { status: overId as 'todo' | 'in-progress' | 'done' });
    }
    
    setActiveId(null);
  };
  
  const activeTask = [...todoTasks, ...inProgressTasks, ...doneTasks].find(
    (t) => t.id === activeId
  );
  
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Todo Column */}
        <DroppableColumn id="todo" count={todoTasks.length}>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Yapılacaklar ({todoTasks.length})
          </h3>
          <SortableContext
            items={todoTasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
            id="todo"
          >
            <div className="space-y-3 min-h-[200px]">
              {todoTasks.map((task) => (
                <SortableTaskCard key={task.id} task={task} onEdit={onEdit} />
              ))}
            </div>
          </SortableContext>
        </DroppableColumn>
        
        {/* In Progress Column */}
        <DroppableColumn id="in-progress" count={inProgressTasks.length}>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Devam Eden ({inProgressTasks.length})
          </h3>
          <SortableContext
            items={inProgressTasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
            id="in-progress"
          >
            <div className="space-y-3 min-h-[200px]">
              {inProgressTasks.map((task) => (
                <SortableTaskCard key={task.id} task={task} onEdit={onEdit} />
              ))}
            </div>
          </SortableContext>
        </DroppableColumn>
        
        {/* Done Column */}
        <DroppableColumn id="done" count={doneTasks.length}>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Tamamlanan ({doneTasks.length})
          </h3>
          <SortableContext
            items={doneTasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
            id="done"
          >
            <div className="space-y-3 min-h-[200px]">
              {doneTasks.map((task) => (
                <SortableTaskCard key={task.id} task={task} onEdit={onEdit} />
              ))}
            </div>
          </SortableContext>
        </DroppableColumn>
      </div>
      
      <DragOverlay>
        {activeTask && <TaskCard task={activeTask} onEdit={onEdit} />}
      </DragOverlay>
    </DndContext>
  );
};

// Sortable wrapper for TaskCard
const SortableTaskCard = ({ task, onEdit }: { task: Task; onEdit: (task: Task) => void }) => {
  return <TaskCard task={task} onEdit={onEdit} dragId={task.id} />;
};

// Droppable Column component
const DroppableColumn = ({ 
  id, 
  count, 
  children 
}: { 
  id: string; 
  count: number; 
  children: React.ReactNode;
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  
  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col p-4 rounded-lg transition-colors ${
        isOver 
          ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700' 
          : 'bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent'
      }`}
    >
      {children}
      {count === 0 && !isOver && (
        <div className="mt-auto py-8 text-center text-sm text-gray-400 dark:text-gray-500">
          Buraya sürükle
        </div>
      )}
    </div>
  );
};

