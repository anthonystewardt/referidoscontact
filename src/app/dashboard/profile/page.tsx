"use client";
import CreditUserForm from '@/components/forms/CreditUserForm';
import DeleteUserForm from '@/components/forms/DeleteUserForm';
import ProfileForm from '@/components/forms/ProfileForm';
import { CreditI, CreditCard } from '@/interface/credit';
import { UserI } from '@/interface/user';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

const ProfileDashboard = () => {
  const userId = getCookie('userId');
  const [userObject, setUserObject] = useState<UserI | null>(null);
  const [infoCredit, setInfoCredit] = useState<CreditI | null>(null);

  if (!userId) {
    return <div>Usuario no encontrado</div>;
  }

  useEffect(() => {
    getUser();
    if (userId) {
      getInfocredit();
    }
  }, [userId]);

  const getUser = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUserObject(data.users);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getInfocredit = async () => {
    try {
      const response = await fetch(`/api/credit/${userId}`);
      const data = await response.json();
      setInfoCredit(data);
    } catch (error) {
      console.error("Error fetching credit data:", error);
    }
  };

  return (
    <div>
      {userObject && (
        <div>
          <ProfileForm user={userObject} />
          {/* <DeleteUserForm /> */}
        </div>
      )}

      {infoCredit && infoCredit.creditCard && infoCredit.creditCard.id && (
        <div>
          <CreditUserForm user={infoCredit.creditCard} />
        </div>
      )}

      <DeleteUserForm />
    </div>
  );
};

export default ProfileDashboard;
