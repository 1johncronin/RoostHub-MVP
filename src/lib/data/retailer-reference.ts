export interface Retailer {
  name: string;
  url: string;
  specialty: string[];
  brands: string[];
  features: string[];
}

export const RECOMMENDED_RETAILERS: Retailer[] = [
  {
    name: 'Partzilla',
    url: 'https://www.partzilla.com',
    specialty: ['OEM Parts', 'Maintenance'],
    brands: ['Honda', 'Yamaha', 'Kawasaki', 'Polaris', 'Suzuki', 'Can-Am', 'Arctic Cat'],
    features: ['Diagrams', 'Bulk Parts']
  },
  {
    name: 'Rocky Mountain ATV/MC',
    url: 'https://www.rockymountainatvmc.com',
    specialty: ['Tires', 'Accessories', 'OEM Parts'],
    brands: ['KTM', 'Yamaha', 'Honda', 'Husqvarna', 'GasGas', 'Kawasaki'],
    features: ['Fast Shipping', 'OEM Diagrams']
  },
  {
    name: 'RevZilla',
    url: 'https://www.revzilla.com',
    specialty: ['Gear', 'Helmets', 'Tires'],
    brands: ['All', 'Premium Gear'],
    features: ['Videos', 'Reviews']
  },
  {
    name: 'AOMC (Appalachian Offroad MC)',
    url: 'https://aomc.mx',
    specialty: ['Hard Parts', 'Performance'],
    brands: ['KTM', 'Husqvarna', 'GasGas', 'Beta', 'Sherco'],
    features: ['Hard-to-find parts', 'Performance Kits']
  },
  {
    name: 'Slavens Racing',
    url: 'https://slavensracing.com',
    specialty: ['Performance', 'Engine', 'Suspension'],
    brands: ['KTM', 'Husqvarna', 'GasGas', 'Beta'],
    features: ['Expert Advice', 'Custom Performance']
  }
];

export function getRetailersForBrand(brand: string) {
  return RECOMMENDED_RETAILERS.filter(r => 
    r.brands.includes(brand) || r.brands.includes('All')
  );
}
