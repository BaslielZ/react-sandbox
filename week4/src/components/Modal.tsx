interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}


export default function Modal({isOpen, onClose, children}: ModalProps){

    if (!isOpen) return null
    return (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div onClick={(e) => e.stopPropagation()} className="bg-white p-8 rounded-2xl shadow-xl w-96 relative">
                {children}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    close
                </button>
            </div>
        </div>
    )
}