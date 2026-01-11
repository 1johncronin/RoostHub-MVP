export const SERVICE_INTERVALS: Record<string, any> = {
  'Motocross': [
    { type: 'Engine Oil', interval_hours: 5, description: 'Critical for high-performance engines' },
    { type: 'Air Filter', interval_hours: 2, description: 'Clean/Replace after every ride' },
    { type: 'Piston / Top End', interval_hours: 40, description: 'Preventative replacement recommended' },
    { type: 'Valve Clearance', interval_hours: 20, description: 'Check and adjust' },
  ],
  'Enduro': [
    { type: 'Engine Oil', interval_hours: 15, description: 'Standard service' },
    { type: 'Transmission Oil', interval_hours: 30, description: '2-stroke specific' },
    { type: 'Top End', interval_hours: 100, description: 'Average lifespan' },
  ],
  'Mountain': [ // Snowmobiles
    { type: 'Chaincase Oil', interval_miles: 500, description: 'Seasonal maintenance' },
    { type: 'Slides / Hyfax', interval_miles: 1000, description: 'Check for wear' },
    { type: 'Power Valves', interval_miles: 1500, description: 'Cleaning required' },
  ]
};

export function getDueServices(category: string, currentHours: number, lastServiceHours: number = 0) {
    const intervals = SERVICE_INTERVALS[category] || [];
    const hoursSinceLast = currentHours - lastServiceHours;
    
    return intervals.filter((i: any) => hoursSinceLast >= i.interval_hours);
}
