"use client";
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import ChangeStatusReferModal from '../modals/ChangeStatusRefers';

import { transformDate } from '@/helpers/transformDate';
import { useRouter } from 'next/navigation';
import AddCompensation from '../modals/AddCompensation';




const ShowrefersList = () => {

  const [refersData, setRefersData] = useState([])

  const router = useRouter();
  const columns = [
    {
      name: 'ID',
      selector: (row: any) => `${row.id}`,
    },
    {
      name: 'Nombres',
      selector: (row: any) => `${row.nameReferreal} ${row.lastnameReferreal}`,
    },
    {
      name: 'Email',
      selector: (row: any) => `${row.emailReferreal}`,
    },
    {
      name: 'Teléfono',
      selector: (row: any) => `${row.phoneReferreal}`,
    },
    {
      name: 'DNI',
      selector: (row: any) => `${row.dniReferreal}`,
    },
    {
      name: 'Posición',
      selector: (row: any) => `${row.positionReferreal}`,
    },
    {
      name: 'Estado',
      selector: (row: any) => row.active ? (<p className="text-green-500 font-semibold">Admitido</p>) : (<p className="text-red-500 font-semibold">No admitido</p>)
    },
    {
      name: 'Cambiar estado',
      selector: (row: any) => (
        <ChangeStatusReferModal refer={row} router={router} />
      ), // Modify the selector function to return a string or Primitive type
    },
    {
      name: '¿se pago?',
      selector: (row: any) => row.paid ? (<p className="text-green-500 font-semibold">Pagado</p>) : (<p className="text-red-500 font-semibold">No pagado</p>)
    },
    {
      name: 'Cambiar estado de pago',
      selector: (row: any) => (
        <AddCompensation referreal={row} />
      ), // Modify the selector function to return a string or Primitive type
    },
    {
      name: 'Fecha de registro',
      selector: (row: any) => `${transformDate(row.createdAt)}`,
    },
  ]

  useEffect(() => {
    getrefers()
  }, [])
  


  const getrefers = async () => {
    const response = await fetch('/api/referreals', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);
    setRefersData(data.referreal)
  }
  


  return (
    <div>
      <h1 className="text-3xl font-bold">Lista de Referidos</h1>
      <span>Lista de usuarios quienes desean pertenecer a Contactamericas.</span>
      <DataTable title="" 
        className="rounded-lg" style={{
        borderRadius: '10px',
        }} 
        columns={columns as any} 
        data={refersData} 
        pagination 
      />
    </div>
  )
}
export default ShowrefersList