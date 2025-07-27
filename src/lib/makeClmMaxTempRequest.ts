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
 * Documentation:
 *
 * REQ0309
 */

export async function makeClmMaxTempRequest({
  station,
  year,
  month,
  rformat = "csv",
}: {
  station: string;
  year: number;
  month?: number;
  rformat?: string;
}) {
  // Validate rformat parameter
  const validFormats = ["json", "csv"];
  if (!validFormats.includes(rformat)) {
    throw new Error(
      `Invalid format. Must be one of: ${validFormats.join(", ")}`
    );
  }

  // Validate year parameter (1884 to current year)
  const currentYear = new Date().getFullYear();
  if (year < 1884 || year > currentYear) {
    throw new Error(`Invalid year. Must be between 1884 and ${currentYear}`);
  }

  // Validate month parameter (1-12)
  if (month !== undefined && (month < 1 || month > 12)) {
    throw new Error("Invalid month. Must be between 1 and 12");
  }

  // Validate that if month is provided, year must also be provided (this is already ensured by the function signature)
  // But we should check that month requires year (which is always true in this function)

  const baseUrl =
    "https://data.weather.gov.hk/weatherAPI/opendata/opendata.php";
  const params = new URLSearchParams({
    dataType: "CLMMAXT",
    station,
    year: year.toString(),
    rformat,
  });

  if (month !== undefined) params.append("month", month.toString());

  const url = `${baseUrl}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return rformat === "json"
      ? JSON.stringify(await response.json())
      : await response.text();
  } catch (error) {
    console.error("Error fetching CLMMAXT data:", error);
    return null;
  }
}

export default makeClmMaxTempRequest;
