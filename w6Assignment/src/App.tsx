import { DndContext} from "@dnd-kit/core"
import type {DragEndEvent } from "@dnd-kit/core"
import { useMagnetStore } from "./store/useMagnetStore"
import { FridgeDoor } from "./components/FridgeDoor"
import { WordMagnet } from "./components/WordMagnet"
import type { Magnet } from "./types"


export function App(){

  const {updatePosition, updateStatus, magnets, loadPack} = useMagnetStore()

  function handleDragEnd(event: DragEndEvent){
    if (event.over && event.over.id === 'fridgeDoor') {
      const {left: magnetLeft, top: magnetTop} = event.active.rect.current.translated
      const {left: doorLeft, top: doorTop} = event.over.rect

      const left = magnetLeft - doorLeft
      const top = magnetTop - doorTop
      updatePosition(event.active.id as string, left, top)
      
      updateStatus(event.active.id as string, 'fridge')
      console.log(magnets)
    } else {
      // If dropped outside the fridge, move back to bank
      updateStatus(event.active.id as string, 'bank')
      updatePosition(event.active.id as string, null, null)
    }
  }

  const mockWords: Magnet[] = [
    {id: '1', word: 'Roses', status: 'bank', x: null, y: null},
    {id: '2', word: 'Violets', status: 'bank', x: null, y: null},
    {id: '3', word: 'Blue', status: 'bank', x: null, y: null},
    {id: '4', word: 'Red', status: 'bank', x: null, y: null}
  ]

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-4">
        <div className="flex bg-blue-300 p-4 mb-4 rounded-lg justify-between items-center print:hidden ">
          <section>
          <h1 className="text-4xl text-black font-bold">Fridge Poetry</h1>
          <p className="text-gray-600">Drag words into the fridge to create poems!</p>
          </section>
          <section className="flex gap-4">
            <button onClick={() => loadPack(mockWords)} className="bg-blue-700 p-2 rounded text-white font-bold">Load new words</button>
            <button onClick={() => window.print()} className="bg-blue-700 p-2 rounded text-white font-bold">Print Fridge</button>
          </section>
        </div>

        <div className="flex gap-4">
          <div className="w-[50%] p-4 print:hidden bg-teal-300 rounded-lg">
            <h1 className="uppercase text-xl font-bold mb-8 text-center ">Word Bank</h1>
            <div className="flex ">
              {magnets.filter(magnet => magnet.status === 'bank').map(magnet => (
                <WordMagnet key={magnet.id} magnet={magnet} />
              ))}

            </div>
          </div>

          <div className="flex-1">
            <FridgeDoor>
              {magnets.filter(magnet => magnet.status === 'fridge').map(magnet => (
                <WordMagnet key={magnet.id} magnet={magnet} />
              ))}

            </FridgeDoor>
          </div>
        </div>
      </div>
    </DndContext>
  )
}


export default App