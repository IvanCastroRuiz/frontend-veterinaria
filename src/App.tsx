import { Routes, Route } from 'react-router-dom'
import { AuthLayout } from './layout/AuthLayout'
import Login from '../src/app/auth/pages/Login'
import Registrar from '../src/app/auth/pages/Registrar'
import OlvidePassword from '../src/app/auth/pages/OlvidePassword'
import PrivateLayout from './layout/PrivateLayout';
import HomeAdmin from './shared/pages/HomeAdmin';
import HomeClientes from './shared/pages/HomeClientes';
import HomeEmpleado from './shared/pages/HomeEmpleado';
import Empleados from './app/empleados/pages/Empleados';
import Clientes from './app/clientes/pages/Clientes';
import Productos from './app/productos/pages/Productos';
import Citas from './app/citas/pages/Citas';

function App() {

  return (
    <Routes>
      {/* RUTAS DE AUTORIZACION */}
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="registrar" element={<Registrar />} />
        <Route path="olvide-password" element={<OlvidePassword />} />
      </Route>

      {/* RUTAS DE USUARIO LOGUEADO */}
      <Route path="/home" element={<PrivateLayout />}>
        <Route path='a' element={<HomeAdmin />} >
          <Route path='empleados' element={<Empleados />} />
          <Route path='clientes' element={<Clientes />} />
          <Route path='citas' element={<Citas />} />
          <Route path='productos' element={<Productos />} />
        </Route>
        <Route path='c' element={<HomeClientes />} >
          <Route path='citas' element={<Citas />} />
        </Route>
        <Route path='e' element={<HomeEmpleado />} />
      </Route>
    </Routes>
  )
}

export default App;









