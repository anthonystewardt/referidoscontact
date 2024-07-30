
import logo from '@/../../public/logocontactbg.png'
import {  HomeIcon, AvatarIcon, GearIcon, ExitIcon } from '@radix-ui/react-icons'
import NavigationItem from '@/components/navbar/dashboard/NavigationItem';
import LogoutAdmin from '@/components/buttons/LogoutAdmin';
import Image from 'next/image';



interface Props {
  children: React.ReactNode
}


const naviagtionList = [
  {
    name: 'Referidos',
    icon: HomeIcon,
    route: '/admin/home'
  },
  {
    name: 'Usuarios',
    icon: AvatarIcon,
    route: '/admin/usuariosAdmin'
  },
  // {
  //   name: 'Configuración',
  //   icon: GearIcon,
  //   route: '/dashboard/settings'
  // }
]



const LayoutAdminDashboard = ({children}: Props) => {

  

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 flex justify-between  flex-col bg-white h-screen">
        <div className="flex flex-col px-10 ">
          <div className="mt-10 text-center flex justify-center">
            <img   src={logo.src} alt="logo" className="h-[100px] object-cover w-[160px]" />
          </div>
          <ul className="flex flex-col gap-2 mt-10">
            {/* <li className="px-4 flex items-center gap-3 py-3 rounded-lg bg-sky-100 text-blue-900 w-full">
              <HomeIcon className="h-6 w-6" />
              Dashboard</li>
            <li className="px-4 py-3 flex items-center gap-2 rounded-lg  w-full">
              <AvatarIcon className="h-6 w-6" />
              Profile</li>
            <li className="px-4 py-3 flex items-center gap-2 rounded-lg  w-full">
              <GearIcon className="h-6 w-6" />
              Settings</li> */}
            {
              naviagtionList.map((item, index) => (
                <NavigationItem key={index} title={item.name} path={item.route} >
                  <item.icon className="h-6 w-6" />
                </NavigationItem>
              ))
            }

          </ul>
        </div>
      <LogoutAdmin />
      </div>
      <div className="col-span-10 px-20 py-10 bg-slate-100 h-screen overflow-y-auto">
        <div className="">
          
          {children}
        </div>
      </div>
    </div>
  )
}
export default LayoutAdminDashboard;