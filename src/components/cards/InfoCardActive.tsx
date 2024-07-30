"use client";
import prisma from '@/libs/db';
import { BackpackIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { get } from 'http';
import { ReferrealI } from '@/interface/referreals';
import { set } from 'react-hook-form';


interface Props {
  userId: string
}

const InfoCardActive =  () => {

  const [currentId, setCurrentId] = useState("")
  const [ferrealNumber, setFerrealnumber] = useState(0)

  useEffect(() => {
    const userId = Cookies.get('userId')
    console.log(userId)
    setCurrentId(userId || "")
    getInfo()
  }, [])
  

  const getInfo = async () => {
    const response = await fetch(`http://localhost:3000/api/referreals/${currentId}`)
    const data = await response.json()
    console.log(data)
    const referreals = data.referreal?.filter((referreal: any) => referreal.active === true)
    if(!referreals) return setFerrealnumber(0)
    setFerrealnumber(referreals?.length)
  }

  return (
    <div className="col-span-3 flex gap-3  px-8 py-4 rounded-lg shadow-sm bg-white">
          <div className=" rounded-full h-20 w-20 flex items-center justify-center bg-sky-100">
            <BackpackIcon className="h-10 w-10 text-blue-600" />
          </div>
          <div className="flex flex-col ">
            <h2 className="text-3xl font-semibold">{
              `${ferrealNumber}` || 0
              }</h2>
            <p className="text-1xl font-semibold">Aceptados </p>
          </div>
        </div>
  )
}
export default InfoCardActive