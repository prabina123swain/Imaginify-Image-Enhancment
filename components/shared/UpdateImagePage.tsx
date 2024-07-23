"use state"
import { redirect } from "next/navigation";
import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";
import { IImage } from "@/lib/models/image.model";

interface User {
  _id: string;
  creditBalance: number;
}

interface UpdateImagePageProps {
  userId: string | any;
  id: string;
}

const UpdateImagePage = ({ userId, id }: UpdateImagePageProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [image, setImage] = useState<IImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        redirect("/sign-in");
      } else {
        const fetchedUser = await getUserById(userId);
        setUser(fetchedUser);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`/api/images/${id}`);
        const imageData = await response.json();
        setImage(imageData);
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchImage();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!image || !user) {
    return <div>Image/USer not found.</div>;
  }

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];


  return (
    <>
       <Header title={transformation.title} subtitle={transformation.subTitle} />

<section className="mt-10">
  <TransformationForm
    action="Update"
    userId={user._id}
    type={image.transformationType as TransformationTypeKey}
    creditBalance={user.creditBalance}
    config={image.config}
    data={image}
  />
   </section>
    </>
  );
};

export default UpdateImagePage;
