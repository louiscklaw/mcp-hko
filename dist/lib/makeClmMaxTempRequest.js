/**
 * Daily Maximum Temperature (CLMMAXT) API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/opendata.php
 *
 * Parameters:
 * - dataType: 'CLMMAXT' (for daily maximum temperature)
 * - rformat: 'json' or 'csv' (Response format, default: csv)
 * - station: Station code (refer to documentation for full list)
 * - year: Year (1884 - current year, station-specific range)
 * - month: Month (1-12, optional but requires year)
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=CLMMAXT&station=HKO&year=2025&rformat=json
 *
 * Response Keys (JSON format):
 * - type: Array with data type ["Max Temperature"]
 * - fields: Array with field names ["Year", "Month", "Day", "Temperature(C)"]
 * - data: Array of arrays with temperature data
 * - legend: Array with station information
 *
 * Response Keys (CSV format):
 * - Type: Data type line
 * - Header row: Year,Month,Day,Temperature(C)
 * - Data rows: Actual temperature data
 *
 * Documentation:
 *
 * REQ0309
 */
import { z } from 'zod';
export const USER_AGENT = 'weather-app/1.0';
export async function makeClmMaxTempRequest({ station, year, month, rformat = 'json' }) {
    // Validate rformat parameter
    const validFormats = ['json', 'csv'];
    if (!validFormats.includes(rformat)) {
        throw new Error(`Invalid format. Must be one of: ${validFormats.join(', ')}`);
    }
    // Validate year parameter (1884 to current year)
    const currentYear = new Date().getFullYear();
    if (year < 1884 || year > currentYear) {
        throw new Error(`Invalid year. Must be between 1884 and ${currentYear}`);
    }
    // Validate month parameter (1-12)
    if (month !== undefined && (month < 1 || month > 12)) {
        throw new Error('Invalid month. Must be between 1 and 12');
    }
    // Validate that if month is provided, year must also be provided (this is already ensured by the function signature)
    // But we should check that month requires year (which is always true in this function)
    const baseUrl = 'https://data.weather.gov.hk/weatherAPI/opendata/opendata.php';
    const params = new URLSearchParams({
        dataType: 'CLMMAXT',
        station,
        year: year.toString(),
        rformat
    });
    if (month !== undefined)
        params.append('month', month.toString());
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
        name: 'clmmaxt',
        description: `
Daily Maximum Temperature (CLMMAXT) API Request

 Parameters:
 - station: Station code (refer to documentation for full list)
 - year: Year (1884 - current year, station-specific range)
 - month: Month (1-12, optional but requires year)
 - rformat: 'json' or 'csv' (Response format, default: csv)

 Request Example:
 https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=CLMMAXT&station=HKO&year=2025&rformat=json

 Response Keys (JSON format):
 - type: Array with data type ["Max Temperature"]
 - fields: Array with field names ["Year", "Month", "Day", "Temperature(C)"]
 - data: Array of arrays with temperature data
 - legend: Array with station information

 Response Keys (CSV format):
 - Type: Data type line
 - Header row: Year,Month,Day,Temperature(C)
 - Data rows: Actual temperature data
    `,
        parameters: z.object({
            station: z
                .string()
                .describe('Station code (e.g., HKO for Hong Kong Observatory)'),
            year: z.number().describe('Year between 1884 and current year'),
            month: z
                .number()
                .optional()
                .describe('Optional month (1-12) when specific month data is needed'),
            rformat: z
                .string()
                .default('json')
                .describe("Output format: 'json' or 'csv' (default: 'json')")
        }),
        execute: async (args) => {
            const result = await makeClmMaxTempRequest(args);
            return result || '<error>nothing returned</error>';
        }
    });
};
