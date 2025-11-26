import { client } from './client';

export async function safeSanityFetch(query: string, params: Record<string, any> = {}) {
  // Clean all parameters to ensure no undefined values
  const cleanParams: Record<string, any> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) {
      console.warn(`⚠️ Replacing undefined parameter "${key}" with null`);
      cleanParams[key] = null;
    } else if (Array.isArray(value)) {
      // Clean arrays to remove undefined values
      cleanParams[key] = value.filter(item => item !== undefined);
    } else {
      cleanParams[key] = value;
    }
  }

  try {
    return await client.fetch(query, cleanParams);
  } catch (error) {
    console.error('💥 Sanity fetch error:', error);
    console.error('📋 Query:', query);
    console.error('🔧 Params:', cleanParams);
    return null;
  }
}
