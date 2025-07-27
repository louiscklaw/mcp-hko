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
 * Documentation:
 *
 * REQ0301
 */

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
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return rformat === "json"
      ? JSON.stringify(await response.json())
      : await response.text();
  } catch (error) {
    console.error("Error fetching HHOT data:", error);
    return null;
  }
}

export default makeHhotRequest;
