import { prisma } from '../prisma.service';

const stations = [
  {
    id: 1,
    displayName: 'Alpet',
    active: true,
  },
  {
    id: 2,
    displayName: 'Aytemiz',
    active: true,
  },
  {
    id: 3,
    displayName: 'BP',
    active: true,
  },
  {
    id: 4,
    displayName: 'Kadoil',
    active: true,
  },
  {
    id: 5,
    displayName: 'Opet',
    active: true,
  },
  {
    id: 6,
    displayName: 'Petrol Ofisi',
    active: true,
  },
  {
    id: 7,
    displayName: 'Sunpet',
    active: true,
  },
  {
    id: 8,
    displayName: 'Total Energies',
    active: true,
  },
  {
    id: 9,
    displayName: 'TP',
    active: true,
  },
  {
    id: 10,
    displayName: 'Shell',
    active: false,
  },
];

async function main() {
  stations.forEach(async (station) => {
    const stationExists = await prisma.station.findFirst({
      where: {
        displayName: station.displayName,
      },
    });

    if (stationExists) {
      return;
    }

    await prisma.station.create({
      data: {
        displayName: station.displayName,
        active: station.active,
      },
    });
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
