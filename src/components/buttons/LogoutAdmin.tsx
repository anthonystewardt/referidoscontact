"use client";
import { ExitIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';


const LogoutAdmin = () => {
  const router = useRouter();


  const logout = async () => {
    try {
      // http://localhost:3000/api/users/admin/logout
      const response = await fetch('/api/users/admin/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        router.push('/auth/admin/login');
      } else {
        throw new Error('Error al cerrar sesión');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button onClick={logout} className="pb-10 flex justify-center gap-2 ">
      <ExitIcon className="h-6 w-6" />
      <span>Salir</span>
    </button>
  )
}
export default LogoutAdmin