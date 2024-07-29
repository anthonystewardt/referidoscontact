"use client";
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { notifySuccess } from '@/helpers/notifies';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface Props {
  refer: any;
  router: AppRouterInstance
}

export default function ChangeStatusReferModal({ refer, router }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await fetch(`/api/referreals/${refer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(refer)
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      notifySuccess('Estado cambiado');
      window.location.reload();
      onOpenChange();  // Cierra el modal
    } else {
      console.error('Error al cambiar el estado:', data);
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Toaster />
      <Button size="sm" onPress={onOpen}>Cambiar status</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">Cambiar Estado</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <p className="font-semibold">
                    ¿Estás seguro de que deseas cambiar el estado a {
                      refer.active ? <span className="text-red-500">No Admitido</span> : <span className="text-blue-500">Admitido</span>
                    }?
                  </p>
                  <Button
                    color="primary"
                    type="submit"
                    size="lg"
                    className="my-3 w-full"
                    isDisabled={isSubmitting} // Deshabilitar botón mientras se envía el formulario
                  >
                    {isSubmitting ? 'Cambiando...' : 'Cambiar'}
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
