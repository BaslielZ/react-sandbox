import { useDraggable } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';
import type { Magnet } from "../types";

interface WordMagnetProps {
    magnet: Magnet
}

export function WordMagnet({ magnet }: WordMagnetProps){
    const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({ id: magnet.id })
    const style = { 
        transform: CSS.Translate.toString(transform),
        ...(magnet.status === 'fridge' && magnet.x !== null && magnet.y !== null && {
            position: 'absolute',
            left: `${magnet.x}px`,
            top: `${magnet.y}px`
        })
    } as React.CSSProperties

    return (
        <div
        ref={setNodeRef} {...attributes} {...listeners} style={style}
        className={`cursor-grab p-2 z-1000 rounded-md text-3xl font-bold active:cursor-grabbing transition-opacity ${isDragging ? 'opacity-50' : 'opacity-100'}`}  >
            <span className="text-lg bg-blue-200 p-4 rounded-md">{magnet.word}</span>
        </div>
    )
}