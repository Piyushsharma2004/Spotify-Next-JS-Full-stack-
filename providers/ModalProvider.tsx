"use client"; 


import AuthModal from '@/components/AuthModal';
import Modal from '@/components/Modal';
import UploadModal from '@/components/UploadModal';
// import AuthModal from '@/components/AuthModal';
// import UploadModal from '@/components/UploadModal';

import React, { useEffect, useState } from 'react'



const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false); 
// makes sure none of the modals can be seen or opened during serverside rendering 
    useEffect(()=> {
        setIsMounted(true); 

    }, []); 
//"Hey whatever is being rendered now is in server side so just return null for that"
    if (!isMounted) {
        return null; 
    }

  return (
    // All the Modals are going to be run through here 
    <>
      
       
     <AuthModal />
     <UploadModal /> 
      
    </>
  );
}

export default ModalProvider

// Prevent Hydration Errors. Can occur with server side rendering the Use effect 
//trick helps prevent that from happening. 
//Never render a modal if in serverside rendering 

//UseEffects runs and confirms that we are on Client side before showing Modals 