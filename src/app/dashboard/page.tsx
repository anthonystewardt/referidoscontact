"use client";
import React, { useState, useEffect } from 'react';
import ViewDataReferrealsByReferreal from '@/components/tables/ViewDataReferrealsByReferreal';
import { HeartFilledIcon, BackpackIcon } from '@radix-ui/react-icons';
import { getCookie } from 'cookies-next';
import { FiDollarSign, FiCopy } from "react-icons/fi";
import Cookies from "js-cookie";
import InfoCardSecondary from '@/components/cards/InfoCardSecondary';
import InfoCardActive from '@/components/cards/InfoCardActive';
import InfoCreditUserCard from '@/components/cards/InfoCreditUser';
import { useRouter } from 'next/router';

const DashboardPage = () => {
  const userId = Cookies.get('userId');
  const [buttonText, setButtonText] = useState('Copiar enlace');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}/referidos/${userId}`);
    setButtonText('Copiado');
    setTimeout(() => {
      setButtonText('Copiar enlace');
    }, 1000); // Cambia el texto de vuelta después de 1 segundo
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-9 mt-10 gap-3">
        {userId && <InfoCardSecondary userId={userId} />}
        {userId && <InfoCardActive userId={userId} />}
        {userId && <InfoCreditUserCard userId={userId} />}
      </div>

      <div className="my-5">
        <div className=" lg:w-2/3 w-full flex flex-col md:flex-row md:items-center md:justify-between px-5 py-3 rounded-lg bg-white shadow-xl">
          <p>
            <span className='text-blue-800 font-semibold'>Enlace</span>:{" "}
            <span>
              {userId &&
                `${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}/referidos/${userId}`}
            </span>{" "}
          </p>
          <button
            className="flex items-center lg:gap-1 font-semibold md:px-3 py-1 rounded-lg mt-2"
            onClick={handleCopyLink}
          >
            <FiCopy /> {buttonText}
          </button>
        </div>
      </div>
      <div className="my-5">
        <ViewDataReferrealsByReferreal />
      </div>
    </div>
  );
};

export default DashboardPage;
