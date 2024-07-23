"use client"

import ProfilePage from "@/components/shared/ProfilePage";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


const Profile =  ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const { userId } = useAuth();

  if (!userId) redirect("/sign-in");

  return (
    <>
      <ProfilePage userId={userId} page = {page} />
    </>
  );
};

export default Profile;