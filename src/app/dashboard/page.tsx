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
    navigator.clipboard.writeText(`https://contactamericas-referidos.com/${userId}`);
    setButtonText('Copiado');
    setTimeout(() => {
      setButtonText('Copiar enlace');
    }, 1000); // Cambia el texto de vuelta después de 1 segundo
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-9 mt-10 gap-3">
        <InfoCardSecondary />
        <InfoCardActive />
        <InfoCreditUserCard />
      </div>

      <div className="my-5"> 
        <div className="w-1/2 flex items-center justify-between px-5 py-3 rounded-lg bg-white shadow-xl">
          <p>Enlace: <span>https://contactamericas-referidos.com/asanchezy</span> </p>
          <button
            className="flex items-center gap-2 font-semibold px-3 py-1 rounded-lg mt-2"
            onClick={handleCopyLink}
          >
            <FiCopy className="h-5 w-5" /> {buttonText}
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
