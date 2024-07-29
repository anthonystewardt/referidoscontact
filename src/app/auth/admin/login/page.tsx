import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import logoContact from '@/../../public/logocontactbg.png';
import LoginForm from '@/components/forms/LoginForm';
import LoginUserForm from '@/components/forms/LoginForm';
import LoginAdminForm from '@/components/forms/AdminLoginForm';
import Image from 'next/image';


const LoginAdminpage = () => {
  return (
    <div className="px-8 md:px-20  h-full">
      <div className="flex justify-end items-center">
        <img  src={logoContact.src} alt="logo" className="h-[100px] object-cover mt-8 w-[160px]" />
      </div>
      <LoginAdminForm />
    </div>
  )
}
export default LoginAdminpage