import { useState } from 'react';
import { DndContext} from '@dnd-kit/core';
import type {DragEndEvent} from '@dnd-kit/core'
import { Canvas } from './components/Canvas'
import { Sticker } from './components/Sticker'

// --- MAIN APP ---
export default function App() {
  const [items, setItems] = useState<string[]>([]);

  // 1. DND LOGIC: Add item to state when dropped
  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === 'canvas-area') {
      setItems(prev => [...prev, event.active.id as string]);
    }
  };

  // 2. EXTERNAL STATE: Overwrite local state with a "Community Set"
  const loadPreset = () => {
    const mockExternalSet = ['⭐', '💖', '🔥', '🚀']; // Simulated API data
    setItems(mockExternalSet);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-12 min-h-screen bg-slate-50 font-sans">
        
        {/* PRINT CSS: This UI is hidden when printing! */}
        <div className="bg-zinc-800 text-white p-6 mb-8 rounded-2xl flex justify-between items-center shadow-lg print:hidden">
          <div>
            <h1 className="text-xl font-bold">Sticker Sandbox</h1>
            <p className="text-xs text-gray-400 italic">Drag emojis to the box below</p>
          </div>
          <div className="flex gap-4">
             <button onClick={loadPreset} className="bg-amber-500 px-4 py-2 rounded-lg font-bold">Load Preset 📦</button>
             <button onClick={() => window.print()} className="bg-blue-600 px-4 py-2 rounded-lg font-bold">Print Creation 🖨️</button>
          </div>
        </div>

        <div className="flex gap-12 items-start">
          {/* Draggable Drawer (Hidden when printing) */}
          <div className="flex flex-col gap-4 p-4 bg-white rounded-xl shadow print:hidden">
            <Sticker id="⭐" emoji="⭐" />
            <Sticker id="🚀" emoji="🚀" />
            <Sticker id="🔥" emoji="🔥" />
          </div>

          {/* Droppable Canvas (Only this part looks clean on paper) */}
          <div className="flex-1">
             <Canvas>
               {items.length === 0 ? <p className="text-gray-300 font-bold m-auto">Pudota tarroja tähän</p> : 
                items.map((emoji, idx) => <span key={idx} className="text-5xl m-2">{emoji}</span>)}
             </Canvas>
             <p className="text-xs text-gray-400 mt-4 text-center print:hidden">Tip: Press Ctrl+P to see the print view.</p>
          </div>
        </div>

      </div>
    </DndContext>
  );
}