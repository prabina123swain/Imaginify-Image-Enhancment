import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/shared/Header";
import { getUserById } from "@/lib/actions/user.actions";
import { getUserImages } from "@/lib/actions/image.actions"; // Importing the necessary function
import { User } from "@clerk/nextjs/server";
import { IImage } from "@/app/(root)/transformations/[id]/page";
import { Collection } from "./Collection";

interface ProfileProps {
  userId: string;
  page: number;
}


const ProfilePage = ({ userId, page }: ProfileProps) => {
  const [user, setUser] = useState<any>(null);
  const [images, setImages] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndImages = async () => {
      try {
        const fetchedUser = await getUserById(userId);
        setUser(fetchedUser);
        const fetchedImages = await getUserImages({ page, userId: fetchedUser._id });
        setImages(fetchedImages);

      } catch (error) {
        console.error("Error fetching user or images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndImages();
  }, [userId, page]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <>
      <Header title="Profile" />

      <section className="profile">
        <div className="profile-balance">
          <p className="p-14-medium md:p-16-medium">CREDITS AVAILABLE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/coins.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-dark-600">{user.creditBalance}</h2>
          </div>
        </div>

        <div className="profile-image-manipulation">
          <p className="p-14-medium md:p-16-medium">IMAGE MANIPULATION DONE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/photo.svg"
              alt="photo"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-dark-600">{images.data.length}</h2>
          </div>
        </div>
      </section>

      <section className="mt-8 md:mt-14">
      <Collection
          images={images?.data}
          totalPages={images.totalPages}
          page={page}
        />
      </section>
    </>
  );
};

export default ProfilePage;
