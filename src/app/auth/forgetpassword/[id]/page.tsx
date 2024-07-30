import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';
import logoContact from '@/../../public/logocontactbg.png';
import LoginUserForm from '@/components/forms/LoginForm';
import prisma from '@/libs/db';
import { notFound } from "next/navigation";
import ForgetPasswordUserForm from '@/components/forms/ForgetPassword';

interface Props {
  params: {
    id: string;
  }
}

const ForgetPassword = async ({ params }: Props) => {

  const user = await prisma.user.findUnique({
    where: {
      id: params.id
    }
  })

  if (!user) {
    notFound();
  }


  return (
    <div className="px-8 md:px-20  h-full">
      <div className="flex justify-between items-center">
        <Link
          href="/auth/register"
          className="flex items-center cursor-pointer hover:text-blue-900 hover:font-semibold transition ease gap-1 text-sm "
        >
          <ArrowLeftIcon className="h-6 w-6 cursor-pointer" />
          Regresar
        </Link>
        <img
          src={logoContact.src}
          alt="logo"
          className="h-[100px] mt-8 w-[160px]"
        />
      </div>
      <ForgetPasswordUserForm user={user} />
    </div>
  );
}

export default ForgetPassword;
