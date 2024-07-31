import logo from '@/../../public/logocontactbg.png';
import ReferrealForm from '@/components/forms/ReferrealForm';
import prisma from '@/libs/db';
import { notFound } from 'next/navigation';



interface Props {
  params: {
    id: string
  }
}


const ReferidoPage = async  ({params}: Props ) => {

  const refer = await prisma.user.findFirst({
    where: {
      id: params.id
    }
  })

  if(!refer) {
    notFound()
  }


  return (
    <main className="grid grid-cols-12 gap-3 md:p-4 p-2 h-screen">
      <div className="order-3 md:-order-1 mt-10 md:mt-0 col-span-full md:col-span-6 lg:col-span-4 flex justify-center  rounded-lg bg-blue-700 h-full">
       <div className="h-full md:px-16 px-8 flex flex-col justify-between py-10   ">
        <div className="">
          <img src={logo.src} alt="logo" className="h-[90px] rounded-xl w-[160px]" /> 
        </div>
        <div className="w-full ">
            <h1 className="text-5xl font-bold text-white">Empieza tu viaje con nosotros!</h1><br />
            <p className="text-xs text-gray-300 font-semibold">¿Por qué referirnos? Somos una empresa peruana formal con más de 12 años de trayectoria, 
             que apuesta por la diversidad y equidad de oportunidades para todos.  Estamos en constante crecimiento y nos encanta el  </p>
        </div>
        <div className="bg-blue-800 p-4 rounded-lg">
          <div className="mb-2">
            <p className="text-zinc-200">"Trabajar en este contact center ha sido una experiencia increíble. Empecé sin mucha experiencia y aquí he aprendido muchísimo. El ambiente de trabajo es genial y siempre hay oportunidades para crecer."</p>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <img src="https://res.cloudinary.com/da0d2neas/image/upload/v1711048782/pexels-justin-shaifer-1222271.jpg" className="w-12 h-12 object-cover rounded-lg" alt="" />
            <div className="flex flex-col">
              <p className="text-xs text-zinc-200 p-0  m-0">Andrea Sanchez</p>
              <p className="text-xs text-zinc-200 p-0 m-0">Agente de ventas</p>
            </div>
          </div>
        </div>
       </div>
      </div>
      <div className="col-span-full  md:col-span-6 lg:col-span-8 flex justify-center items-center h-full">
       <ReferrealForm id={params.id} refer={refer} />
      </div>
    </main>
  )
}
export default ReferidoPage