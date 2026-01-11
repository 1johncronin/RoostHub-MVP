export const MOTORSPORT_MAKES = [
  { name: 'KTM', types: ['machine'], categories: ['Motocross', 'Enduro', 'Dual Sport'] },
  { name: 'Yamaha', types: ['machine'], categories: ['Motocross', 'Enduro', 'Trail'] },
  { name: 'Honda', types: ['machine'], categories: ['Motocross', 'Enduro', 'Trail'] },
  { name: 'Kawasaki', types: ['machine'], categories: ['Motocross', 'Enduro'] },
  { name: 'Husqvarna', types: ['machine'], categories: ['Motocross', 'Enduro'] },
  { name: 'GasGas', types: ['machine'], categories: ['Motocross', 'Enduro'] },
  { name: 'Beta', types: ['machine'], categories: ['Enduro', 'Trials'] },
  { name: 'Sherco', types: ['machine'], categories: ['Enduro', 'Trials'] },
  { name: 'Suzuki', types: ['machine'], categories: ['Motocross', 'Enduro'] },
  { name: 'Polaris', types: ['machine'], categories: ['Mountain', 'Trail', 'Utility'] },
  { name: 'Ski-Doo', types: ['machine'], categories: ['Mountain', 'Trail', 'Utility'] },
  { name: 'Arctic Cat', types: ['machine'], categories: ['Mountain', 'Trail'] },
  { name: 'Lynx', types: ['machine'], categories: ['Mountain', 'Trail'] },
  { name: 'Timbersled', types: ['part'], categories: ['Snowbike Kit'] },
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
  'KTM': ['125 SX', '150 SX', '250 SX', '250 SX-F', '350 SX-F', '450 SX-F', '150 XC-W', '250 XC-W', '300 XC-W', '350 EXC-F', '500 EXC-F', '690 Enduro R'],
  'Yamaha': ['YZ125', 'YZ250', 'YZ250F', 'YZ450F', 'YZ250X', 'YZ250FX', 'WR250F', 'WR450F', 'Ténéré 700'],
  'Honda': ['CRF150R', 'CRF250R', 'CRF450R', 'CRF250RX', 'CRF450RX', 'CRF450RL', 'CRF250F', 'CRF300L'],
  'Polaris': ['PRO RMK 850', 'RMK Khaos 850', 'PRO RMK 9R', 'Series 9', 'Titan', 'Indy'],
  'Ski-Doo': ['Summit X', 'Summit Expert', 'Freeride', 'Renegade', 'MXZ'],
};

export function getEstimatedValue(make: string, model: string, year: number) {
    // Omniscient stub: In a real app, this would query a price-history DB
    const base = 5000;
    const yearBonus = (year - 2010) * 400;
    return base + yearBonus;
}
