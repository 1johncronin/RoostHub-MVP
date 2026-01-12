'use server';

import { lookupZipcode, ZipcodeData } from '@/lib/zipcode';

export async function getLocationFromZipcode(zipcode: string): Promise<{
  data?: ZipcodeData;
  error?: string;
}> {
  if (!zipcode || zipcode.length < 5) {
    return { error: 'Enter a 5-digit zipcode' };
  }

  const data = await lookupZipcode(zipcode);

  if (!data) {
    return { error: 'Invalid zipcode' };
  }

  return { data };
}
