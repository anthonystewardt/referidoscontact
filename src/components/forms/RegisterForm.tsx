"use client";
import Link from 'next/link';
import logoContact from '@/../../public/logocontactbg.png';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import {Avatar, Input, SelectItem, Select, Button} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form"

import { useEffect, useState } from 'react';
import { CountriesI } from '@/interface/countries';
import { EyeFilledIcon } from '@/icons/FileEyedSlashIcon';
import { EyeSlashFilledIcon } from '@/icons/EyeFilledIcon';
import { Toaster } from 'react-hot-toast';
import { notifyError, notifySuccess } from '@/helpers/notifies';
import { useRouter } from 'next/navigation';



interface Props {
  type: string;
}

type Inputs = {
  dni: string
  names: string
  lastnames: string
  email: string
  cellphone: string
  password: string
  country: string
  confirmPassword: string
}


const RegisterForm = ({type}: Props) => {
  const [selectedCosuntry, setSelectedCountry] = useState<CountriesI[] >([]);
  const [selectCountrie, setSelectCountrie] = useState<string | undefined>()
  const [typeForm, setTypeForm] = useState(type)
  const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm<Inputs>()
  const [currentCountry, setCurrentCountry] = useState({} as CountriesI);
  const [isVisible, setIsVisible] = useState(false);
  const [currentErrorMessage, setCurrentErrorMessage] = useState("")
  const router = useRouter()

  const toggleVisibility = () => setIsVisible(!isVisible);
  
   const findCountry = (country: string) => {
     const searchCountry = selectedCosuntry.find((c) => c.cca2 === country);
     if (searchCountry) {
        setCurrentCountry(searchCountry);
      }
   };

  useEffect(() => {
    const country = watch('country');
    if(country) {
      findCountry(country);
    }
  }, [watch('country')])
  

 
  
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setCurrentErrorMessage("");
    try {
      if(data.password !== data.confirmPassword) {
        notifyError('Las contraseñas no coinciden')
        setCurrentErrorMessage("las contraseñas no coinciden");
        return;
      }
      const res = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify({
          dni: data.dni,
          names: data.names,
          lastnames: data.lastnames,
          email: data.email,
          cellphone: data.cellphone,
          isEmployee: type === "Empleador" ? true : false,
          password: data.password,
          country: currentCountry. translations["spa"].common ?? currentCountry.name.common,
          code: `${currentCountry.idd.root}${currentCountry.idd.suffixes?.[0] ?? ''}`
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const response = await res.json()
      console.log({response})
      
      if(response.status === 400) {
        console.log({response})
        notifyError(response.message)
        return;
      }
      if(response.status === 201) {
        console.log({response})
        notifySuccess(response.message)
        router.push('/auth/login')
        return;
      }
    } catch (error) {
      console.log({error})
      notifyError("Error al registrar usuario") 
    }
  }
  
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all').then((response) => {
      return response.json();
    }).then((data: CountriesI[]) => {
      setSelectedCountry(data);
    })
  }, [])
  




  return (
    <>
      <Toaster />
      <form onSubmit={ handleSubmit(onSubmit)} className="my-10" >
        {
          currentErrorMessage && (
            <div className="">
              <span className="text-xs text-red-500 mb-2">{currentErrorMessage}</span>
            </div>
          )
        }
          <div className="flex flex-col">
            <h1 className="text-3xl text-center font-bold ">Registrarse - {type}</h1>
            <p className="mt-3 text-sm text-gray-600">Llena el siguiente formulario para activar su cuenta de referidos.</p>
          </div>
          <div className="grid grid-cols-6 gap-5 mt-5">
            <div className="col-span-full md:col-span-3">
              <Input label='DNI'  
                {...register('dni', {required: true})}
              />
              {errors.dni && <span className="text-red-500 text-xs">Este campo es requerido</span>}
            </div>
            <div className="col-span-full md:col-span-3">
              <Input label='Nombres'
                {...register('names', {required: true})}
              />
              {errors.names && <span className="text-red-500 text-xs">Este campo es requerido</span>}
            </div>
            <div className="col-span-full md:col-span-3">
              <Input  label='Apellidos'
                {...register('lastnames', {required: true})}
              />
              {errors.lastnames && <span className="text-red-500 text-xs">Este campo es requerido</span>}
            </div>
            <div className="col-span-full md:col-span-3">
              <Input  label='Correo'
                {...register('email', {required: true})}
              />
              {errors.email && <span className="text-red-500 text-xs">Este campo es requerido</span>}
            </div>
            <div className="col-span-full md:col-span-3">
            <Select
            className="w-full"
            label="Selecciona tu país"
            placeholder="Selecciona tu país"
            // value={selectCountrie}
            {...register('country', {required: true})}
            >
              {
                selectedCosuntry.map((country) => (
                  <SelectItem key={country.cca2} value={country.cca2}
                  startContent={<Avatar alt="Mexico" className="w-6 h-6" src={country.flags.png} />}
                  >
                    {country.translations["spa"].common ?? country.name.common}
                  </SelectItem>
                ))
              }
             </Select>
              {errors.country && <span className="text-red-500 text-xs">Este campo es requerido</span>}
            </div>
            <div className="col-span-full md:col-span-3">
              <Input  label='Celular'
                {...register('cellphone', {required: true})}
              />
              {errors.cellphone && <span className="text-red-500 text-xs">Este campo es requerido</span>}
            </div>
            <div className="col-span-full md:col-span-3">
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
            <div className="col-span-full md:col-span-3">
            <Input
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              {...register('confirmPassword', {required: true})}
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
              {errors.confirmPassword && <span className="text-red-500 text-xs">Este campo es requerido</span>}
            </div>
            <div className="col-span-6">
              <Button className="w-full" type="submit" color="primary">Registrarse</Button>
            </div>
          </div>
        </form>
    </>
  )
}
export default RegisterForm