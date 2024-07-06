import {create} from "zustand";

interface UPloadModalStore{ 
    isOpen: boolean; 
    onOpen: () => void; 
    onClose: () => void; 
}

const useUPloadModal = create<UPloadModalStore>((set) => ({
    isOpen: false, 
    onOpen: () => set({isOpen: true }),
    onClose: () => set({isOpen: false }),
}))

export default useUPloadModal; 