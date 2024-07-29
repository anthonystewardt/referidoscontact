"use client";
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toaster } from 'react-hot-toast';
import { notifySuccess } from '@/helpers/notifies';
import { User } from '@prisma/client';
import { get } from 'http';
import { transformDate } from '@/helpers/transformDate';
import { Referreal, UserI } from '@/interface/user';
import { Span } from 'next/dist/trace';

interface Props {
  user: UserI
}



export default function ViewDetailUser({ user }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentUser, setCurrentUser] = useState({} as UserI)
  
  useEffect(() => {
    if(isOpen) {
      getinfo()
    }
  }, [isOpen])
  

  const getinfo = async () => {
    // http://localhost:3000/api/users/clyz9nqsa0000lqzy9mpyamhf
    const response = await fetch(`/api/users/${user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data)
    setCurrentUser(data.users)
  }


  return (
    <>
     <Toaster />
      <Button size="sm" color='success' onPress={onOpen}>ver detalles</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Cambiar información sobre la compensación de un referido</ModalHeader>
            <ModalBody>
             <div className="">
              <p className="font-semibold">Nombres: <span className="text-zinc-400">{currentUser.name} {currentUser.lastname}</span></p>
              <p className="font-semibold">Correo: <span className="text-zinc-400">{currentUser.email}</span></p>
              <p className="font-semibold">Codigo pais: <span className="text-zinc-400">{currentUser.codePhone}</span></p>
              <p className="font-semibold">Teléfono: <span className="text-zinc-400">{currentUser.phone}</span></p>
              <p className="font-semibold">DNI: <span className="text-zinc-400">{currentUser.dni}</span></p>
              <p className="font-semibold">Pais: <span className="text-zinc-400">{currentUser.country}</span></p>
              {/* <p className="font-semibold">Fecha de registro: <span className="text-zinc-400">{currentUser.createdAt.toString()}</span></p> */}

              <div className="p-3 rounded-lg shadow-xl bg-zinc-100 mt-5">
                <div className="flex items-center justify-between">
                  <h1>Lista de referidos:</h1>
                </div>
                <ul>
                  {
                    currentUser.Referreal && currentUser.Referreal.map((ref: Referreal) => (
                      <li key={ref.id} className="flex flex-col gap-1 text-xs bg-white rounded-xl p-2 my-3">
                        <p className="font-semibold">Nombre: <span className="text-zinc-400">{ref.nameReferreal} {ref.lastnameReferreal}</span></p>
                        <p className="font-semibold">Correo: <span className="text-zinc-400">{ref.emailReferreal}</span></p>
                        <p className="font-semibold">Teléfono: <span className="text-zinc-400">{ref.phoneReferreal}</span></p>
                        <p className="font-semibold">DNI: <span className="text-zinc-400">{ref.dniReferreal}</span></p>
                        <p className="font-semibold">Tipo de pago: <span className="text-zinc-400">{ref.typePaid}</span></p>
                        <p className="font-semibold">Monto pagado: <span className="text-zinc-400">{ref.mountPaid}</span></p>
                        <p className="font-semibold">Posición: <span className="text-zinc-400">{ref.positionReferreal}</span></p>
                        <p className="font-semibold">Pagado: {ref.paid ? <span className="text-zinc-400">si</span> : <span className="text-zinc-400">no</span>}</p>
                        {/* <p className="font-semibold">Fecha de registro: {transformDate(ref.createdAt)}</p> */}
                      </li>
                    ))
                  }
                </ul>

              </div>
             </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
