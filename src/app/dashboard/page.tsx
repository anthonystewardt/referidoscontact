import ViewDataReferrealsByReferreal from '@/components/tables/ViewDataReferrealsByReferreal';
import {  HeartFilledIcon, BackpackIcon} from '@radix-ui/react-icons'
import { getCookie } from 'cookies-next';
import { FiDollarSign, FiCopy } from "react-icons/fi";
import Cookies from "js-cookie";

const DashboardPage = () => {

  const userId = Cookies.get('userId')
  

  return (
    <div>
     <h1 className="text-3xl font-semibold">Dashboard</h1>
     <div className="grid grid-cols-9 mt-10 gap-3">
        <div className="col-span-3 flex gap-3  px-8 py-4 rounded-lg shadow-sm bg-white">
          <div className=" rounded-full h-20 w-20 flex items-center justify-center bg-sky-100">
            <HeartFilledIcon className="h-10 w-10 text-blue-600" />
          </div>
          <div className="flex flex-col ">
          <h2 className="text-3xl font-semibold">+100</h2>
          <p className="text-1xl font-semibold">Referidos {userId}</p>
          </div>
        </div>
        <div className="col-span-3 flex gap-3  px-8 py-4 rounded-lg shadow-sm bg-white">
          <div className=" rounded-full h-20 w-20 flex items-center justify-center bg-sky-100">
            <BackpackIcon className="h-10 w-10 text-blue-600" />
          </div>
          <div className="flex flex-col ">
          <h2 className="text-3xl font-semibold">+10</h2>
          <p className="text-1xl font-semibold">Aceptados</p>
          </div>
        </div>
        <div className="col-span-3 flex gap-3  px-8 py-4 rounded-lg shadow-sm bg-white">
          <div className=" rounded-full h-20 w-20 flex items-center justify-center bg-sky-100">
            <FiDollarSign className="h-10 w-10 text-blue-600" />
          </div>
          <div className="flex flex-col ">
          <h2 className="text-3xl font-semibold">S/500</h2>
          <p className="text-1xl font-semibold">Soles de ganancia</p>
          </div>
        </div>
     </div>

     <div className="my-5"> 
      <div className="w-1/2 flex items-center justify-between px-5 py-3 rounded-lg bg-white shadow-xl">
        <p>Enlace: <span>https://contactamericas-referidos.com/asanchezy</span> </p>
        <button className="flex items-center gap-2 font-semibold px-3 py-1 rounded-lg mt-2">
          <FiCopy className="h-5 w-5" /> Copiar enlace
        </button>
      </div>
     </div>
     <div className="my-5">
      <ViewDataReferrealsByReferreal />
     </div>
    </div>
  )
}
export default DashboardPage