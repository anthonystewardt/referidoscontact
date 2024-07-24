import Link from 'next/link';
import logoContact from '@/../../public/logocontactbg.png';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import RegisterForm from '@/components/forms/RegisterForm';
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Contact Americas - Registro en referidos',
  description: 'Registrate en Contact Americas y empieza a referir a tus amigos y conocidos',
}


const EmployeePageRegister = () => {
  return (
    <div className="px-8 md:px-20  h-full">
      <div className="flex justify-between items-center">
        <Link href="/auth/register" className="flex items-center cursor-pointer hover:text-blue-900 hover:font-semibold transition ease gap-1 text-sm ">
          <ArrowLeftIcon className="h-6 w-6 cursor-pointer" />
         Regresar</Link>
        <img src={logoContact.src} alt="logo" className="h-[100px] mt-8 w-[160px]" />
      </div>
      <RegisterForm type="Empleador" />
    </div>
  )
}
export default EmployeePageRegister