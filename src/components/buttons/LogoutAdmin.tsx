"use client";
import { Button } from '@nextui-org/react';
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
    <div className="flex items-center justify-center pb-5">
      <Button color="default" onClick={logout} className=" flex justify-center items-center gap-2 ">
        <ExitIcon className="h-6 w-6" />
        <span>Salir</span>
      </Button>
    </div>
  )
}
export default LogoutAdmin