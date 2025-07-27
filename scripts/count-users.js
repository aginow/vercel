const { PrismaClient } = require('@prisma/client');

async function countUsers() {
  const prisma = new PrismaClient();
  
  try {
    const userCount = await prisma.user.count();
    console.log(`📊 Total users in database: ${userCount}`);
    
    // Also show some basic stats
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        _count: {
          select: {
            images: true
          }
        }
      }
    });
    
    console.log('\n👥 User Details:');
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email} (${user.name || 'No name'}) - ${user._count.images} images`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

countUsers();