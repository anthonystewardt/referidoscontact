import CreateAdmin from '@/components/modals/CreateAdmin';
import ShowUserAdmin from '@/components/tables/ShowUserAdmin';

const UserAdminPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <h1 className='text-3xl font-bold'>Lista de Usuarios Admin</h1>
        <CreateAdmin />
      </div>
      <ShowUserAdmin />
    </div>
  )
}
export default UserAdminPage