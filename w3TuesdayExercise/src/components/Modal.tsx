interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

export function Modal({isOpen, onClose, children}: ModalProps){
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
                    <div onClick={(e) => e.stopPropagation()} className="bg-white rounded w-[30%] p-5">
                        {children}  
                    </div>
                </div>
            )}
        </>
    )
    
}

export default Modal