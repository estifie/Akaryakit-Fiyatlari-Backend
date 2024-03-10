const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const stations = [
  {
    displayName: 'Alpet',
    active: true,
    hasAPI: false,
    url: 'https://www.alpet.com.tr/tr-TR/akaryakit-fiyatlari?&city={CITY_NAME}',
    parseText:
      'body main div.pageContent div.container div.row div.col-lg-12 div.box div.table-responsive table.table tbody tr',
    hasGasoline: true,
    hasDiesel: true,
    hasLpg: false,
    cityNameKey: null,
    districtNameKey: '1',
    gasolineKey: '4',
    dieselKey: '3',
    lpgKey: null,
  },
  {
    displayName: 'Aytemiz',
    active: true,
    hasAPI: false,
    url: 'https://www.aytemiz.com.tr/akaryakit-fiyatlari/benzin-fiyatlari?city=',
    parseText:
      'form#form1 section.page-content div.price-table-responsive table#fuel-price-table tbody tr',
    hasGasoline: true,
    hasDiesel: true,
    hasLpg: false,
    cityNameKey: 'City',
    districtNameKey: '0',
    gasolineKey: '1',
    dieselKey: '2',
    lpgKey: null,
  },
  {
    displayName: 'BP',
    active: true,
    hasAPI: true,
    url: 'https://www.bp.com/bp-tr-pump-prices/api/PumpPrices?strCity=',
    parseText: null,
    hasGasoline: true,
    hasDiesel: true,
    hasLpg: true,
    cityNameKey: 'City',
    districtNameKey: 'District',
    gasolineKey: 'Benzin',
    dieselKey: 'Motorin',
    lpgKey: 'LpgPrice',
  },
  {
    displayName: 'Kadoil',
    active: true,
    hasAPI: false,
    url: 'https://admin.kadoil.com/api/price-lists/prices',
    parseText: 'div table tbody tr',
    hasGasoline: true,
    hasDiesel: true,
    hasLpg: true,
    cityNameKey: null,
    districtNameKey: '0',
    gasolineKey: '1',
    dieselKey: '2',
    lpgKey: '8',
  },
  {
    displayName: 'Opet',
    active: true,
    hasAPI: true,
    url: 'https://api.opet.com.tr/api/fuelprices/prices?ProvinceCode={ID}&IncludeAllProducts=true',
    parseText: null,
    hasGasoline: true,
    hasDiesel: true,
    hasLpg: false,
    cityNameKey: null,
    districtNameKey: 'districtName',
    gasolineKey: 'A100',
    dieselKey: 'A128',
    lpgKey: null,
  },
  {
    displayName: 'Petrol Ofisi',
    active: true,
    hasAPI: false,
    url: 'https://www.petrolofisi.com.tr/akaryakit-fiyatlari/{CITY_NAME}-akaryakit-fiyatlari',
    parseText:
      'body section.prices-list.fuel-module div.container div.position-relative div.fuel-items div.d-none table.table-prices tbody tr',
    hasGasoline: true,
    hasDiesel: true,
    hasLpg: true,
    cityNameKey: null,
    districtNameKey: '0',
    gasolineKey: '1',
    dieselKey: '3',
    lpgKey: '4',
  },
  {
    displayName: 'Sunpet',
    active: true,
    hasAPI: false,
    url: 'https://www.sunpettr.com.tr/yakit-fiyatlari-{CITY_NAME}',
    parseText:
      'body main div#fuel-prices-page section.fuel-prices-table-section div.container div.primary-table-wrapper table.primary-table tbody tr',
    hasGasoline: true,
    hasDiesel: true,
    hasLpg: false,
    cityNameKey: null,
    districtNameKey: '0',
    gasolineKey: '2',
    dieselKey: '3',
    lpgKey: null,
  },
  {
    displayName: 'Total Energies',
    active: true,
    hasAPI: true,
    url: 'https://apimobiletest.oyakpetrol.com.tr/exapi/fuel_prices/{CITY_ID}',
    parseText: null,
    hasGasoline: true,
    hasDiesel: true,
    hasLpg: false,
    cityNameKey: null,
    districtNameKey: 'county_name',
    gasolineKey: 'kursunsuz_95_excellium_95',
    dieselKey: 'motorin',
    lpgKey: null,
  },
  {
    displayName: 'TP',
    active: true,
    hasAPI: false,
    url: 'https://www.tppd.com.tr/{CITY_NAME}-akaryakit-fiyatlari',
    parseText:
      'body div#page div.wrapper div.contentwrp div.container section#results div.responsivetable table.cf tbody tr',
    hasGasoline: true,
    hasDiesel: true,
    hasLpg: true,
    cityNameKey: null,
    districtNameKey: '0',
    gasolineKey: '1',
    dieselKey: '4',
    lpgKey: '8',
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
      data: station,
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
