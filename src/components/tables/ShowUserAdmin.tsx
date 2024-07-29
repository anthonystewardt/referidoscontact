import prisma from '@/libs/db';
import TableUserAd from './TableUserAd';


const ShowUserAdmin = async() => {

  const users = await prisma.admin.findMany()
  

  return (
    <div>
      <TableUserAd users={users} />
    </div>
  )
}
export default ShowUserAdmin