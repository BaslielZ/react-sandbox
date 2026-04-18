import {useDroppable} from '@dnd-kit/core';


// --- B. DROPPABLE AREA ---
export function Canvas({ children }: { children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas-area' });
  return (
    <div 
      ref={setNodeRef} 
      className={`w-full h-80 border-4 border-dashed rounded-3xl flex flex-wrap items-start p-8 transition-colors ${isOver ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-200'}`}
    >
      {children}
    </div>
  );
}
