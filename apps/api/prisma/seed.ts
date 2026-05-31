import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const categories = [
        { name: 'Revenus', icon: 'briefcase', color: '#4CAF50' },
        { name: 'Alimentation', icon: 'cart', color: '#00BCD4' },
        { name: 'Logement', icon: 'home', color: '#5C6BC0' },
        { name: 'Transport', icon: 'car', color: '#26C6DA' },
        { name: 'Restaurants', icon: 'utensils', color: '#FF8A65' },
        { name: 'Loisirs', icon: 'film', color: '#9575CD' },
        { name: 'Abonnements', icon: 'repeat', color: '#7E57C2' },
        { name: 'Santé', icon: 'heart', color: '#4DB6AC' },
        { name: 'Épargne', icon: 'piggy', color: '#1A237E' },
    ];

    await prisma.category.createMany({
        data: categories,
        skipDuplicates: true,
    });

    console.log('Seed terminé — catégories créées !');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());