"use client";
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import ChangeStatusReferModal from '../modals/ChangeStatusRefers';

import { transformDate } from '@/helpers/transformDate';
import ShowUsersListData from './ShowUserRefBySearch';

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
      <ChangeStatusReferModal />
    ), // Modify the selector function to return a string or Primitive type
  },
  {
    name: '¿se pago?',
    selector: (row: any) => row.paid ? (<p className="text-green-500 font-semibold">Pagado</p>) : (<p className="text-red-500 font-semibold">No pagado</p>)
  },
  {
    name: 'Cambiar estado de pago',
    selector: (row: any) => (
      <ChangeStatusReferModal />
    ), // Modify the selector function to return a string or Primitive type
  },
  {
    name: 'Fecha de registro',
    selector: (row: any) => `${transformDate(row.createdAt)}`,
  },
]

const columnsUsers = [
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
  type: string
}

const ShowrefersListSearch = ({dni, type}: Props) => {

  const [refersData, setRefersData] = useState([])
  const [usersWhoRefers, setUsersWhoRefers] = useState([])

  useEffect(() => {
    if(type === 'refers'){
      getrefers(dni)
    }else {
      getrefersSecondary(dni)
    }
  }, [dni])
  


  const getrefers = async (dni: string) => {
    const response = await fetch(`/api/referreals/dni/${dni}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data.data);
    setRefersData(data.data)
  }
  const getrefersSecondary = async (dni: string) => {
    // http://localhost:3000/api/users/clyz9nqsa0000lqzy9mpyamhf
    const response = await fetch(`/api/users/dni/${dni}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);
    setUsersWhoRefers(data.data)
  }
  


  return (
    <div>
      <h1 className="text-3xl font-bold">Lista de Referidos</h1>
      {
        type === 'refers' ? (
          <DataTable
            columns={columns as any}
            data={refersData}
            pagination
            highlightOnHover
            pointerOnHover
          />
        ) : (
          <ShowUsersListData dni={dni} data={usersWhoRefers} />
        )
      }
    </div>
  )
}

export default ShowrefersListSearch