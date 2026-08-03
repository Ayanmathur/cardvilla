import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Card Villa database...\n');

  // ── Admin User ──────────────────────────────────────────
  const adminPhone = '9999999999';
  const adminPassword = 'admin123';
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { phone: adminPhone },
    update: {},
    create: {
      phone: adminPhone,
      passwordHash,
      role: UserRole.admin,
      name: 'Card Villa Admin',
    },
  });
  console.log(`✅ Admin user created: ${admin.phone} (role: ${admin.role})`);

  // ── Business Card Category ──────────────────────────────
  const businessCardCategory = await prisma.category.upsert({
    where: { slug: 'business-card' },
    update: {},
    create: {
      name: 'Business Card',
      slug: 'business-card',
    },
  });
  console.log(`✅ Category created: "${businessCardCategory.name}" (slug: ${businessCardCategory.slug})`);

  console.log('\n🎉 Seed complete!\n');
  console.log('──────────────────────────────────');
  console.log('Admin login credentials:');
  console.log(`  Phone: ${adminPhone}`);
  console.log(`  Password: ${adminPassword}`);
  console.log('──────────────────────────────────');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
