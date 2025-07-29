/**
 * Weather and Radiation Level Report (RYES) API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/opendata.php
 *
 * Parameters:
 * - dataType: 'RYES' (for Weather and Radiation Report)
 * - date: Date of report (YYYYMMDD format)
 * - lang: 'en', 'tc', or 'sc' (Language option, default: en)
 * - station: Station code (refer to documentation for full list)
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=RYES&date=20250101&lang=en&station=HKO
 *
 * Response Keys:
 * - type: Data type ("data")
 * - SolarData: Solar radiation data with unit and period-value pairs
 * - AmbientTemp: Ambient temperature data with unit and period-value pairs
 * - Other parameters: Additional weather parameters
 *
 * Documentation:
 *
 * REQ0311
 */
import { z } from 'zod';
import { LANG_EN } from './CONSTANT.js';
export const USER_AGENT = 'weather-app/1.0';
export async function makeRyesRequest({ date, lang = LANG_EN, station }) {
    // Validate lang parameter
    const validLanguages = ['en', 'tc', 'sc'];
    if (!validLanguages.includes(lang)) {
        throw new Error(`Invalid language. Must be one of: ${validLanguages.join(', ')}`);
    }
    // Validate date format (YYYYMMDD)
    const dateRegex = /^\d{8}$/;
    if (!dateRegex.test(date)) {
        throw new Error('Date must be in YYYYMMDD format');
    }
    // Parse the date to validate it
    const year = parseInt(date.substring(0, 4));
    const month = parseInt(date.substring(4, 6));
    const day = parseInt(date.substring(6, 8));
    const parsedDate = new Date(year, month - 1, day);
    if (isNaN(parsedDate.getTime()) ||
        parsedDate.getFullYear() !== year ||
        parsedDate.getMonth() !== month - 1 ||
        parsedDate.getDate() !== day) {
        throw new Error('Invalid date');
    }
    // Validate date range (20190910 to yesterday)
    const startDate = new Date(2019, 8, 10); // 2019-09-10
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    if (parsedDate < startDate || parsedDate > yesterday) {
        throw new Error('Date must be between 20190910 and yesterday');
    }
    const baseUrl = 'https://data.weather.gov.hk/weatherAPI/opendata/opendata.php';
    const params = new URLSearchParams({
        dataType: 'RYES',
        date,
        lang,
        station
    });
    const url = `${baseUrl}?${params.toString()}`;
    const headers = { 'User-Agent': USER_AGENT, Accept: 'application/json' };
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
        name: 'ryes',
        description: `
Weather and Radiation Level Report (RYES) API Request

 Parameters:
 - date: Date of report (YYYYMMDD format)
 - lang: 'en', 'tc', or 'sc' (Language option, default: en)
 - station: Station code (refer to documentation for full list)

 Request Example:
 https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=RYES&date=20250101&lang=en&station=HKO

 Response Keys:
 - type: Data type ("data")
 - SolarData: Solar radiation data with unit and period-value pairs
 - AmbientTemp: Ambient temperature data with unit and period-value pairs
 - Other parameters: Additional weather parameters
    `,
        parameters: z.object({
            date: z.string().describe('Date of report (YYYYMMDD format)'),
            lang: z
                .string()
                .describe("Language for the response: 'en' (English), 'tc' (Traditional Chinese), 'sc' (Simplified Chinese)")
                .default(LANG_EN),
            station: z
                .string()
                .describe('Station code (refer to documentation for full list)')
        }),
        execute: async (args) => {
            const result = await makeRyesRequest(args);
            return result || '<error>nothing returned</error>';
        }
    });
};
