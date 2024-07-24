import React from 'react';
import Link from 'next/link';
import icon1 from '@/../../public/registergroup1.png';
import Image, { StaticImageData } from 'next/image';

interface Props {
  icon: StaticImageData;
  title: string;
  description: string;
  to: string;
}


const SelectRoleCard = ({icon, title, description, to}: Props) => {
  return (
    <Link href={to}  className="px-4 py-4 rounded-lg md:w-2/3 block border-2 border-zinc-400 hover:border-blue-500 transition ease-out">
      <div className="grid-cols-6 flex  items-center gap-3">
        <div className="col-span-2">
          <Image src={icon} alt="icon" height={40} width={40} />
        </div>
        <div className="col-span-4 ">
          <h1 className=" text-2xl font-semibold text-blue-900">{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  )
}
export default SelectRoleCard