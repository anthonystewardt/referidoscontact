"use client";
import { signIn } from "next-auth/react";
import {useRouter} from 'next/navigation'
import { Input, Button, Spinner} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form"

import { useState } from 'react';

import { EyeFilledIcon } from '@/icons/FileEyedSlashIcon';
import { EyeSlashFilledIcon } from '@/icons/EyeFilledIcon';
import { Toaster } from 'react-hot-toast';
import { notifyError, notifySuccess } from '@/helpers/notifies';

import axios from 'axios';


interface Props {
  type: string;
}

type Inputs = {
  email: string
  password: string
}


const LoginAdminForm = () => { 
  const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm<Inputs>()
  const [isVisible, setIsVisible] = useState(false);
  const [currentErrorMessage, setCurrentErrorMessage] = useState("")
  const [showSpinner, setShowSpinner] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter()
  
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setCurrentErrorMessage("");
    try {
      setShowSpinner(true)
      const res = await axios.post("/api/auth/login", data);

      if (res.status === 200) {
      setShowSpinner(false)
      notifySuccess("¡Hola, Bienvenido!");
      router.push("/admin/home");
    }
    } catch (error) {
      console.log({ error })
      setShowSpinner(false)
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
            <Button className="w-full" type="submit" color="primary">
              {showSpinner ? <Spinner color="white" /> : "Ingresar"}
            </Button>
            </div>
          </div>
        </form>
    </div>
  )
}
export default LoginAdminForm