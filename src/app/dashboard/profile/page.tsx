"use client";
import CreditUserForm from '@/components/forms/CreditUserForm';
import DeleteUserForm from '@/components/forms/DeleteUserForm';
import ProfileForm from '@/components/forms/ProfileForm';
import { CreditCard } from '@/interface/credit';
import { UserI } from '@/interface/user';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

const ProfileDashboard = () => {
  const userId = getCookie('userId');
  const [userObject, setUserObject] = useState<UserI | null>(null);
  const [infoCredit, setInfoCredit] = useState<CreditCard | null>(null);

  if (!userId) {
    return <div>Usuario no encontrado</div>;
  }

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  const getUser = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUserObject(data.users);
      if (data.users) {
        getInfocredit(data.users.id);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getInfocredit = async (userId: string) => {
    try {
      const response = await fetch(`/api/credit/${userId}`);
      const data = await response.json();
      if (data.creditCard) {
        setInfoCredit({
          id: data.creditCard.id,
          userId: data.creditCard.userId,
          cardNumber: data.creditCard.cardNumber,
          cardName: data.creditCard.cardName,
          mount: data.creditCard.mount,
          createdAt: new Date(data.creditCard.createdAt),
          updatedAt: new Date(data.creditCard.updatedAt),
        });
      } else {
        setInfoCredit({
          id: "",
          userId: userId,
          cardNumber: "",
          cardName: "",
          mount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    } catch (error) {
      console.error("Error fetching credit data:", error);
      setInfoCredit({
        id: "",
        userId: userId,
        cardNumber: "",
        cardName: "",
        mount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  };

  return (
    <div>
      {userObject && (
        <div>
          <ProfileForm user={userObject} />
        </div>
      )}

      {infoCredit !== null && (
        <CreditUserForm user={infoCredit} userObject={userObject} />
      )}

      {
        infoCredit === null && (
          <CreditUserForm user={{
            id: "",
            userId: userId,
            cardNumber: "",
            cardName: "",
            mount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          
          }} userObject={userObject} />
        )
      }


      
      <DeleteUserForm />
    </div>
  );
};

export default ProfileDashboard;
