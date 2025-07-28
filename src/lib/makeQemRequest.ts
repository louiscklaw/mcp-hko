/**
 * Quick Earthquake Messages (qem) API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/earthquake.php
 *
 * Parameters:
 * - dataType: 'qem' (for quick earthquake messages)
 * - lang: 'en' (English), 'tc' (Traditional Chinese), 'sc' (Simplified Chinese)
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/earthquake.php?dataType=qem&lang=en
 *
 * Response Keys:
 * - lat: Latitude
 * - lon: Longitude
 * - mag: Richter magnitude scale
 * - region: Region
 * - ptime: Earthquake date and time (YYYY-MM-DD'T'hh:mm:ssZ)
 * - updateTime: Update time (YYYY-MM-DD'T'hh:mm:ssZ)
 *
 * Documentation:
 *
 * REQ0201
 */

import { FastMCP } from "fastmcp";
import { z } from "zod";
import { LANG_EN } from "./CONSTANT.js";

export const USER_AGENT = "weather-app/1.0";

export async function makeQemRequest(lang: string) {
  const headers = { "User-Agent": USER_AGENT, Accept: "application/json" };

  const url = `https://data.weather.gov.hk/weatherAPI/opendata/earthquake.php?dataType=qem&lang=${lang}`;

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return JSON.stringify(await response.json());
  } catch (error) {
    console.error("Error making NWS request:", error);
    return null;
  }
}

export default (server: FastMCP<undefined>) => {
  server.addTool({
    name: "qem",
    description: `
Quick Earthquake Messages (qem) API Request

 Parameters:
 - lang: 'en' (English), 'tc' (Traditional Chinese), 'sc' (Simplified Chinese)

 Request Example:
 https://data.weather.gov.hk/weatherAPI/opendata/earthquake.php?dataType=qem&lang=en

 Response Keys:
 - lat: Latitude
 - lon: Longitude
 - mag: Richter magnitude scale
 - region: Region
 - ptime: Earthquake date and time (YYYY-MM-DD'T'hh:mm:ssZ)
 - updateTime: Update time (YYYY-MM-DD'T'hh:mm:ssZ)
    `,
    parameters: z.object({
      lang: z.string().default(LANG_EN),
    }),
    execute: async (args) => {
      const result = await makeQemRequest(args.lang);
      return result || "<error>nothing returned</error>";
    },
  });
};
