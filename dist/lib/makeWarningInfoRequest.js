/**
 * Weather Warning Information (warningInfo) API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/weather.php
 *
 * Parameters:
 * - dataType: 'warningInfo' (for weather warning information)
 * - lang: 'en' (English), 'tc' (Traditional Chinese), 'sc' (Simplified Chinese)
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warningInfo&lang=en
 *
 * Response Keys:
 * - Warning_Summary: Array of warning summary objects
 * - Special_Warning: Array of special warning objects (if any)
 * - Reminder_Warning: Array of reminder warning objects (if any)
 *
 * Documentation:
 *
 * REQ0104
 */
import { z } from 'zod';
import { LANG_EN } from './CONSTANT.js';
export const USER_AGENT = 'weather-app/1.0';
export async function makeWarningInfoRequest(lang) {
    const headers = { 'User-Agent': USER_AGENT, Accept: 'application/json' };
    const url = `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warningInfo&lang=${lang}`;
    try {
        const response = await fetch(url, { headers });
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
        return JSON.stringify(await response.json());
    }
    catch (error) {
        console.error('Error making NWS request:', error);
        return null;
    }
}
export default (server) => {
    server.addTool({
        name: 'warningInfo',
        description: `
Weather Warning Information (warningInfo) API Request

 Parameters:
 - lang: 'en' (English), 'tc' (Traditional Chinese), 'sc' (Simplified Chinese)

 Request Example:
 https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warningInfo&lang=en

 Response Keys:
 - Warning_Summary: Array of warning summary objects
 - Special_Warning: Array of special warning objects (if any)
 - Reminder_Warning: Array of reminder warning objects (if any)
    `,
        parameters: z.object({
            lang: z
                .string()
                .describe('change the language of the result')
                .default(LANG_EN)
        }),
        execute: async (args) => {
            const result = await makeWarningInfoRequest(args.lang);
            return result || '<error>nothing returned</error>';
        }
    });
};
