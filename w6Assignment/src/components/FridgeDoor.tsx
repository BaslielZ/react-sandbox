import { useDroppable } from "@dnd-kit/core"

interface FridgeDoorProps {
    children: React.ReactNode
}

export function FridgeDoor({children}: FridgeDoorProps){
    const {setNodeRef, isOver} = useDroppable({id: 'fridgeDoor'})
    return (
        <div
        ref={setNodeRef}
        className={`relative border-4 h-[800px] border-dashed rounded-3xl transition-colors ${isOver ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-200'}`}>
            {children}
        </div>
    )
}