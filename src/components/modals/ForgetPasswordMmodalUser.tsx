"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { notifyError, notifySuccess } from "@/helpers/notifies";
import { Spinner } from "@nextui-org/spinner";
import { sendEmailForgetPasswordUser } from "@/helpers/emails/ForgetPasswordUser";
import { Toaster } from "react-hot-toast";


type Inputs = {
  email: string;
}

export default function ForgetPasswordModalUser() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showSpinner, setShowSpinner] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const getUser = await fetch(`/api/users/email/${data.email}`).then((res) => res.json()).then((data) => {
        return data
      })

      if (getUser.users !== null) {
        notifySuccess("Se ha enviado un correo con las instrucciones para restablecer su contraseña");
        sendEmailForgetPasswordUser(data.email, getUser.users)
      } else {
        notifyError("El correo ingresado no se encuentra registrado en la plataforma");
      }

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      
      <Button
        className=" w-full bg-transparent"
        onPress={onOpen}
        size="lg"
        color="default"
      >
        Olvidé mi contraseña
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Toaster />
              <ModalHeader className="flex text-2xl text-center font-semibold flex-col gap-1">
                Solicitud de cambio de contraseña
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    label="Correo"
                    placeholder="Ingrese su correo"
                    variant="bordered"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">
                      Este campo es requerido
                    </span>
                  )}
                  <Button type="submit" className="mt-3 w-full" color="primary" >
                    Solicitar
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
