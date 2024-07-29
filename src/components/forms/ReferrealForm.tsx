"use client";
import React, { useEffect, useState } from 'react'
import {Input} from "@nextui-org/input";
import { Button, Select, SelectItem } from '@nextui-org/react';
import { User } from '@prisma/client';
import { useForm, SubmitHandler } from "react-hook-form"
import { Toaster } from 'react-hot-toast';
import { notifyError, notifySuccess } from '@/helpers/notifies';
import {useRouter} from 'next/navigation'

interface JobI {
  id: number,
  name: string,
}

type Inputs = {
  names: string
  lastnames: string
  email: string
  phone: string
  dni: string
  job: string
}


interface Props {
  id: string,
  refer: User
}

const ReferrealForm = ({id,refer}: Props) => {
  const [jobs, setJobs] = useState<JobI[] | [] >([])
  const router = useRouter()
  const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm<Inputs>()

  useEffect(() => {
    fetch("https://work.contactamericas.com/api/services").then((res) => {
      return res.json()
    }).then((data) => {
      console.log({data})
      const jobsActive = data.services.filter((job: any) => job.status === true)
      console.log({jobsActive})
      const transformedJobs = jobsActive.map((job: any) => {
        return {
          id: job.id,
          name: job.title
        }
      })
      setJobs(transformedJobs)
    })
  }, [])
  

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
    //   {
    //     "userId": "clyz9nqsa0000lqzy9mpyamhf",
    //     "names": "Omar ",
    //     "lastnames": "gonzales",
    //     "email": "omar.test@gmail.com",
    //     "phone": "8163713",
    //     "dni": "816371382",
    //     "job": "Backend developer",
    //     "code": "gahsasr12"
    // }
      const obj = {
        userId: id,
        names: data.names,
        lastnames: data.lastnames,
        email: data.email,
        phone: data.phone,
        dni: data.dni,
        job: data.job,
        code: id
      }
      console.log({obj})

      const response = await fetch("/api/referreals", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json"
        }
      }).then((res) => res.json())

      if(response.status === 201) {
        notifySuccess("Referido registrado")
        router.push("/referidos/accept")
      }
    
    } catch (error) {
      console.log({error})
      notifyError("Error al registrar usuario") 
    }
  }

  return (
    <form className="md:w-2/3 lg:w-1/2 w-full " onSubmit={ handleSubmit(onSubmit) }>
    <Toaster />
    <h1 className="text-3xl font-bold text-center mb-5">Postular</h1>
    <p className="text-xs text-gray-400 pb-2">Referido de: {refer?.name}</p>
    
    <div className="grid grid-cols-6 gap-3 px-4">
      <div className="lg:col-span-3 col-span-full">
        <Input type="text" label="Nombres"
          {...register("names", { required: true })}
        />
        {
          errors.names && <span className="text-red-500 text-xs">Este campo es requerido</span>
        }
      </div>
      <div className="lg:col-span-3 col-span-full">
        <Input type="text" label="Apellidos"
          {...register("lastnames", { required: true })}
        />
        {
          errors.lastnames && <span className="text-red-500 text-xs">Este campo es requerido</span>
        }
      </div>
      <div className="lg:col-span-3 col-span-full">
        <Input type="email" label="Correo"
          {...register("email", { required: true })}
        />
        {
          errors.email && <span className="text-red-500 text-xs">Este campo es requerido</span>
        }
      </div>
      <div className="lg:col-span-3 col-span-full">
        <Input type="text" label="Celular"
          {...register("phone", { required: true })}
        />
        {
          errors.phone && <span className="text-red-500 text-xs">Este campo es requerido</span>
        }
      </div>
      <div className="lg:col-span-3 col-span-full">
        <Input type="text" label="DNI"
          {...register("dni", { required: true })}
        />
        {
          errors.dni && <span className="text-red-500 text-xs">Este campo es requerido</span>
        }
      </div>
      <div className="lg:col-span-3 col-span-full">
      {
        jobs.length > 0 && (
          <Select label="Puesto"
            {...register("job", { required: true })}
          >
            {
              jobs.map((job) => {
                return (
                  <SelectItem key={job.name} value={job.name}>{job.name}</SelectItem>
                )
              })
            }
          </Select>
        )
      }
      {
        errors.job && <span className="text-red-500 text-xs">Este campo es requerido</span>
      }
      </div>
      <div className="col-span-full">
        <Button color="primary" type="submit" className="w-full">Postular</Button>
      </div>
    </div>
  </form>
  )
}
export default ReferrealForm