// import React, { useRef } from 'react'

import { useEffect, useState } from 'react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'


import { useAuthStore } from '../auth/auth.store'
import { useWalletMismatch } from '../../core/hooks/useWalletMismatch'
import type { UserProfile } from '../users/user.types'
import StateScreen from '../../shared/components/StateScreen'
import { useAuthReady } from '../auth/useAuthReady'
//


import Loader from '../../shared/Loader'

const Dashboard: React.FC = () => {
  // const { publicKey, connected } = useWallet()

  const authReady = useAuthReady()
  const { accessToken } = useAuthStore()
  const mismatch = useWalletMismatch()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const API_BASE = 'https://zephyr-np09.onrender.com'
  // const API_BASE = 'https://e621-102-90-98-17.ngrok-free.app'

  useEffect(() => {
    if (!authReady) return
    if (!accessToken) return
    if (profile) return

    let cancelled = false

    const fetchMe = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(`${API_BASE}/api/auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'ngrok-skip-browser-warning': 'true'
          }
        })

        const contentType = res.headers.get('content-type')

        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || 'Unauthorized')
        }

        if (!contentType?.includes('application/json')) {
          const text = await res.text()
          throw new Error(`Expected JSON, got: ${text.slice(0, 200)}`)
        }

        const data = await res.json()

        if (!cancelled) {
          setProfile(data.user)
        }
      } catch (err) {
        console.error('❌ /auth/me failed:', err)
        if (!cancelled) {
          setError('Failed to load profile')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchMe()

    return () => {
      cancelled = true
    }
  }, [authReady, accessToken, profile])

  // useEffect(() => {
  //   if (!publicKey) {
  //     setBalance(null)
  //     return
  //   }

  //   (async () => {
  //     const lamports = await connection.getBalance(publicKey)
  //     setBalance(lamports / LAMPORTS_PER_SOL)
  //   })()
  // }, [publicKey, connection])

  // const prevRef = useRef<HTMLButtonElement | null>(null)
  // const nextRef = useRef<HTMLButtonElement | null>(null)

  if (!authReady) {
    return (
      <StateScreen
        title='Restoring session…'
        description='Please wait a moment'
      />
    )
  }

  // if (!accessToken) {
  //   return (
  //     <StateScreen
  //       title='Not authenticated'
  //       description='Please sign in again.'
  //       tone='error'
  //     />
  //   )
  // }

  if (mismatch) {
    return (
      <StateScreen
        title='Wallet mismatch detected'
        description='Please reconnect the wallet you signed in with.'
        tone='error'
      />
    )
  }

  if (loading) {
    return <StateScreen title='Loading profile…' action={<Loader />} />
  }

  if (error) {
    return <StateScreen title='Error' description={error} tone='error' />
  }

  return (
    <div className='min-h-screen bg-[#050A0A] text-gray-200 block md:flex '></div>
  )
}

export default Dashboard
