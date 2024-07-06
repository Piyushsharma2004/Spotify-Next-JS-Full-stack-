"use client"
import { 
    useSupabaseClient, 
    useSessionContext 
       } from '@supabase/auth-helpers-react'
import Modal from './Modal'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import useAuthModal from "@/hooks/useAuthModal"


const AuthModal = () => {


    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const {session} = useSessionContext();
    const { onClose, isOpen} = useAuthModal();
    
    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();  
        }
    }, [session, router, onClose ])




    const onChange = (open: boolean) => { 
        if (!open) {
            onClose(); 
        }

    }

  return (
    <Modal
       title="Welcome Back"
       description='Login to your account'
       isOpen={isOpen}
       onChange={onChange}
    >AuthModal children
    <Auth
    theme="dark"
    // providers can limit the numbers of AUTH so limit it to Google, Azure, github 
    providers={["github","google"]} 
    //magic link allows an email tp be submitted and then a link sent to the email
    magicLink
    supabaseClient={supabaseClient}
    appearance={{
        theme:ThemeSupa,
        variables:{
        default: {
        colors:{
            brand:"#404040",
            brandAccent: '#22c55e'
        }
        }    
        }
    }}
    
        
    
    /> 

    </Modal>
  )
}

export default AuthModal