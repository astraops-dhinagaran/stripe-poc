import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './App'
import { PrimeReactProvider } from 'primereact/api';
import { formDesignSystem, tableDesignSystem } from './libs/primereact/formdesignsystem'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import '@xyflow/react/dist/style.css';
import { ReactFlowProvider } from '@xyflow/react'
        

const appDesignSystem = {
  ...formDesignSystem,
  ...tableDesignSystem
}

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactFlowProvider>
        <PrimeReactProvider value={{ unstyled: false, pt: appDesignSystem }}>
          <RouterProvider router={router} />
        </PrimeReactProvider>
      </ReactFlowProvider>
    </QueryClientProvider>
  </StrictMode>,
)
