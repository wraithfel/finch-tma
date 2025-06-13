'use client'

import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';

interface UserData {
  id: number,
  first_name: string,
  last_name?: string,
  username: string,
  language_code: string,
  is_premium?: boolean
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (WebApp.initDataUnsafe.user){
      setUserData(WebApp.initDataUnsafe.user as UserData)
    }
  })

  return (
    <main className='p-4'>
      {userData ?
      (
        <li className='text-2xl font-bold mb-4'>
          <ul>ID: {userData.id}</ul>
          <ul>First Name : {userData.first_name}</ul>
          <ul>Last Name: {userData.last_name}</ul>
          <ul>Username : {userData.username}</ul>
          <ul>Language: {userData.language_code}</ul>
          <ul>Is Premium: {userData.is_premium ? "Yes" : "No"}</ul>
        </li>
      ) :
      (
        <div className='font-bold text-3xl text-amber-300'>
          Loading....
        </div>
      )
    }
    </main>
    )
}