"use client";
import React, { useState } from 'react'
import {Button} from "@nextui-org/react";
import logoContact from "@/../../public/logocontactbg.png";
import SelectRoleCard from '@/components/cards/selectRole/SelectRoleCard';
import iconRegister1 from '@/../../public/registergroup1.png';
import iconRegister2 from '@/../../public/icongroup2.png';
import Link from 'next/link';
import { ArrowLeftIcon } from '@radix-ui/react-icons';


const RegisterPage = () => {

  const [selectForm, setselectForm] = useState(null)



  return (
    <div className="h-full lg:px-20 px-8  ">
      <div className="flex justify-end mt-3 ">
        <img src={logoContact.src} alt="logo" className="h-[100px] w-[160px]" />
      </div>
      <div className="mt-10">
        <h1 className="text-3xl font-bold text-blue-900">Registrate</h1>
        <p className="text-gray-400 mt-2">
          Para empezar a referir debes de crearte una cuenta y recibiràs tu
          enlace ùnico:
        </p>
        <div className="my-8 flex flex-col gap-3">
          <SelectRoleCard
            to="/auth/register/employee"
            icon={iconRegister1}
            title="Colaborador"
            description={
              "Usuarios que ya se encuentran laborando en la empresa"
            }
          />
          <SelectRoleCard
            to="/auth/register/externo"
            icon={iconRegister2}
            title="Externo"
            description={"Usuarios que son externos a la empresa"}
          />
          <p className='flex items-center gap-4 mt-5'>
            Si tienes cuenta, <Link href="/auth/login" className='flex items-center gap-2 font-semibold underline'>ingresar aquí <ArrowLeftIcon className='h-5 w-5' /> </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default RegisterPage;