"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toaster } from 'react-hot-toast';
import { notifySuccess } from '@/helpers/notifies';

interface Props {
  referreal: any
}

export const options1 = [
  { key: "si", label: "si" },
  { key: "no", label: "No" },
];

export const options2 = [
  { key: "efectivo", label: "Efectivo" },
  { key: "transferencia", label: "Transferencia" },
  { key: "cheque", label: "Cheque" },
];

type Inputs = {
  isPaid: string;
  paymentType: string;
  paymentAmount: number;
};

export default function AddCompensation({ referreal }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const obj = {
      paid: data.isPaid === 'si' ? true : false,
      typePaid: data.isPaid === 'si' ? data.paymentType : "",
      mountPaid: data.isPaid === 'si' ? Number(data.paymentAmount): 0,
    }
    // http://localhost:3000/api/referreals/change/clz0aja200005fu7u13x9hcq1
    const response = await fetch(`/api/referreals/change/${referreal.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });

    const res = await response.json();
    if(res.status === 200) {
      notifySuccess('Se ha actualizado la información de la compensación')
      setTimeout(() => {
        onOpenChange()
        window.location.reload()
      }, 1200);
    }
    // Aquí puedes realizar la lógica para manejar los datos del formulario
  };

  return (
    <>
     <Toaster />
      <Button size="sm" onPress={onOpen}>cambiar status</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Cambiar información sobre la compensación de un referido</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="p-3 text-xs rounded-xl bg-zinc-50 shadow-xl mb-3">
                  <p>Estos cambios van dirigidos hacia la persona quien refirió a este usuario</p>
                  <p className="font-bold">Nombres: {referreal.User.name} {referreal.User.lastname}</p>
                  <p className="font-bold">DNI: {referreal.User.dni}</p>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">¿Se ha pagado la compensación?</label>
                  <select
                    {...register("isPaid", { required: "Este campo es requerido" })}
                    className="w-full p-2 border border-gray-300 rounded-xl"
                  >
                    <option value="">Seleccionar</option>
                    {options1.map(opt1 => (
                      <option key={opt1.key} value={opt1.key}>
                        {opt1.label}
                      </option>
                    ))}
                  </select>
                  {errors.isPaid && (
                    <span className="text-red-500 text-xs">{errors.isPaid.message}</span>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">¿Cuál fue el tipo de pago?</label>
                  <select
                    {...register("paymentType")}
                    className="w-full p-2 border border-gray-300 rounded-xl"
                  >
                    <option value="">Seleccionar</option>
                    {options2.map(opt2 => (
                      <option key={opt2.key} value={opt2.key}>
                        {opt2.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">¿Cuál fue el monto del pago?</label>
                  <Input
                    type="number"
                    {...register("paymentAmount")}
                    className="w-full p-2 border border-gray-300 rounded-xl"
                    placeholder="Ingrese el monto del pago"
                  />
                </div>

                <Button className="mt-3 w-full" type="submit" size="lg" color="primary">
                  Guardar cambios
                </Button>
              </form>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
