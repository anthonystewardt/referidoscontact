"use client";
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import AddCompensation from '../modals/AddCompensation';
import { transformDate } from '@/helpers/transformDate';

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
    name: 'Pais',
    selector: (row: any) => `${row.country}`,
  },
  {
    name: 'Fecha de registro',
    selector: (row: any) => `${transformDate(row.createdAt)}`,
  },
  {
    name: 'Compensación',
    selector: (row: any) => (
      <p>S/100</p>
    ), // Modify the selector function to return a string or Primitive type
  }
]

interface Props {
  dni: string,
  data: any
}


const ShowUsersListData = ({dni, data}:Props) => {

  const [refersData, setRefersData] = useState([])

  useEffect(() => {
    getrefersSecondary()
  }, [])
  


  const getrefersSecondary = async () => {
    // http://localhost:3000/api/users/clyz9nqsa0000lqzy9mpyamhf
    const response = await fetch(`/api/users/${dni}`, {
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
      <DataTable columns={columns as any} data={data} pagination />
    </div>
  )
}
export default ShowUsersListData;