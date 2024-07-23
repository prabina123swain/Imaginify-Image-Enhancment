"use client"

import UpdateImagePage from "@/components/shared/UpdateImagePage";
import { useAuth } from "@clerk/nextjs";


const Page = ({ params: { id } }: SearchParamProps) => {
  
  const { userId } = useAuth();
  console.log("userid" ,userId);

  return (
    <>
     <UpdateImagePage userId = {userId} id={id} />
    </>
  );
};

export default Page;