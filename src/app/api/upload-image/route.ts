import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { uploadImage } from '@/lib/blob';
import { db } from '@/lib/db';
import { z } from 'zod';

// Schema for image upload request
const uploadSchema = z.object({
  imageData: z.string(),
  prompt: z.string().min(1).max(500),
});

export async function POST(request: Request) {
  try {
    // Get the user's session
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the user from the database
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Parse and validate the request body
    const body = await request.json();
    const validationResult = uploadSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const { imageData, prompt } = validationResult.data;

    // Convert base64 to blob
    const base64Data = imageData.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Create a File object from the buffer
    const file = new File([buffer], `image-${Date.now()}.png`, { type: 'image/png' });
    
    // Upload image to Vercel Blob
    const { url, key } = await uploadImage(file);

    // Save image to database
    const image = await db.image.create({
      data: {
        imageUrl: url,
        storageKey: key,
        prompt,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true, imageUrl: url, imageId: image.id });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}