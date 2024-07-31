"use client";

import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { UserResonse } from '@/interface/user';
import { FiCopy } from 'react-icons/fi';
import { sumaTotal } from '@/helpers/sumaTotal';
import { CiDollar } from "react-icons/ci";

interface Props {
  userId: string
}

const InfoCreditUserCard =  ({userId}: Props) => {

  const [currentId, setCurrentId] = useState("")
  const [ferrealNumber, setFerrealnumber] = useState(0)

  useEffect(() => {
    const userId = Cookies.get('userId')
    console.log(userId)
    setCurrentId(userId || "")
    getInfo()
  }, [currentId])
  

  const getInfo = async () => {
    const response = await fetch(`/api/users/${userId}`)
    const data: UserResonse = await response.json()
    
    // setFerrealnumber(data.users.credit || 0)
    setFerrealnumber(sumaTotal({refers: data.users.Referreal}))
  }

  return (
    <div className="col-span-full md:col-span-3 flex gap-3  px-8 py-4 rounded-lg shadow-sm bg-white">
          <div className=" rounded-full md:h-20 md:w-20 h-10 w-10 flex items-center justify-center bg-sky-100">
            <CiDollar className="h-10 w-10 text-blue-600 font-bold" />
          </div>
          <div className="flex flex-col ">
            <h2 className="text-2xl md:text-3xl font-semibold">{
              `S/.${ferrealNumber}` || 0
              }</h2>
            <p className="text-1xl font-semibold">Bono de ganancia</p>
          </div>
        </div>
  )
}
export default InfoCreditUserCard