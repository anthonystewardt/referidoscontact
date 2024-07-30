"use client";
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import AddCompensation from '../modals/AddCompensation';
import { transformDate } from '@/helpers/transformDate';
import ViewDetailUser from '../modals/ViewDetailUser';

const columns = [
  {
    name: 'ID',
    selector: (row: any) => `${row.id}`,
  },
  {
    name: 'Nombres',
    selector: (row: any) => `${row.name} ${row.lastname}`,
  },
  {
    name: 'Email',
    selector: (row: any) => `${row.email}`,
  },
  {
    name: 'Codigo pais',
    selector: (row: any) => `${row.codePhone}`,
  },
  {
    name: 'Teléfono',
    selector: (row: any) => `${row.phone}`,
  },
  {
    name: 'DNI',
    selector: (row: any) => `${row.dni}`,
  },
  {
    name: '¿Es empleador?',
    selector: (row: any) => `${row.isEmployee ? 'Si' : 'No'}`,
  },
  {
    name: 'Pais',
    selector: (row: any) => `${row.country}`,
  },
  {
    name: 'Fecha de registro',
    selector: (row: any) => `${transformDate(row.createdAt)}`,
  },
  {
    name: 'Ver detalles',
    selector: (row: any) => <ViewDetailUser user={row} /> // Modify the selector function to return a string or Primitive type
  }
]

const ShowUsersList = () => {

  const [refersData, setRefersData] = useState([])

  useEffect(() => {
    getrefers()
  }, [])
  


  const getrefers = async () => {
    const response = await fetch('/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);
    setRefersData(data.users)
  }
  


  return (
    <div>
      <h1 className="text-3xl font-bold">Lista de Usuarios registrados</h1>
      <p className='text-gray-6git00'>Lista de usuarios quienes pueden referir</p>
      <DataTable columns={columns as any} data={refersData} pagination />
    </div>
  )
}
export default ShowUsersList