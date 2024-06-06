import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './app/auth/context/AuthProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { EmpleadosProvider } from './app/empleados/context/EmpleadosProvider.tsx'
import { ClientesProvider } from './app/clientes/context/ClientesProvider.tsx'
import { MascotasProvider } from './app/mascotas/context/MascotasProvider.tsx'
import { ProductosProvider } from './app/productos/context/ProductosProvider.tsx'
import { CitasProvider } from './app/citas/context/CitasProvider.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CitasProvider>
          <EmpleadosProvider>
            <ClientesProvider>
              <MascotasProvider>
                <ProductosProvider>
                  <App />
                </ProductosProvider>
              </MascotasProvider>
            </ClientesProvider>
          </EmpleadosProvider>
        </CitasProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
