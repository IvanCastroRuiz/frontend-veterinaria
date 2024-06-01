import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthLayout } from './layout.tsx/AuthLayout'
import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/OlvidePassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import FormularioUsuarios from './paginas/FormularioUsuarios'
import Mascota from './paginas/Mascota'




function App() {

  return (

    < BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          < Route index element={<Login />} />
          < Route path="registrar" element={<Registrar />} />
          < Route path="olvide-Password" element={<OlvidePassword />} />
          < Route path="confirmar/:id" element={<ConfirmarCuenta />} />
          < Route path="formulario-Usuarios" element={<FormularioUsuarios />} />
          < Route path="mascota" element={<Mascota />} />
        </Route>

      </Routes>

    </BrowserRouter>

  )
}

export default App;









