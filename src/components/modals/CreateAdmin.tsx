"use client";
import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import { Toaster } from 'react-hot-toast';
import {Select, SelectItem} from "@nextui-org/react";
import {useRouter} from 'next/navigation'
import { useForm, SubmitHandler } from "react-hook-form"
import { notifyError, notifySuccess } from '@/helpers/notifies';

export const options = [
  {key: "admin", label: "Admin"},
  {key: "superadmin", label: "superadmin"},
];

interface Inputs {
  email: string
  password: string
  role: string
}


const CreateAdmin = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();  

  const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm<Inputs>()
  const router = useRouter()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
     
      const res = await fetch('/api/users/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((res) => res.json()).then((data) => {
        console.log({data})
        notifySuccess("Admin creado correctamente")
        router.refresh()
      })
    } catch (error) {
      notifyError("Error al crear admin")
    }
  }


  return (
    <>
    <Toaster />
      <Button onPress={onOpen} size="sm" color="primary">Crear admin</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">Crear Administrador</ModalHeader>
              <ModalBody>
                <Input label="Correo" placeholder="Correo"
                  {...register("email", { required: true })}
                />
                {/* show error message */}
                {errors.email && <p className="text-red-500">Este campo es requerido</p>}
                <Input label="Contraseña" placeholder="Contraseña"
                  {...register("password", { required: true })}
                />
                {/* show error message */}
                {errors.password && <p className="text-red-500">Este campo es requerido</p>}
                <div className="">
                <Select 
                  label="Select an animal" 
                  className="w-full" 
                  {...register("role", { required: true })}
                >
                  {options.map((opt) => (
                    <SelectItem key={opt.key}>
                      {opt.label}
                    </SelectItem>
                  ))}
                  </Select>
                  {errors.role && <p className="text-red-500">Este campo es requerido</p>}
                </div>
                <Button color="primary"  type="submit" size="lg">Crear</Button>
              </ModalBody>
              
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default CreateAdmin