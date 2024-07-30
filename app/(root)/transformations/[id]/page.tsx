'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { getImageById } from "@/lib/actions/image.actions";
import { getImageSize } from "@/lib/utils";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import TransformedImage from "@/components/shared/TransoformedImage";
import Spinner from "@/components/shared/Spinner";

export interface IImage extends Document {
  title: string;
  transformationType: string;
  publicId: string;
  secureURL: string; 
  width?: number;
  height?: number;
  config: object; 
  transformationUrl?: string; 
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  _id:string;
  author: {
    _id: string;
    clerkId:string;
    firstName: string;
    lastName: string;
  }
  createdAt?: Date;
  updatedAt?: Date;
 }

const ImageDetails = ({ params: { id } } :SearchParamProps ) => {
  
  const { userId } = useAuth();
  const [image, setImage] = useState<IImage | null>(null);
  const [loading, setLoading] = useState(true);
 
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
    return <Spinner/>
  }

  if (!image) {
    return <div>Image not found.</div>;
  }

  console.log("userid" ,userId ,image.author.clerkId);

  return (
    <>
      <Header title={image.title} />

      <section className="mt-5 flex flex-wrap gap-4">
        <div className="p-14-medium md:p-16-medium flex gap-2">
          <p className="text-dark-600">Transformation:</p>
          <p className="capitalize text-purple-400">
            {image.transformationType}
          </p>
        </div>

        {image.prompt && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2 ">
              <p className="text-dark-600">Prompt:</p>
              <p className="capitalize text-purple-400">{image.prompt}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Color:</p>
              <p className="capitalize text-purple-400">{image.color}</p>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Aspect Ratio:</p>
              <p className="capitalize text-purple-400">{image.aspectRatio}</p>
            </div>
          </>
        )}
      </section>

      <section className="mt-10 border-t border-dark-400/15">
        <div className="transformation-grid">
          <div className="flex flex-col gap-4">
            <h3 className="h3-bold text-dark-600">Original</h3>

            <Image
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "height")}
              src={image.secureURL}
              alt="image"
              className="transformation-original_image"
            />
          </div>

          <TransformedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
          />
        </div>

        {userId === image.author.clerkId && (
          <div className="mt-4 space-y-4">
            <Button asChild type="button" className="submit-button capitalize">
              <Link href={`/transformations/${image._id}/update`}>
                Update Image
              </Link>
            </Button>

            <DeleteConfirmation imageId={image._id} />
          </div>
        )}
      </section>
    </>
  );
};

export default ImageDetails;
