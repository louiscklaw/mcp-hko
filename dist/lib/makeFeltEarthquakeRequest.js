/**
 * Locally Felt Earth Tremor Report (feltearthquake) API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/earthquake.php
 *
 * Parameters:
 * - dataType: 'feltearthquake' (for locally felt earth tremor report)
 * - lang: 'en' (English), 'tc' (Traditional Chinese), 'sc' (Simplified Chinese)
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/earthquake.php?dataType=feltearthquake&lang=en
 *
 * Response Keys:
 * - updateTime: Last update time (YYYY-MM-DD'T'hh:mm:ssZ)
 * - mag: Richter magnitude scale (Numeric value)
 * - region: Region of the earthquake (Text)
 * - intensity: Intensity of the earthquake (Text)
 * - lat: Latitude (Numeric value)
 * - lon: Longitude (Numeric value)
 * - details: Earthquake details (Text)
 * - ptime: Date and time of the earthquake (YYYY-MM-DD'T'hh:mm:ssZ)
 *
 * Documentation:
 *
 * REQ0202
 */
import { z } from 'zod';
import { LANG_EN } from './CONSTANT.js';
export const USER_AGENT = 'weather-app/1.0';
export async function makeFeltEarthquakeRequest(lang = LANG_EN) {
    const headers = { 'User-Agent': USER_AGENT, Accept: 'application/json' };
    try {
        const response = await fetch(`https://data.weather.gov.hk/weatherAPI/opendata/earthquake.php?dataType=feltearthquake&lang=${lang}`, { headers });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return JSON.stringify(await response.json());
    }
    catch (error) {
        console.error('Error making NWS request:', error);
        return null;
    }
}
export default (server) => {
    server.addTool({
        name: 'feltearthquake',
        description: `
Locally Felt Earth Tremor Report (feltearthquake) API Request

 Parameters:
 - lang: 'en' (English), 'tc' (Traditional Chinese), 'sc' (Simplified Chinese)

 Request Example:
 https://data.weather.gov.hk/weatherAPI/opendata/earthquake.php?dataType=feltearthquake&lang=en

 Response Keys:
 - updateTime: Last update time (YYYY-MM-DD'T'hh:mm:ssZ)
 - mag: Richter magnitude scale (Numeric value)
 - region: Region of the earthquake (Text)
 - intensity: Intensity of the earthquake (Text)
 - lat: Latitude (Numeric value)
 - lon: Longitude (Numeric value)
 - details: Earthquake details (Text)
 - ptime: Date and time of the earthquake (YYYY-MM-DD'T'hh:mm:ssZ)
    `,
        parameters: z.object({
            lang: z
                .string()
                .describe('change the language of the result')
                .default(LANG_EN)
        }),
        execute: async (args) => {
            const result = await makeFeltEarthquakeRequest(args.lang);
            return result || '<error>nothing returned</error>';
        }
    });
};
