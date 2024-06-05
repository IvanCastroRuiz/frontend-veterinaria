import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './app/auth/context/AuthProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { EmpleadosProvider } from './app/empleados/context/EmpleadosProvider.tsx'
import { ClientesProvider } from './app/clientes/context/ClientesProvider.tsx'
import { MascotasProvider } from './app/mascotas/context/MascotasProvider.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EmpleadosProvider>
          <ClientesProvider>
            <MascotasProvider>
              <App />
            </MascotasProvider>
          </ClientesProvider>
        </EmpleadosProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
