"use client";
import { notifyError, notifySuccess } from '@/helpers/notifies';
import { Button, Input, Spinner } from '@nextui-org/react';
import { User } from '@prisma/client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Toaster } from 'react-hot-toast';


interface Props {
  user: User;
}

type Inputs = {
  email: string;
  password: string;
}

const ForgetPasswordUserForm = ({ user }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();
  const [showSpinner, setShowSpinner] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setShowSpinner(true);
    if(data.email !== user.email){
      notifyError("El correo no coincide con el usuario");
      setShowSpinner(false);
      return;
    }

    const res = await fetch(`/api/users/recoveraccount/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: data.password }),
    }).then((res) => res.json()).then((data) => {
      console.log(data);	
      if (data.status === 200) {
        notifySuccess("Contraseña cambiada correctamente");
        setShowSpinner(false);
      }
    }).catch((error) => {
        console.error(error);
      notifyError("Error al cambiar la contraseña");
        setShowSpinner(false);

    });
  };
  

  return (
    <div className='flex items-center  lg:h-[500px]'>
      <Toaster />
      <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-3xl font-bold text-center">Cambiar contraseña</h1>
        <p>
          Usuario: {user.name} {user.lastname}
        </p>
        <div className="flex flex-col gap-4">
          <Input placeholder="Correo" label="Escribe tu correo: "
            {...register("email", {
              required: "Este campo es requerido",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "El correo no es válido",
              },
            })}
          />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}

          <Input type="password" placeholder="Contraseña" label="Contraseña"
            {...register("password", {
              required: "Este campo es requerido",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}

          <Button size="lg" className="w-full" type="submit" color="primary">
            {showSpinner ? <Spinner color="white" /> : "Cambiar contraseña"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ForgetPasswordUserForm;
