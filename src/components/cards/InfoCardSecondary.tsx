"use client";
import prisma from '@/libs/db';
import { HeartFilledIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { ReferrealI } from '@/interface/referreals';


interface Props {
  userId: string
}

const InfoCardSecondary =  () => {

  const [currentId, setCurrentId] = useState("")
  const [ferrealNumber, setFerrealnumber] = useState(0)

  useEffect(() => {
    const userId = Cookies.get('userId')
    setCurrentId(userId || "")
    getInfo()
  }, [currentId])
  

  const getInfo = async () => {
    const response = await fetch(`http://localhost:3000/api/referreals/${currentId}`)
    const data: ReferrealI = await response.json()
    console.log(data)
    setFerrealnumber(data.referreals?.length ?? 0)
  }

  return (
    <div className="col-span-3 flex gap-3  px-8 py-4 rounded-lg shadow-sm bg-white">
          <div className=" rounded-full h-20 w-20 flex items-center justify-center bg-sky-100">
            <HeartFilledIcon className="h-10 w-10 text-blue-600" />
          </div>
          <div className="flex flex-col ">
            <h2 className="text-3xl font-semibold">{
              `${ferrealNumber}` || 0
              }</h2>
            <p className="text-1xl font-semibold">Referidos </p>
          </div>
        </div>
  )
}
export default InfoCardSecondary