import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './core/query/reactQuery.ts'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { WalletProviders } from './features/wallet/WalletProviders.tsx'

// Lazy-loaded pages
const HomePage = lazy(() => import('./features/home/HomePage.tsx'))
const WalletPage = lazy(() => import('./features/wallet/WalletPage.tsx'))
const DashboardPage = lazy(
  () => import('./features/dashboard/DashboardPage.tsx')
)

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    children: [
      { index: true, element: <HomePage /> },
      { path: 'wallet', element: <WalletPage /> },
      { path: 'dashboard', element: <DashboardPage /> }
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
