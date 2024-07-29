"use client";
import { CreditCard } from '@/interface/credit';
import { UserI } from '@/interface/user';
import { Button, Input } from '@nextui-org/react';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { notifyError, notifySuccess } from '@/helpers/notifies';

interface Props {
  user: CreditCard,
  userObject: UserI | null;
}

type Inputs = {
  cardName: string;
  cardNumber: string;
}

const CreditUserForm = ({ user, userObject }: Props) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
    defaultValues: {
      cardName: user.cardName,
      cardNumber: user.cardNumber
    }
  });

  // Reset form values when user changes
  React.useEffect(() => {
    reset({
      cardName: user.cardName,
      cardNumber: user.cardNumber
    });
  }, [user, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (!user.id) {
        const res = await fetch(`/api/credit/${userObject?.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...data,
            mount: 0
          })
        }).then((res) => res.json()).then((data) => {
          if (data.status === 200) {
            notifySuccess("Información guardada")
          }
        })
      } else {
        const res = await fetch(`/api/credit/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...data
          })
        }).then((res) => res.json()).then((data) => {
          if (data.status === 200) {
            notifySuccess("Información actualizada")
          }
        })
      }
    } catch (error) {
      console.log({ error })
      notifyError("Error al guardar información")
    }
  }

  return (
    <form className="px-4 py-6 mt-10 rounded-lg bg-white" onSubmit={handleSubmit(onSubmit)}>
      <Toaster />
      <h1 className="text-3xl font-bold mb-3">Información Bancaria</h1>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-6">
          <Input label="Nombre del banco"
            {...register('cardName', { required: true })}
          />
          {errors.cardName && <span className="text-red-500">Este campo es requerido</span>}
        </div>
        <div className="col-span-6">
          <Input label="Número de tarjeta"
            {...register('cardNumber', { required: true })}
          />
          {errors.cardNumber && <span className="text-red-500">Este campo es requerido</span>}
        </div>
        <div className="col-span-full">
          <Button color="primary" type="submit" size="md">Guardar</Button>
        </div>
      </div>
    </form>
  )
}
export default CreditUserForm;
