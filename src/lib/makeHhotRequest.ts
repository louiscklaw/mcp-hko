/**
 * Hourly Heights of Astronomical Tides (HHOT) API Request
 *
 * URL: https://data.weather.gov.hk/weatherAPI/opendata/opendata.php
 *
 * Parameters:
 * - dataType: 'HHOT' (for hourly heights of astronomical tides)
 * - rformat: 'json' (Response format)
 * - station: CCH/CLK/CMW/KCT/KLW/LOP/MWC/QUB/SPW/TAO/TBT/TMW/TPK/WAG
 * - year: 2022-2024
 * - month: (Optional) 1-12
 * - day: (Optional) 1-31
 * - hour: (Optional) 0-23
 *
 * Request Example:
 * https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=HHOT&station=CCH&year=2025&rformat=json
 *
 * Response Keys (JSON format):
 * - type: Array with data type ["Hourly Heights of Astronomical Tides"]
 * - fields: Array with field names ["Year", "Month", "Day", "Hour", "Height(m)"]
 * - data: Array of arrays with tide data
 * - legend: Array with station information
 *
 * Response Keys (CSV format):
 * - Type: Data type line
 * - Header row: Year,Month,Day,Hour,Height(m)
 * - Data rows: Actual tide data
 *
 * Documentation:
 *
 * REQ0301
 */

import { FastMCP } from "fastmcp";
import { z } from "zod";

export const USER_AGENT = "weather-app/1.0";

export async function makeHhotRequest({
  station,
  year,
  month,
  day,
  hour,
  rformat = "json",
}: {
  station: string;
  year: number;
  month?: number;
  day?: number;
  hour?: number;
  rformat?: string;
}) {
  const baseUrl =
    "https://data.weather.gov.hk/weatherAPI/opendata/opendata.php";

  const headers = { "User-Agent": USER_AGENT, Accept: "application/json" };

  const params = new URLSearchParams({
    dataType: "HHOT",
    station,
    year: year.toString(),
    rformat,
  });

  if (month !== undefined) params.append("month", month.toString());
  if (day !== undefined) params.append("day", day.toString());
  if (hour !== undefined) params.append("hour", hour.toString());

  const url = `${baseUrl}?${params.toString()}`;

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return rformat === "json"
      ? JSON.stringify(await response.json())
      : await response.text();
  } catch (error) {
    console.error("Error making NWS request:", error);
    return null;
  }
}

export default (server: FastMCP<undefined>) => {
  server.addTool({
    name: "hhhot",
    description: `
Hourly Heights of Astronomical Tides (HHOT) API Request

 Parameters:
 - station: CCH/CLK/CMW/KCT/KLW/LOP/MWC/QUB/SPW/TAO/TBT/TMW/TPK/WAG
 - year: 2022-2024
 - month: (Optional) 1-12
 - day: (Optional) 1-31
 - hour: (Optional) 0-23
 - rformat: 'json' (Response format)

 Request Example:
 https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=HHOT&station=CCH&year=2025&rformat=json

 Response Keys (JSON format):
 - type: Array with data type ["Hourly Heights of Astronomical Tides"]
 - fields: Array with field names ["Year", "Month", "Day", "Hour", "Height(m)"]
 - data: Array of arrays with tide data
 - legend: Array with station information

 Response Keys (CSV format):
 - Type: Data type line
 - Header row: Year,Month,Day,Hour,Height(m)
 - Data rows: Actual tide data
    `,
    parameters: z.object({
      station: z.string(),
      year: z.number(),
      month: z.number().optional(),
      day: z.number().optional(),
      hour: z.number().optional(),
      rformat: z.string().default("json"),
    }),
    execute: async (args) => {
      const result = await makeHhotRequest(args);
      return result || "<error>nothing returned</error>";
    },
  });
};
