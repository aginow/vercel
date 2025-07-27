import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { generateImage } from "@/lib/replicate";
import { uploadImage } from "@/lib/blob";
import { db } from "@/lib/db";
import { z } from "zod";

const generateImageSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  inputImages: z.array(z.string().url()).optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the user from the database
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const { prompt, inputImages } = generateImageSchema.parse(body);

    // Generate image using Replicate
    const imageUrls = await generateImage(prompt, inputImages);

    if (!imageUrls || imageUrls.length === 0) {
      return NextResponse.json(
        { error: "Failed to generate image" },
        { status: 500 }
      );
    }

    const imageUrl = imageUrls[0];

    // Fetch the image and upload to Vercel Blob
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], `${Date.now()}.png`, { type: "image/png" });
    const { url, key } = await uploadImage(file);

    // Save to database
    const image = await db.image.create({
      data: {
        prompt,
        imageUrl: url,
        storageKey: key,
        userId: user.id,
      },
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}