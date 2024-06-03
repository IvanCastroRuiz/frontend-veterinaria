import { Routes, Route } from 'react-router-dom'
import { AuthLayout } from './layout/AuthLayout'
import Login from '../src/app/auth/pages/Login'
import PrivateLayout from './layout/PrivateLayout';
import HomeAdmin from './shared/pages/HomeAdmin';
import HomeClientes from './shared/pages/HomeClientes';
import HomeEmpleado from './shared/pages/HomeEmpleado';

function App() {

  return (
    <Routes>
      {/* RUTAS DE AUTORIZACION */}
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />} />
      </Route>

      {/* RUTAS DE USUARIO LOGUEADO */}
      <Route path="/home" element={<PrivateLayout />}>
        <Route path='a' element={<HomeAdmin />} />
        <Route path='c' element={<HomeClientes />} />
        <Route path='e' element={<HomeEmpleado />} />
      </Route>
    </Routes>
  )
}

export default App;









