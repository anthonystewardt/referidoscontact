"use client";
import { signIn } from "next-auth/react";
import {useRouter} from 'next/navigation'
import { Input, Button} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form"

import { useState } from 'react';

import { EyeFilledIcon } from '@/icons/FileEyedSlashIcon';
import { EyeSlashFilledIcon } from '@/icons/EyeFilledIcon';
import { Toaster } from 'react-hot-toast';
import { notifyError, notifySuccess } from '@/helpers/notifies';
import { setCookie } from 'cookies-next';
import Cookies from 'js-cookie';


interface Props {
  type: string;
}

type Inputs = {
  email: string
  password: string
}


const LoginUserForm = () => {
  const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm<Inputs>()
  const [isVisible, setIsVisible] = useState(false);
  const [currentErrorMessage, setCurrentErrorMessage] = useState("")
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter()
  
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setCurrentErrorMessage("");
    try {
     
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
  
      console.log({res})
      if (res!.error) {
        notifyError(res!.error)
      } else {
        // http://localhost:3000/api/users/email/anthonysa0813@gmail.com
        const userfound = await fetch(`/api/users/email/${data.email}`).then((res) => res.json()).then((data) => {
        Cookies.set('userId', data.users.id)

        })
        router.push('/dashboard')
        router.refresh()
      }
    } catch (error) {
      console.log({error})
      notifyError("Error al registrar usuario") 
    }
  }
  





  return (
    <div className="w-full justify-center items-center ">
      <Toaster />
      <form onSubmit={ handleSubmit(onSubmit)} className="my-10 lg:px-36  " >
        {
          currentErrorMessage && (
            <div className="">
              <span className="text-xs text-red-500 mb-2">{currentErrorMessage}</span>
            </div>
          )
        }
          <div className="flex flex-col">
            <h1 className="text-3xl text-center font-bold ">Ingresar</h1>
          </div>
          <div className="grid grid-cols-6 gap-5 mt-5">
           
          
           
            <div className="col-span-full lg:col-span-full">
              <Input  label='Correo'
                {...register('email', {required: true})}
              />
              {errors.email && <span className="text-red-500 text-xs">Este campo es requerido</span>}
            </div>
            
           
            <div className="col-span-full  lg:col-span-full">
            <Input
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              {...register('password', {required: true})}
              endContent={
                <button className="focus:outline-none " type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="w-full"
            />
              {errors.password && <span className="text-red-500 text-xs">Este campo es requerido</span>}
            </div>
           
            <div className="col-span-6">
              <Button className="w-full" type="submit" color="primary">Login</Button>
            </div>
          </div>
        </form>
    </div>
  )
}
export default LoginUserForm