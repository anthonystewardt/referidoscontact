"use client";
import React, { useState } from "react";
import logo from "@/../../public/logocontactbg.png";
import { HomeIcon, AvatarIcon } from "@radix-ui/react-icons"; // Import only used icons
import NavigationItem from "@/components/navbar/dashboard/NavigationItem";
import SignoutDashboardButton from "@/components/buttons/SignoutDashboard";
import { RiMenu2Fill } from "react-icons/ri";

interface Props {
  children: React.ReactNode;
}

const naviagtionList = [
  {
    name: "Dashboard",
    icon: HomeIcon,
    route: "/dashboard",
  },
  {
    name: "Perfil",
    icon: AvatarIcon,
    route: "/dashboard/profile",
  },
  // {
  //   name: 'Configuración',
  //   icon: GearIcon,
  //   route: '/dashboard/settings'
  // }
];

const LayoutDashboard = ({ children }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="grid grid-cols-12 relative">
      {/* este es el icono hamburguesa */}
      <RiMenu2Fill
        className="lg:hidden absolute top-5 left-5 cursor-pointer z-50"
        onClick={toggleMenu}
      />

      {/* este menu */}
      <div
        className={`col-span-2 lg:flex justify-between border-2 hidden  flex-col bg-white h-screen lg:translate-x-0 transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static fixed top-0 left-0 z-20`}
      >
        <div className="flex flex-col px-10">
          <div className="mt-10 text-center flex justify-center">
            <img src={logo.src} alt="logo" className="h-[100px] w-[160px]" />
          </div>
          <ul className="flex flex-col gap-2 mt-10">
            {naviagtionList.map((item, index) => (
              <NavigationItem key={index} title={item.name} path={item.route}>
                <item.icon className="h-6 w-6" />
              </NavigationItem>
            ))}
          </ul>
        </div>
        <div className="flex justify-center mb-10">
          <SignoutDashboardButton />
        </div>
      </div>

      {/* overlay para cerrar el menú */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-white z-40 lg:hidden"
          onClick={toggleMenu}
        >
          <div
            className="fixed inset-0 bg-white opacity-90 "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col px-10 py-10 h-full">
              <div className="mt-10 text-center flex justify-center">
                <img
                  src={logo.src}
                  alt="logo"
                  className="h-[100px] w-[160px]"
                />
              </div>
              <ul className="flex flex-col gap-2 mt-10 bg-white">
                {naviagtionList.map((item, index) => (
                  <NavigationItem
                    key={index}
                    title={item.name}
                    path={item.route}
                  >
                    <item.icon className="h-6 w-6" />
                  </NavigationItem>
                ))}
              </ul>
              <div className="flex justify-center mt-auto mb-10">
                <SignoutDashboardButton />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="lg:col-span-10 col-span-full lg:px-20 px-5 py-20 lg:py-10 bg-slate-100 h-screen overflow-y-auto">
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default LayoutDashboard;
