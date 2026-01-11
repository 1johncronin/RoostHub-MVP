export interface MachineCategory {
  id: string;
  name: string;
  subCategories: string[];
}

export const MACHINE_CATEGORIES: MachineCategory[] = [
  { 
    id: 'dirt', 
    name: 'Dirt Bike', 
    subCategories: ['Motocross', 'Enduro', 'Dual Sport', 'Trials', 'Cross Country'] 
  },
  { 
    id: 'snow', 
    name: 'Snowmobile', 
    subCategories: ['Mountain', 'Trail', 'Crossover', 'Utility', 'Snowbike Kit'] 
  },
  { 
    id: 'ohv', 
    name: 'OHV / UTV', 
    subCategories: ['Sport Side-by-Side', 'Utility Side-by-Side', 'ATV'] 
  }
];

export const MOTORSPORT_MAKES = [
  // DIRT
  { name: 'KTM', types: ['dirt'], categories: ['Motocross', 'Enduro', 'Dual Sport'] },
  { name: 'Yamaha', types: ['dirt', 'snow', 'ohv'], categories: ['Motocross', 'Enduro', 'Mountain', 'Trail'] },
  { name: 'Honda', types: ['dirt', 'ohv'], categories: ['Motocross', 'Enduro', 'Trail'] },
  { name: 'Kawasaki', types: ['dirt', 'ohv'], categories: ['Motocross', 'Enduro'] },
  { name: 'Husqvarna', types: ['dirt', 'snowbike'], categories: ['Motocross', 'Enduro'] },
  { name: 'GasGas', types: ['dirt'], categories: ['Motocross', 'Enduro'] },
  { name: 'Beta', types: ['dirt'], categories: ['Enduro', 'Trials'] },
  { name: 'Sherco', types: ['dirt'], categories: ['Enduro', 'Trials'] },
  { name: 'Suzuki', types: ['dirt', 'ohv'], categories: ['Motocross', 'Enduro'] },
  // SNOW
  { name: 'Polaris', types: ['snow', 'ohv'], categories: ['Mountain', 'Trail', 'Utility'] },
  { name: 'Ski-Doo', types: ['snow'], categories: ['Mountain', 'Trail', 'Utility'] },
  { name: 'Arctic Cat', types: ['snow', 'ohv'], categories: ['Mountain', 'Trail'] },
  { name: 'Lynx', types: ['snow'], categories: ['Mountain', 'Trail'] },
  { name: 'Timbersled', types: ['snowbike'], categories: ['Snowbike Kit'] },
];

export const BRAND_RETAILERS: Record<string, { oem: string; aftermarket: string; specialties?: string[] }> = {
  'KTM': { oem: 'Partzilla', aftermarket: 'Rocky Mountain ATV/MC', specialties: ['AOMC', 'KTM World'] },
  'Yamaha': { oem: 'Partzilla', aftermarket: 'RevZilla', specialties: ['Yamaha Sports Center'] },
  'Honda': { oem: 'Partzilla', aftermarket: 'Rocky Mountain ATV/MC', specialties: ['Honda Parts House'] },
  'Polaris': { oem: 'Polaris OEM', aftermarket: 'Rocky Mountain ATV/MC', specialties: ['Starting Line Products'] },
  'Ski-Doo': { oem: 'BRP OEM', aftermarket: 'Dennis Kirk', specialties: ['ZRP', 'Backwoods BMP'] },
  'Arctic Cat': { oem: 'Country Cat', aftermarket: 'Rocky Mountain ATV/MC' },
};

export const MACHINE_MODELS: Record<string, string[]> = {
  'KTM': ['125 SX', '250 SX', '250 SX-F', '350 SX-F', '450 SX-F', '150 XC-W', '250 XC-W', '300 XC-W', '350 EXC-F', '500 EXC-F', '690 Enduro R'],
  'Yamaha': ['YZ125', 'YZ250', 'YZ250F', 'YZ450F', 'YZ250X', 'YZ250FX', 'WR250F', 'WR450F', 'Ténéré 700', 'Mountain Max', 'Sidewinder', 'YXZ1000R'],
  'Honda': ['CRF150R', 'CRF250R', 'CRF450R', 'CRF250RX', 'CRF450RX', 'CRF450RL', 'CRF250F', 'CRF300L', 'Talon 1000R', 'TRX450R'],
  'Polaris': ['PRO RMK 850', 'RMK Khaos 850', 'PRO RMK 9R', 'Series 9', 'Titan', 'Indy', 'RZR Pro R', 'RZR Turbo R', 'Sportsman 850'],
  'Ski-Doo': ['Summit X', 'Summit Expert', 'Freeride', 'Renegade', 'MXZ', 'Expedition'],
  'Husqvarna': ['FC 250', 'FC 450', 'FE 350', 'FE 501', 'TE 300', 'FX 350'],
  'GasGas': ['MC 250F', 'MC 450F', 'EC 300', 'EX 350F'],
  'Arctic Cat': ['M 8000 Alpha One', 'Hardcore', 'Blast', 'Wildcat XX', 'Alterra'],
  'Beta': ['300 RR', '350 RR-S', '430 RR-S', 'Xtrainer'],
  'Timbersled': ['RIOT 120', 'ARO 129', 'RIOT 3'],
};

export function getEstimatedValue(make: string, model: string, year: number) {
    const base = 5000;
    const yearBonus = (year - 2010) * 400;
    return base + yearBonus;
}