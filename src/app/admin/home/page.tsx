"use client";
import ShowrefersList from '@/components/tables/ShowrefersList';
import ShowrefersListSearch from '@/components/tables/ShowUserBySearch';
import ShowUsersList from '@/components/tables/ShowUsersList';
import { Input } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AdminHomePage = () => {
  const [showRefers, setShowRefers] = useState(false)
  const [showUsers, setshowUsers] = useState(false)
  const [valueSearch, setValueSearch] = useState("")
  const [showSearchList, setShowSearchList] = useState(false)
  const [showSearchUserRefList, setshowSearchUserRefList] = useState(false)
  const [currentShowStr, setCurrentShowStr] = useState("refers")

  useEffect(() => {
    setShowRefers(true)
    setshowUsers(false) 
  }, [])
  

  const handleShowRefers = (type: string) =>  {
    if(type === 'refers')  {
      setShowRefers(true)
      setshowUsers(false)
      setShowSearchList(false)
    }else {
      setShowRefers(false)
      setshowUsers(true)
      setShowSearchList(false)
    }
  }


  const handleChangeValueSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.target.value)
  }

  const onSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // // http://localhost:3000/api/referreals/dni/816371382
    // const  {data} = await axios.get(`/api/referreals/dni/${valueSearch}`)
    if(showRefers){
      setCurrentShowStr("refers")
    }else {
      setCurrentShowStr("users")
    }
    setShowSearchList(true)
    setShowRefers(false)
    setshowUsers(false)
  }


  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Home</h1>
          <div className="flex items-center gap-3 mt-5">
            <button onClick={() => handleShowRefers("refers")} className={` text-xs ${showRefers ? "px-4 py-2 rounded-xl bg-zinc-950 text-zinc-100 font-semibold" : "px-4 py-2 rounded-xl bg-zinc-200 text-zinc-800 font-semibold"}`}>Referidos</button>
            <button onClick={() => handleShowRefers("users")} className={` text-xs ${showUsers ? "px-4 py-2 rounded-xl bg-zinc-950 text-zinc-100 font-semibold" : "px-4 py-2 rounded-xl bg-zinc-200 text-zinc-800 font-semibold"}`}>Usuarios registrados</button>
          </div>
        </div>
            <form className="" onSubmit={onSubmitSearch}>
              <Input type="text"
                color="default"
                className="w-80 shadow-lg rounded-lg"
                onChange={handleChangeValueSearch}
                label="Buscar usuario por dni:" />
                <button className='hidden' type='submit'>
                  Buscar
                </button>
            </form>
      </div> 
      <div className="mt-5">
        {showRefers && !showSearchList && <ShowrefersList />}
        {showUsers && !showSearchList && <ShowUsersList />}
        {!showRefers && !showUsers  && <ShowrefersListSearch dni={valueSearch} type={currentShowStr} />}
      </div>
    </div>
  )
}
export default AdminHomePage