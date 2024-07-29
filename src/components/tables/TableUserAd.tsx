"use client";
import { Admin, User } from '@prisma/client';
import React from 'react'
import DataTable from 'react-data-table-component';
import DeleteUserAdminModal from '../modals/DeleteUserAdmin';

interface Props {
  users: Admin[] | []
}

// {
//   "id": "clz2y8owl00021zz7wjw6a3hy",
//   "email": "admincontact@gmail.com",
//   "username": "admincontact@gmail.com",
//   "password": "$2b$10$8z7hKQPy9ArxYQa.f0nfXOEukbJpP/KNTn6Sv2e22yMgtXA/7wj66",
//   "role": "admin",
//   "createdAt": "2024-07-26T17:01:12.597Z",
//   "updatedAt": "2024-07-26T17:01:12.597Z"
//   }

const columns = [
	{
		name: 'Correo',
		selector: (row: any) => row.email,
	},
	{
		name: 'role',
		selector: (row: any) => row.role,
	},
  {
    name: 'eliminar',
    cell: (row: any) => <DeleteUserAdminModal user={row} />,
  }
  // {
  //   name: 'createdAt',
  //   selector: (row: any) => row.createdAt,
  // }
];

const TableUserAd = ({users}: Props) => {
  
  return (
    <div>
      <DataTable
			columns={columns}
			data={users ? users : []}
		/>
    </div>
  )
}
export default TableUserAd