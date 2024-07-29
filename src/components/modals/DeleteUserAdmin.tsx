import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { notifyError, notifySuccess } from '@/helpers/notifies';



interface Props {
  user: any;
}

export default function DeleteUserAdminModal({user}: Props) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const router = useRouter();

  // localhost:3000/api/users/admin/[id]
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`/api/users/admin/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
      console.log("User deleted");
      notifySuccess("Usuario eliminado");
      setTimeout(() => {
        router.refresh();
        onOpenChange();
      }, 1200);

    } else {
      console.error("Error deleting user");
      notifyError("Error eliminando usuario");
    }
  }


  return (
    <>
      <Toaster />
      <Button onPress={onOpen} size="sm" color="danger">Eliminar</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center text-3xl font-semibold">¿Estàs seguro de eliminar a este usuario?</ModalHeader>
              <ModalBody>
                <form onSubmit={onSubmit} className="grid w-full  grid-cols-6 gap-3" >
                  <Button color="danger" type='submit' className="col-span-3">Eliminar</Button>
                  <Button color="primary" className="col-span-3" onPress={onClose}>Cancelar</Button>
                </form>
              </ModalBody>
             
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
