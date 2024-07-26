"use client";

import { Button } from '@nextui-org/react';


const DeleteUserForm = () => {
  return (
    <form className="px-6 my-10 py-4 rounded-lg bg-white">
      <h1 className="text-3xl font-bold mb-3">Eliminar cuenta</h1>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-full">
          <p className="text-lg">¿Estás seguro de eliminar tu cuenta?</p>
        </div>
        <div className="col-span-full">
          <Button color="danger"  size="md" >Eliminar</Button>
        </div>
      </div>
    </form>
  )
}
export default DeleteUserForm