import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { queryClient } from './core/query/reactQuery.ts'
import { QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// import HomePage from './features/home/HomePage.tsx'

const HomePage = lazy(() => import('./features/home/HomePage.tsx'))
const WalletPage = lazy(() => import('./features/wallet/WalletPage.tsx'))
const DashboardPage = lazy(()=> import('./features/dashboard/DashboardPage.tsx'))

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    children: [
      {
        element: <HomePage />,
        index: true
      },
      {
        element: <WalletPage />,
        path: 'wallet'
      },
      {
        element: <DashboardPage />,
        path: 'dashboard'
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
