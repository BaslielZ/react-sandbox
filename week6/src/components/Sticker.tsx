import {useDraggable} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';


// --- A. DRAGGABLE ITEM ---
export function Sticker({ id, emoji }: { id: string, emoji: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <div 
      ref={setNodeRef} style={style} {...listeners} {...attributes} 
      className={`text-4xl p-2 cursor-grab active:cursor-grabbing transition-opacity ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      {emoji}
    </div>
  );
}