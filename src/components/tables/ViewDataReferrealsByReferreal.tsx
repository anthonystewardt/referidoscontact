"use client";
import DataTable from 'react-data-table-component';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Referreal } from '@prisma/client';
import { transformDate } from '@/helpers/transformDate';
import { Span } from 'next/dist/trace';
const columns = [
  {
    name: 'ID',
    selector: (row: any) => `${row.id}`,
  },
	{
		name: 'Nombres',
		selector: (row: any) => `${row.nameReferreal}${row.lastnameReferreal}`,
	},
	{
		name: 'Posición',
		selector: (row: any) => `${row.positionReferreal}`,
	},
  {
    name: 'Fecha de registro (mes/día - hora)',
    selector: (row: any) => `${transformDate(row.createdAt)}` ,
  },
  {
    name: 'Estado',
    selector: (row: any) => row.active ? <span className="text-green-500 font-semibold">Aceptado</span> : <span className="text-red-500 font-semibold">Rechazado</span>,
  }
]

interface ReferI {
  id: string
  nameReferreal: string
  lastnameReferreal: string
  positionReferreal: string
  createdAt: string
  active: boolean
}




const data = [
  {
  id: 1,
  title: 'Beetlejuice',
  year: '1988',
},
{
  id: 2,
  title: 'Ghostbusters',
  year: '1984',
},
]


const ViewDataReferrealsByReferreal = () => {

  const [refersList, setrefersList] = useState<ReferI[] | []>([])
  
  useEffect(() => {
    const userId = Cookies.get('userId')
    getInfo()
  }, [])

  const getInfo = async () => {
    const userId = Cookies.get('userId')
    // http://localhost:3000/api/referreals/clyz9nqsa0000lqzy9mpyamhf
    const res = await fetch(`/api/referreals/${userId}`).then((res) => res.json()).then((data) => {
      return data.referreals
    })

    const dataTransformed = res.map((refer: ReferI) => {
      return {
        id: refer.id,
        nameReferreal: refer.nameReferreal,
        lastnameReferreal: refer.lastnameReferreal,
        positionReferreal: refer.positionReferreal,
        createdAt: refer.createdAt,
        active: refer.active
      }
    } )

    setrefersList(dataTransformed)
  
  }



  return (
    <DataTable title="Lista de tus Referidos" 
      className="rounded-lg" style={{
      borderRadius: '10px',
    }} columns={columns as any} data={refersList} pagination />
  )
}


export default ViewDataReferrealsByReferreal