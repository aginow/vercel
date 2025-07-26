import { PrismaClient } from '@prisma/client';
import { list, del } from '@vercel/blob';

export async function clearDatabase() {
  const prisma = new PrismaClient();
  
  try {
    // Delete all images first (due to foreign key constraints)
    await prisma.image.deleteMany({});
    
    // Delete all users
    await prisma.user.deleteMany({});
    
    // Delete all verification tokens
    await prisma.verificationToken.deleteMany({});
    
    console.log('Database cleared successfully');
  } catch (error) {
    console.error('Error clearing database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function clearBlobStorage() {
  try {
    // List all blobs
    const blobs = await list();
    
    if (blobs.blobs.length > 0) {
      // Extract URLs for deletion
      const urls = blobs.blobs.map(blob => blob.url);
      
      // Delete blobs in batches to avoid rate limiting
      const batchSize = 10;
      for (let i = 0; i < urls.length; i += batchSize) {
        const batch = urls.slice(i, i + batchSize);
        await del(batch);
      }
      
      console.log(`Cleared ${urls.length} blobs from storage`);
    } else {
      console.log('No blobs to clear');
    }
  } catch (error) {
    console.error('Error clearing blob storage:', error);
    throw error;
  }
}