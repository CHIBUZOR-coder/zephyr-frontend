
import { Buffer } from 'buffer'
window.Buffer = Buffer

import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './core/query/reactQuery.ts'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { WalletProviders } from './features/wallet/WalletProviders.tsx'
import AuthGuard from './features/auth/auth.guard.tsx'
import Dashboard from './features/dashboard/DemoDash.tsx'


// import { SignInPage } from './features/auth/SignInPage.tsx'



// Lazy-loaded pages
// const HomePage = lazy(() => import('./features/home/HomePage.tsx'))
const WalletPage = lazy(() => import('./features/wallet/WalletPage.tsx'))
const VaultPage = lazy(() => import('./features/vault/VaultPage.tsx'))

// const SignInPage = lazy(()=> import('./features/auth/SignInPage.tsx'))

// const SignInPage= lazy(() => import('./features/auth/SignInPage.tsx'))
// const SignInPage = lazy(()=> import('./features/auth/SignInPage.tsx'))
const DashboardPage = lazy(
  () => import('./features/dashboard/DashboardPage.tsx')
)

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    children: [
      // { index: true, element: <HomePage /> },
      { path: 'wallet', element: <WalletPage /> },
       { path: 'vaults/create', element: <VaultPage /> },
      { path: 'demo', element: <Dashboard /> },

      // 🔐 PROTECTED ROUTES
      {
        element: <AuthGuard />,
        children: [{ path: '/', element: <DashboardPage /> }]
      }
    ]
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletProviders>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </WalletProviders>
  </StrictMode>
)
