/**
 * Times and Heights of Astronomical High and Low Tides (HLT) API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/opendata.php
 *
 * Parameters:
 * - dataType: 'HLT' (for Times and Heights of Astronomical High and Low Tides)
 * - rformat: 'json' or 'csv' (Response format, default: json)
 * - station: CCH/CLK/CMW/KCT/KLW/LOP/MWC/QUB/SPW/TAO/TBT/TMW/TPK/WAG
 * - year: 2022-2034
 * - month: (Optional) 1-12
 * - day: (Optional) 1-31
 * - hour: (Optional) 1-24
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=HLT&station=CLK&year=2025&rformat=json
 *
 * Response Keys (JSON format):
 * - fields: Array with field names ["Date", "Time", "Height(m)", "Type"]
 * - data: Array of arrays with tide data
 *
 * Response Keys (CSV format):
 * - Header row: Date,Time,Height(m),Type
 * - Data rows: Actual tide data
 *
 * Documentation:
 *
 * REQ0302
 */
import { z } from 'zod';
export const USER_AGENT = 'weather-app/1.0';
export async function makeHltRequest({ station, year, month, day, hour, rformat = 'json' }) {
    // Validate station code
    const validStations = [
        'CCH',
        'CLK',
        'CMW',
        'KCT',
        'KLW',
        'LOP',
        'MWC',
        'QUB',
        'SPW',
        'TAO',
        'TBT',
        'TMW',
        'TPK',
        'WAG'
    ];
    if (!validStations.includes(station)) {
        throw new Error(`Invalid station code. Must be one of: ${validStations.join(', ')}`);
    }
    // Validate year range
    const currentYear = new Date().getFullYear();
    if (year < 2022 || year > currentYear + 1) {
        throw new Error(`Year must be between 2022 and ${currentYear + 1}`);
    }
    // Validate optional parameters
    if (month && (month < 1 || month > 12)) {
        throw new Error('Month must be between 1 and 12');
    }
    if (day && (day < 1 || day > 31)) {
        throw new Error('Day must be between 1 and 31');
    }
    if (hour && (hour < 1 || hour > 24)) {
        throw new Error('Hour must be between 1 and 24');
    }
    const baseUrl = 'https://data.weather.gov.hk/weatherAPI/opendata/opendata.php';
    const params = new URLSearchParams({
        dataType: 'HLT',
        station,
        year: year.toString(),
        rformat
    });
    if (month !== undefined)
        params.append('month', month.toString());
    if (day !== undefined)
        params.append('day', day.toString());
    if (hour !== undefined)
        params.append('hour', hour.toString());
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
        name: 'hlt',
        description: `
Times and Heights of Astronomical High and Low Tides (HLT) API Request

 Parameters:
 - station: CCH/CLK/CMW/KCT/KLW/LOP/MWC/QUB/SPW/TAO/TBT/TMW/TPK/WAG
 - year: 2022-current year+1
 - month: (Optional) 1-12
 - day: (Optional) 1-31
 - hour: (Optional) 1-24
 - rformat: 'json' or 'csv' (Response format, default: json)

 Request Example:
 https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=HLT&station=CLK&year=2025&rformat=json

 Response Keys (JSON format):
 - fields: Array with field names ["Date", "Time", "Height(m)", "Type"]
 - data: Array of arrays with tide data

 Response Keys (CSV format):
 - Header row: Date,Time,Height(m),Type
 - Data rows: Actual tide data
    `,
        parameters: z.object({
            station: z
                .string()
                .describe("Tide station code (e.g., 'CCH', 'CLK', etc.)"),
            year: z.number().describe('Year between 2022 and current year + 1'),
            month: z.number().optional().describe('Optional month (1-12)'),
            day: z.number().optional().describe('Optional day of month (1-31)'),
            hour: z.number().optional().describe('Optional hour (1-24)'),
            rformat: z
                .string()
                .default('json')
                .describe("Output format: 'json' or 'csv' (default: 'json')")
        }),
        execute: async (args) => {
            const result = await makeHltRequest(args);
            return result || '<error>nothing returned</error>';
        }
    });
};
