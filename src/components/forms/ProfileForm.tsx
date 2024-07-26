"use client";
import React, { useEffect, useState } from 'react'
import {Avatar, Button, Input, Select, SelectItem} from "@nextui-org/react";
import { CountriesI } from '@/interface/countries';
import { useForm,SubmitHandler } from 'react-hook-form';
import Cookies from "js-cookie";
import { UserI } from '@/interface/user';
import { notifyError, notifySuccess } from '@/helpers/notifies';
import { Toaster } from 'react-hot-toast';

type Inputs =  {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  dni: string;
  country: string;
  codePhone: string;
}

interface Props {
  user: UserI
}

const ProfileForm = ({user}: Props) => {
  const [selectedCosuntry, setSelectedCountry] = useState<CountriesI[] >([]);
  
  const [currentUser, setCurrentUser] = useState({} as UserI)
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<Inputs>({
    defaultValues: {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      dni: user.dni,
      country: user.country,
      codePhone: user.codePhone
    }
  
  })

  useEffect(() => {
    const userId = Cookies.get('userId')
    console.log({user})
    if(userId){
      const userfound = fetch(`/api/users/${userId}`).then((res) => res.json()).then((data) => {
        setCurrentUser(data.users)
        setValue('name', data.users.name)
      })
    }
  }, [])
  
  
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all').then((response) => {
      return response.json();
    }).then((data: CountriesI[]) => {
      setSelectedCountry(data);
    })
  }, [])


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log({data})
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data
        })
      }).then((res) => res.json()).then((data) => {
        console.log({data})
        if(data.status === 200){
          notifySuccess("Usuario actualizado")
        }
      })
    } catch (error) {
      console.log({error})
      notifyError("Error al guardar usuario") 
    }
  }



  return (
    <form className="bg-white py-6 px-4 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="mb-4 text-3xl font-bold">Perfil</h1>
     
     <Toaster />
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-6">
          <Input type="text" label="Nombres"
            {...register('name', {required: true})}
          />
          {errors.name && <span className="text-red-500">Este campo es requerido</span>}
        </div>
        <div className="col-span-6">
          <Input type="text" label="Apellidos"
     
            {...register('lastname', {required: true})}
          />
          {errors.lastname && <span className="text-red-500">Este campo es requerido</span>}
        </div>
        <div className="col-span-6">
          <Input type="email" label="Correo"
            
            {...register('email', {required: true})}
          />
          {errors.email && <span className="text-red-500">Este campo es requerido</span>}
        </div>
        <div className="col-span-6">
          <Input type="text" label="Teléfono"
            
            {...register('phone', {required: true})}
          />
          {errors.phone && <span className="text-red-500">Este campo es requerido</span>}
        </div>
        <div className="col-span-6">
          <Input type="text" label="DNI"
           
            {...register('dni', {required: true})}
          />
          {errors.dni && <span className="text-red-500">Este campo es requerido</span>}
        </div>
        <div className="col-span-6">
       
        <Input type="text" label="Paìs" 
          {...register('country', {required: true})}
        />
        </div>
        <div className="col-span-6">
          <Input type="text" label="Còdigo de paìs"
           
            {...register('codePhone', {required: true})}
          />
        </div>
        <div className="col-span-full">
          <Button color="primary" type="submit"  size="md" >Guardar</Button>
        </div>
      </div>
    </form>
  )
}
export default ProfileForm