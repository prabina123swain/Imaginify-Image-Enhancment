// src/app/api/images/[id]/route.ts
import { NextResponse } from "next/server";
import { getImageById } from "@/lib/actions/image.actions";

export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const image = await getImageById(id);
    //console.log("image",image);
    return NextResponse.json(image);
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.error();
  }
}
