import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from './auth.store'

export default function AuthGuard () {
  const authenticated = useAuthStore(s => s.authenticated)

  if (!authenticated) {
    return <Navigate to='/' replace />
  }

  return <Outlet />
}
