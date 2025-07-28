/**
 * Rainfall in the Past Hour from Automatic Weather Station API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/hourlyRainfall.php
 *
 * Parameters:
 * - lang: Language option (en, tc, sc) - default: en
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/hourlyRainfall.php?lang=en
 *
 * Response Keys:
 * - obsTime: Observation time in ISO 8601 format
 * - hourlyRainfall: Array of rainfall data from automatic weather stations
 *   - automaticWeatherStation: Name of the weather station
 *   - automaticWeatherStationID: ID of the weather station
 *   - value: Rainfall amount
 *   - unit: Measurement unit (mm)
 *
 * Response example:
 * ```json
 * {
 *   "obsTime": "2025-01-01T08:00:00+08:00",
 *   "hourlyRainfall": [
 *     {
 *       "automaticWeatherStation": "Lau Fau Shan",
 *       "automaticWeatherStationID": "RF001",
 *       "value": "0",
 *       "unit": "mm"
 *     },
 *     {
 *       "automaticWeatherStation": "Wetland Park",
 *       "automaticWeatherStationID": "RF002",
 *       "value": "2",
 *       "unit": "mm"
 *     }
 *   ]
 * }
 * ```
 *
 * Documentation:
 *
 * REQ0501
 */
import { z } from "zod";
import { LANG_EN } from "./CONSTANT.js";
export const USER_AGENT = "weather-app/1.0";
export async function makeHourlyRainfallRequest({ lang = LANG_EN, }) {
    // Validate lang parameter
    const validLanguages = ["en", "tc", "sc"];
    if (!validLanguages.includes(lang)) {
        throw new Error(`Invalid language. Must be one of: ${validLanguages.join(", ")}`);
    }
    const baseUrl = "https://data.weather.gov.hk/weatherAPI/opendata/hourlyRainfall.php";
    const params = new URLSearchParams({
        lang,
    });
    const headers = { "User-Agent": USER_AGENT, Accept: "application/json" };
    const url = `${baseUrl}?${params.toString()}`;
    try {
        const response = await fetch(url, { headers });
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
        return JSON.stringify(await response.json());
    }
    catch (error) {
        console.error("Error making NWS request:", error);
        return null;
    }
}
export default (server) => {
    server.addTool({
        name: "hourlyrainfall",
        description: `
Rainfall in the Past Hour from Automatic Weather Station API Request

 Parameters:
 - lang: Language option (en, tc, sc) - default: en

 Request Example:
 https://data.weather.gov.hk/weatherAPI/opendata/hourlyRainfall.php?lang=en

 Response Keys:
 - obsTime: Observation time in ISO 8601 format
 - hourlyRainfall: Array of rainfall data from automatic weather stations
   - automaticWeatherStation: Name of the weather station
   - automaticWeatherStationID: ID of the weather station
   - value: Rainfall amount
   - unit: Measurement unit (mm)

 Response example:
 {
   "obsTime": "2025-01-01T08:00:00+08:00",
   "hourlyRainfall": [
     {
       "automaticWeatherStation": "Lau Fau Shan",
       "automaticWeatherStationID": "RF001",
       "value": "0",
       "unit": "mm"
     },
     {
       "automaticWeatherStation": "Wetland Park",
       "automaticWeatherStationID": "RF002",
       "value": "2",
       "unit": "mm"
     }
   ]
 }
    `,
        parameters: z.object({
            lang: z.string().default(LANG_EN),
        }),
        execute: async (args) => {
            const result = await makeHourlyRainfallRequest(args);
            return result || "<error>nothing returned</error>";
        },
    });
};
