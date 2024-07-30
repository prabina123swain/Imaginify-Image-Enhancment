"use client";
import { useAuth } from "@clerk/nextjs";
import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { useEffect, useState } from "react";
import Spinner from "@/components/shared/Spinner";

interface User {
  _id: string;
  creditBalance: number;
}

const AddTransformationTypePage = ({ params: { type } }: SearchParamProps) => {
  const transformation = transformationTypes[type];
  const [user,setUser]=useState<User |null> (null);
  const { userId } = useAuth();

  if (!userId) {
    redirect('/sign-in');
  } 

  useEffect(() => {
    const fetchUser = async () => {
      console.log("user id",userId);
     
        const fetchedUser = await getUserById(userId);
        setUser(fetchedUser);
    };

    fetchUser();
  }, [userId]);

 // console.log("userid ",userId,"user",user);


      
  return (     
    <>
        <Header 
        title={transformation.title} 
        subtitle={transformation.subTitle} />
        
      <section className="mt-10 ">
       {
        !user ?
          (
            <Spinner/>
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