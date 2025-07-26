import { put } from "@vercel/blob";
import { nanoid } from "nanoid";

export async function uploadImage(file: File) {
  try {
    const filename = `${nanoid()}-${file.name}`;
    const blob = await put(filename, file, {
      access: "public",
    });

    return {
      url: blob.url,
      key: blob.pathname,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
}