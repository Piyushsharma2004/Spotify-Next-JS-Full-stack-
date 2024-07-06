'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { useUser } from '@/hooks/useUser'
import { postData } from '@/libs/helpers'
import Button from '@/components/Button'
import Image from 'next/image'

const AccountContent = () => {
  const router = useRouter()
  const { isLoading, subscription, user } = useUser()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/')
    }
  }, [isLoading, router, user])

  const redirectToCostumerPortal = async () => {
    setLoading(true)

    try {
      const { url, error } = await postData({
        url: '/api/create-portal-link'
      })

      window.location.assign(url)
    } catch (error) {
      if (error) {
        toast.error((error as Error).message)
      }
    }
    setLoading(false)
  }

  return (
    <div className="mb-7 px-6">
      {!subscription && (
        <div className="flex flex-col gap-y-4">
         <Image alt="logo" src={'/images/avatar2.png'} width={230} height={230} className="px-4" />
          <h1> Developer: Piyush Sharma </h1>
          <h1 className='text-2xl font-bold'>User Plan Details</h1>
          <p>No active plan.</p>
          <Button
           
            className="w-[300px]"
          >
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>
            You are currently on the <b>{subscription?.prices?.products?.name}</b> plan.
          </p>
          <Button
            className="w-[300px]"
            disabled={loading || isLoading}
            onClick={redirectToCostumerPortal}
          >
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  )
}

export default AccountContent
