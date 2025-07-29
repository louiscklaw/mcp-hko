/**
 * Cloud-to-Ground and Cloud-to-Cloud Lightning Count (LHL) API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/opendata.php
 *
 * Parameters:
 * - dataType: 'LHL' (for Lightning Count)
 * - rformat: 'json' or 'csv' (Response format, default: csv)
 * - lang: 'en', 'tc', or 'sc' (Language option, default: en)
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=LHL&lang=en&rformat=json
 *
 * Response Keys (JSON format):
 * - fields: Array with field names ["Date", "Time", "CloudToGround", "CloudToCloud"]
 * - data: Array of arrays with lightning count data
 *
 * Response Keys (CSV format):
 * - Header row: Date,Time,CloudToGround,CloudToCloud
 * - Data rows: Actual lightning count data
 *
 * Documentation:
 *
 * REQ0306
 */
import { z } from 'zod';
import { LANG_EN } from './CONSTANT.js';
export const USER_AGENT = 'weather-app/1.0';
export async function makeLhlRequest({ lang = LANG_EN, rformat = 'csv' }) {
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
        dataType: 'LHL',
        lang,
        rformat
    });
    const url = `${baseUrl}?${params.toString()}`;
    const headers = { 'User-Agent': USER_AGENT, Accept: 'application/json' };
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
export default (server) => {
    server.addTool({
        name: 'lhl',
        description: `
Cloud-to-Ground and Cloud-to-Cloud Lightning Count (LHL) API Request

 Parameters:
 - lang: 'en', 'tc', or 'sc' (Language option, default: en)
 - rformat: 'json' or 'csv' (Response format, default: csv)

 Request Example:
 https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=LHL&lang=en&rformat=json

 Response Keys (JSON format):
 - fields: Array with field names ["Date", "Time", "CloudToGround", "CloudToCloud"]
 - data: Array of arrays with lightning count data

 Response Keys (CSV format):
 - Header row: Date,Time,CloudToGround,CloudToCloud
 - Data rows: Actual lightning count data
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
            const result = await makeLhlRequest(args);
            return result || '<error>nothing returned</error>';
        }
    });
};
