"use client";
import { Button } from '@nextui-org/react';
import { ExitIcon } from '@radix-ui/react-icons';
import React from 'react';
import { signOut } from 'next-auth/react';
import Cookies from "js-cookie";

const SignoutDashboardButton= () => {
  return (
    <Button color="default" onClick={() => {
      Cookies.remove('userId')
      Cookies.remove('myTokenName')
      signOut();
    }} className="">
          <ExitIcon className="h-6 w-6" />
          <span>Salir</span>
    </Button>
  )
}
export default SignoutDashboardButton