"use client";
import { CreditCard, CreditI } from '@/interface/credit';
import { UserI } from '@/interface/user';
import { Button, Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast';
import {  useForm, SubmitHandler } from 'react-hook-form';
import { notifyError, notifySuccess } from '@/helpers/notifies';

interface Props {
  user: CreditCard
}

type Inputs = {
  cardName: string;
  cardNumber: string;
}

const CreditUserForm = ({user}: Props) => {
  
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      cardName: user.cardName,
      cardNumber: user.cardNumber
    }
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log({data})
      const res = await fetch(`/api/credit/${user.id}`, {
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
          notifySuccess("informaciòn actualizado")
        }
      })
    } catch (error) {
      console.log({error})
      notifyError("Error al guardar informaciòn") 
    }
  }
  
  return (
    <form className="px-4 py-6 mt-10 rounded-lg bg-white" onSubmit={handleSubmit(onSubmit)}>
      <Toaster />
      <h1 className="text-3xl font-bold mb-3">Informaciòn Bancaria</h1>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-6">
          <Input label="Nombre del banco" 
            {...register('cardName', {required: true})}
          />
          {errors.cardName && <span className="text-red-500">Este campo es requerido</span>}
        </div>
        <div className="col-span-6">
          <Input label="Nùmero de tarjeta" 
            {...register('cardNumber', {required: true})}
          />
          {errors.cardNumber && <span className="text-red-500">Este campo es requerido</span>}
        </div>
        <div className="col-span-full">
          <Button color="primary" type="submit"  size="md" >Guardar</Button>
        </div>
      </div> 
    </form>
  )
}
export default CreditUserForm