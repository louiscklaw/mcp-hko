/**
 * Latest 10-minute Mean Visibility (LTMV) API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/opendata.php
 *
 * Parameters:
 * - dataType: 'LTMV' (for 10-minute Visibility)
 * - rformat: 'json' or 'csv' (Response format, default: csv)
 * - lang: 'en', 'tc', or 'sc' (Language option, default: en)
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=LTMV&lang=en&rformat=json
 *
 * Response Keys (JSON format):
 * - type: Array with data type ["10-minute Visibility"]
 * - fields: Array with field names ["Automatic Weather Station", "Mean Visibility (km)"]
 * - data: Array of arrays with visibility data
 * - legend: Array with station information
 *
 * Response Keys (CSV format):
 * - Type: Data type line
 * - Header row: Automatic Weather Station,Mean Visibility (km)
 * - Data rows: Actual visibility data
 *
 * Documentation:
 *
 * REQ0307
 */
import { z } from 'zod';
import { LANG_EN } from './CONSTANT.js';
export const USER_AGENT = 'weather-app/1.0';
export async function makeLtmvRequest({ lang = LANG_EN, rformat = 'csv' }) {
    // Validate lang parameter
    const validLanguages = ['en', 'tc', 'sc'];
    if (!validLanguages.includes(lang)) {
        throw new Error(`Invalid language. Must be one of: ${validLanguages.join(', ')}`);
    }
    // Validate rformat parameter
    const validFormats = ['json', 'csv'];
    if (!validFormats.includes(rformat)) {
        throw new Error(`Invalid format. Must be one of: ${validFormats.join(', ')}`);
    }
    const baseUrl = 'https://data.weather.gov.hk/weatherAPI/opendata/opendata.php';
    const params = new URLSearchParams({
        dataType: 'LTMV',
        lang,
        rformat
    });
    const headers = { 'User-Agent': USER_AGENT, Accept: 'application/json' };
    const url = `${baseUrl}?${params.toString()}`;
    try {
        const response = await fetch(url, { headers });
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
        return rformat === 'json'
            ? JSON.stringify(await response.json())
            : await response.text();
    }
    catch (error) {
        console.error('Error making NWS request:', error);
        return null;
    }
}
export const addLtmv = (server) => {
    server.addTool({
        name: 'ltmv',
        description: `
Latest 10-minute Mean Visibility (LTMV) API Request

 Parameters:
 - lang: 'en', 'tc', or 'sc' (Language option, default: en)
 - rformat: 'json' or 'csv' (Response format, default: csv)

 Request Example:
 https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=LTMV&lang=en&rformat=json

 Response Keys (JSON format):
 - type: Array with data type ["10-minute Visibility"]
 - fields: Array with field names ["Automatic Weather Station", "Mean Visibility (km)"]
 - data: Array of arrays with visibility data
 - legend: Array with station information

 Response Keys (CSV format):
 - Type: Data type line
 - Header row: Automatic Weather Station,Mean Visibility (km)
 - Data rows: Actual visibility data
    `,
        parameters: z.object({
            lang: z
                .string()
                .describe("Language for the response: 'en' (English), 'tc' (Traditional Chinese), 'sc' (Simplified Chinese)")
                .default(LANG_EN),
            rformat: z
                .string()
                .describe("Output format: 'json' or 'csv' (default: 'csv')")
                .default('csv')
        }),
        execute: async (args) => {
            const result = await makeLtmvRequest(args);
            return result || '<error>nothing returned</error>';
        }
    });
};
export default addLtmv;
