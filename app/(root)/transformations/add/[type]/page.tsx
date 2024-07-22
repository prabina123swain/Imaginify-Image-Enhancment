"use client";
import { useAuth } from "@clerk/nextjs";
import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { useEffect, useState } from "react";

interface User {
  _id: string;
  creditBalance: number;
}

const AddTransformationTypePage = ({ params: { type } }: SearchParamProps) => {
  const transformation = transformationTypes[type];
  const [user,setUser]=useState<User |null> (null);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        redirect('/sign-in');
      } else {
        const fetchedUser = await getUserById(userId);
        setUser(fetchedUser);
      }
    };

    fetchUser();
  }, [userId]);

 // console.log("userid ",userId,"user",user);


      
  return (     
    <>
        <Header 
        title={transformation.title} 
        subtitle={transformation.subTitle} />
        
      <section className="mt-10">
       {
        !user ?
          (
           <div className="w-full h-full flex justify-center items-center">Loading...</div>
          ):(
            <TransformationForm
            action='Add'
            userId={user._id}
            type={transformation.type as TransformationTypeKey}
            creditBalance={user.creditBalance}
            />
          )
       }
      </section>
    </>
  )
}

export default AddTransformationTypePage