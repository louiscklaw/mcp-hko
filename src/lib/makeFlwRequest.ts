import { flwUrl } from '../urls.js';
import { USER_AGENT } from '../main.js';

/**
 * Makes a request to the HKO API to get the local weather forecast
 * @returns Promise<ImakeFlwResponse> The local weather forecast data
 */

export async function makeFlwRequest<T>(url: string): Promise<T | null> {
  const headers = {
    'User-Agent': USER_AGENT,
    Accept: 'application/geo+json',
  };

  try {
    const response = await fetch(flwUrl, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error('Error fetching local weather forecast:', error);
    return null;
  }
}

export function formatFlwtResponse(response) {
  let district_temperatures = [];

  return 'helloworld';
}
