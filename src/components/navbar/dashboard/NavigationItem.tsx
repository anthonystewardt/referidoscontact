"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  title: string;
  path: string;
  children: React.ReactNode;
}


const NavigationItem = ({title, path, children}: Props) => {
  const pathname = usePathname();

  return (
    <Link
    href={path}
      className={`px-4 flex items-center gap-3 py-3 rounded-lg  w-full ${
        pathname === path ? "bg-sky-100 " : ""
      }`}
    >
      {children}
      <span>{title}</span>
    </Link>
  )
}
export default NavigationItem