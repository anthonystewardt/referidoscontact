"use client";
import prisma from '@/libs/db';
import { HeartFilledIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { ReferrealI } from '@/interface/referreals';


interface Props {
  userId: string
}

const InfoCardSecondary =  ({userId}: Props) => {

  const [currentId, setCurrentId] = useState("")
  const [ferrealNumber, setFerrealnumber] = useState(0)

  useEffect(() => {
    const userId = Cookies.get('userId')
    setCurrentId(userId || "")
    getInfo()
  }, [userId])
  

  const getInfo = async () => {
    const response = await fetch(`/api/referreals/${userId}`)
    const data = await response.json()
   
    setFerrealnumber(data.referreals?.length ?? 0)
  }

  return (
    <div className="md:col-span-3 col-span-full flex gap-3  px-8 py-4 rounded-lg shadow-sm bg-white">
          <div className=" rounded-full md:h-20 md:w-20 h-10 w-10 flex items-center justify-center bg-sky-100">
            <HeartFilledIcon className="h-10 w-10 text-blue-600" />
          </div>
          <div className="flex flex-col ">
            <h2 className="md:text-3xl text-2xl font-semibold">{
              `${ferrealNumber}`
              }</h2>
            <p className="text-1xl font-semibold">Referidos </p>
          </div>
        </div>
  )
}
export default InfoCardSecondary