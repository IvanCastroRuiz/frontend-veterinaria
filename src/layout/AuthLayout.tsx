import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
export const AuthLayout = () => {
  // const navigate = useNavigate()

  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     localStorage.removeItem('token')
  //     window.location.reload()
  //   }
  // })

  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  )
};
export default AuthLayout;
